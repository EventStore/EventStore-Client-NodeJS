import { v4 as uuid } from "uuid";

import { createTestNode } from "@test-utils";
import {
  AppendResult,
  KurrentDBClient,
  EventType,
  jsonEvent,
  JSONEventType,
  RecordedEvent,
  ResolvedEvent,
  StreamingRead,
} from "@kurrent/db-client";

describe("typed events should compile", () => {
  const node = createTestNode();
  let client!: KurrentDBClient;

  beforeAll(async () => {
    await node.up();
    client = new KurrentDBClient(
      { endpoint: node.uri },
      { rootCertificate: node.certs.root },
      { username: "admin", password: "changeit" }
    );
  });

  afterAll(async () => {
    await node.down();
  });

  test("stream agregator", async () => {
    type EventAggregator<Aggregate, E extends EventType> = (
      currentState: Aggregate | undefined,
      event: RecordedEvent<E>
    ) => Aggregate;

    const createStreamAggregator =
      <Entity, StreamEvents extends EventType>(
        when: EventAggregator<Entity, StreamEvents>
      ) =>
      async (
        eventStream: StreamingRead<ResolvedEvent<StreamEvents>>
      ): Promise<Entity> => {
        let currentState: Entity | undefined = undefined;
        for await (const { event } of eventStream) {
          if (!event) continue;
          currentState = when(currentState, event);
        }
        if (currentState == null) throw "oh no";
        return currentState;
      };

    interface ProductItem {
      productId: string;
      quantity: number;
    }

    // bare interface
    interface ShoppingCartOpened {
      type: "shopping-cart-opened";
      data: {
        shoppingCartId: string;
        clientId: string;
        openedAt: string;
      };
    }

    // using JSONEventType
    type ProductItemAddedToShoppingCart = JSONEventType<
      "product-item-added-to-shopping-cart",
      {
        shoppingCartId: string;
        productItem: ProductItem;
      }
    >;

    type ProductItemRemovedFromShoppingCart = JSONEventType<
      "product-item-removed-from-shopping-cart",
      {
        shoppingCartId: string;
        productItem: ProductItem;
      }
    >;

    type ShoppingCartConfirmed = JSONEventType<
      "shopping-cart-confirmed",
      {
        shoppingCartId: string;
        confirmedAt: string;
      }
    >;

    type ShoppingCartEvent =
      | ShoppingCartOpened
      | ProductItemAddedToShoppingCart
      | ProductItemRemovedFromShoppingCart
      | ShoppingCartConfirmed;

    enum ShoppingCartStatus {
      Opened = 1,
      Confirmed = 2,
      Cancelled = 4,
      Closed = Confirmed | Cancelled,
    }

    type ProductItems = Map<string, ProductItem>;

    interface ShoppingCart {
      id: string;
      clientId: string;
      status: ShoppingCartStatus;
      productItems: ProductItems;
      openedAt: Date;
      confirmedAt?: Date;
    }

    const enum ShoppingCartErrors {
      OPENED_EXISTING_CART = "OPENED_EXISTING_CART",
      CART_NOT_FOUND = "CART_NOT_FOUND",
      PRODUCT_ITEM_NOT_FOUND = "PRODUCT_ITEM_NOT_FOUND",
      UNKNOWN_EVENT_TYPE = "UNKNOWN_EVENT_TYPE",
    }

    const addProductItem = (
      inventory: ProductItems,
      { productId, quantity }: ProductItem
    ): ProductItems => {
      const current = inventory.get(productId);

      if (!current) {
        return inventory.set(productId, { productId, quantity });
      }

      return inventory.set(productId, {
        ...current,
        quantity: current.quantity + quantity,
      });
    };

    const removeProductItem = (
      inventory: ProductItems,
      { productId, quantity }: ProductItem
    ): ProductItems => {
      const current = inventory.get(productId);

      if (!current || current.quantity < quantity) {
        throw ShoppingCartErrors.PRODUCT_ITEM_NOT_FOUND;
      }

      if (current.quantity === quantity) {
        inventory.delete(productId);
        return inventory;
      }

      return inventory.set(productId, {
        ...current,
        quantity: current.quantity - quantity,
      });
    };

    const create =
      <Command, StreamEvent extends JSONEventType>(
        client: KurrentDBClient,
        handle: (command: Command) => StreamEvent
      ) =>
      (streamName: string, command: Command): Promise<AppendResult> => {
        const event = handle(command);
        const eventData = jsonEvent<StreamEvent>(event);
        return client.appendToStream<StreamEvent>(streamName, eventData);
      };

    create<string, ShoppingCartEvent>(client, () => ({
      type: "shopping-cart-opened",
      data: {
        shoppingCartId: uuid(),
        clientId: uuid(),
        openedAt: new Date().toJSON(),
      },
    }));

    const shoppingCartAggregator = createStreamAggregator<
      ShoppingCart,
      ShoppingCartEvent
    >((currentState, event) => {
      if (event.type === "shopping-cart-opened") {
        if (currentState != null) throw ShoppingCartErrors.OPENED_EXISTING_CART;
        return {
          id: event.data.shoppingCartId,
          clientId: event.data.clientId,
          openedAt: new Date(event.data.openedAt),
          productItems: new Map(),
          status: ShoppingCartStatus.Opened,
        };
      }

      if (currentState == null) throw ShoppingCartErrors.CART_NOT_FOUND;

      switch (event.type) {
        case "product-item-added-to-shopping-cart":
          return {
            ...currentState,
            productItems: addProductItem(
              currentState.productItems,
              event.data.productItem
            ),
          };
        case "product-item-removed-from-shopping-cart":
          return {
            ...currentState,
            productItems: removeProductItem(
              currentState.productItems,
              event.data.productItem
            ),
          };
        case "shopping-cart-confirmed":
          return {
            ...currentState,
            status: ShoppingCartStatus.Confirmed,
            confirmedAt: new Date(event.data.confirmedAt),
          };
        default: {
          const _: never = event;
          throw ShoppingCartErrors.UNKNOWN_EVENT_TYPE;
        }
      }
    });

    const enum ProductsIds {
      T_SHIRT = "team-building-excercise-2022",
      SHOES = "air-jordan",
    }

    const clientId = "client_123";
    const shoppingCartId = "cart_456";
    const events: ShoppingCartEvent[] = [
      {
        type: "shopping-cart-opened",
        data: {
          shoppingCartId,
          clientId,
          openedAt: new Date().toJSON(),
        },
      },
      {
        type: "product-item-added-to-shopping-cart",
        data: {
          shoppingCartId,
          productItem: {
            productId: ProductsIds.SHOES,
            quantity: 100,
          },
        },
      },
      {
        type: "product-item-added-to-shopping-cart",
        data: {
          shoppingCartId,
          productItem: {
            productId: ProductsIds.T_SHIRT,
            quantity: 1,
          },
        },
      },
      {
        type: "product-item-removed-from-shopping-cart",
        data: {
          shoppingCartId,
          productItem: {
            productId: ProductsIds.SHOES,
            quantity: 100,
          },
        },
      },
      {
        type: "product-item-added-to-shopping-cart",
        data: {
          shoppingCartId,
          productItem: {
            productId: ProductsIds.T_SHIRT,
            quantity: 1,
          },
        },
      },
      {
        type: "shopping-cart-confirmed",
        data: {
          shoppingCartId,
          confirmedAt: new Date().toJSON(),
        },
      },
    ];

    const jsonEvents = events.map((e) => jsonEvent<ShoppingCartEvent>(e));

    await client.appendToStream<ShoppingCartEvent>(
      `shoppingcart-${shoppingCartId}`,
      jsonEvents
    );

    const shoppingCartStream = client.readStream<ShoppingCartEvent>(
      `shoppingcart-${shoppingCartId}`
    );

    const cart = await shoppingCartAggregator(shoppingCartStream);

    expect(cart).toMatchObject({
      id: shoppingCartId,
      clientId,
      openedAt: expect.any(Date),
      status: ShoppingCartStatus.Confirmed,
      confirmedAt: expect.any(Date),
    });

    expect(Array.from(cart.productItems)).toEqual([
      [ProductsIds.T_SHIRT, { productId: ProductsIds.T_SHIRT, quantity: 2 }],
    ]);
  });
});

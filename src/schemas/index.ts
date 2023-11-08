import * as common from "./common";
import * as stream from "./stream";
import * as persistentSubscription from "./persistentSubscription";
import * as projection from "./projection";
import { z } from "zod";

z.setErrorMap((issue, ctx) => {
  const fieldName = issue.path.join(".");
  let message = ctx.defaultError;

  // When the path is empty, it means that the error is on the root.
  if (issue.path.length !== 0) {
    switch (issue.code) {
      case "too_small":
        message = `The field '${fieldName}' must be greater than or equal to ${issue.minimum}`;
        break;
      case "too_big":
        message = `The field '${fieldName}' must be less than or equal to ${issue.maximum}`;
        break;
    }
  }

  return { message };
});

const schemas = {
  ...common,
  ...stream,
  ...persistentSubscription,
  ...projection,
};

export default schemas;

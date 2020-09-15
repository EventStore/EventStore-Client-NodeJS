import { ReadReq } from "../../generated/streams_pb";
import FilterOptions = ReadReq.Options.FilterOptions;
import Expression = ReadReq.Options.FilterOptions.Expression;

export class Filter {
  private baseOnStream: boolean;
  private _max: number | undefined;
  private _checkpointIntervalMul: number | undefined;
  private _regex: string | undefined;
  private _prefixes: string[] | undefined;

  private constructor(baseOnStream: boolean) {
    this.baseOnStream = baseOnStream;
  }

  static basedOnStreamName(): Filter {
    return new Filter(true);
  }

  static basedOnEventType(): Filter {
    return new Filter(false);
  }

  regex(value: string): Filter {
    this._regex = value;
    return this;
  }

  max(value: number): Filter {
    this._max = value;
    return this;
  }

  checkpointIntervalMultiplier(value: number): Filter {
    this._checkpointIntervalMul = value;
    return this;
  }

  addPrefix(value: string): Filter {
    this._prefixes = this._prefixes ?? [];
    this._prefixes.push(value);
    return this;
  }

  prefixes(value: string[]): Filter {
    this._prefixes = value;
    return this;
  }

  toGrpc(): FilterOptions {
    const options = new FilterOptions();
    const expr = new Expression();

    if (this._prefixes) {
      expr.setPrefixList(this._prefixes);
    }

    if (this._regex) {
      expr.setRegex(this._regex);
    }

    if (this._max) {
      options.setMax(this._max);
    }

    if (this._checkpointIntervalMul) {
      options.setCheckpointintervalmultiplier(this._checkpointIntervalMul);
    }

    if (this.baseOnStream) {
      options.setStreamIdentifier(expr);
    } else {
      options.setEventType(expr);
    }

    return options;
  }
}

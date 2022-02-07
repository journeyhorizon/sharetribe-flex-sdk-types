/// <reference path="entities.d.ts" />
/// <reference path="types.d.ts" />
/// <reference path="sdk.d.ts" />

import { Sdk } from "./sdk";
import {
  browserCookieStore,
  expressCookieStore,
  memoryStore,
} from "./tokenStore";
import { transit, TypeHandler } from "./transit";
import { types } from "./types";
import { objectQueryString } from "./utils";

export = SharetribeFlexSdk;
declare namespace SharetribeFlexSdk {
  const types: types;
  const tokenStore: {
    browserCookieStore: typeof browserCookieStore;
    expressCookieStore: typeof expressCookieStore;
    memoryStore: typeof memoryStore;
  };
  const transit: transit;
  const util: {
    objectQueryString: typeof objectQueryString;
  };
  function createInstance(config: {
    clientId: string;
    clientSecret?: string;
    baseUrl?: string;
    transitVerbose?: boolean;
    typeHandlers: Array<TypeHandler>;
  }): Sdk;
}

/// <reference path='Types.d.ts' />
/// <reference path='lib.d.ts' />
/// <reference path='Sdk.d.ts' />
/// <reference path='TokenStore.d.ts' />
/// <reference path='Entities.d.ts' />
/// <reference path='Auth.d.ts' />

declare module "sharetribe-flex-sdk" {
  export namespace SharetribeFlexSdk {}

  export const types: typeof SharetribeFlexSdk.Types;
  export const tokenStore: {
    memoryStore: typeof SharetribeFlexSdk.TokenStore.CreateTokenStore<SharetribeFlexSdk.TokenStore.CreateMemoryTokenStoreParams>;
    browserCookieStore: typeof SharetribeFlexSdk.TokenStore.CreateTokenStore<SharetribeFlexSdk.TokenStore.CreateBrowserCookieStoreParams>;
    expressCookieStore: typeof SharetribeFlexSdk.TokenStore.CreateTokenStore<SharetribeFlexSdk.TokenStore.CreateExpressCookieStoreParams>;
  };

  export function createInstance(
    config: SharetribeFlexSdk.SharetribeSdkConfig
  ): SharetribeFlexSdk.SharetribeSdk;
}

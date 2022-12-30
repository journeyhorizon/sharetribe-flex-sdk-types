/// <reference path='auth.d.ts' />
/// <reference path='./availabilityExceptions.d.ts' />
/// <reference path='./bookings.d.ts' />
/// <reference path='./currentUser.d.ts' />
/// <reference path='./data.d.ts' />
/// <reference path='./entity.d.ts' />
/// <reference path='./image.d.ts' />
/// <reference path='./listings.d.ts' />
/// <reference path='./messages.d.ts' />
/// <reference path='./ownListings.d.ts' />
/// <reference path='./passwordReset.d.ts' />
/// <reference path='./processTransitions.d.ts' />
/// <reference path='./reviews.d.ts' />
/// <reference path='./sdk.d.ts' />
/// <reference path='./stock.d.ts' />
/// <reference path='./stockAdjustments.d.ts' />
/// <reference path='./stockReservations.d.ts' />
/// <reference path='./stripeAccount.d.ts' />
/// <reference path='./stripeAccountLink.d.ts' />
/// <reference path='./stripeCustomer.d.ts' />
/// <reference path='./stripePaymentMethod.d.ts' />
/// <reference path='./stripePerson.d.ts' />
/// <reference path='./stripeSetupIntent.d.ts' />
/// <reference path='./timeSlots.d.ts' />
/// <reference path='./TokenStore.d.ts' />
/// <reference path='./transactions.d.ts' />
/// <reference path='./types.d.ts' />
/// <reference path='./user.d.ts' />
/// <reference path='./serializer.d.ts' />
/// <reference path='./utils.d.ts' />

declare module "sharetribe-flex-sdk" {
  export interface CreateInstanceParams {
    clientId: string;
    clientSecret?: string;
    baseUrl?: string;
    typeHandlers?: Array<SharetribeFlexSdk.TypeHandler>;
    version?: string;
    httpAgent?: import("http").Agent;
    httpsAgent?: import("https").Agent;
    transitVerbose?: boolean;
    tokenStore?: SharetribeFlexSdk.TokenStore.TokenStore;
    secure?: boolean;
  }
  export namespace SharetribeFlexSdk {}
  export function createInstance(
    params: CreateInstanceParams
  ): SharetribeFlexSdk.Sdk;
  export const types: typeof SharetribeFlexSdk.Types;
  export const transit: SharetribeFlexSdk.transit;
  export const util: SharetribeFlexSdk.util;
  export const tokenStore: {
    memoryStore: typeof SharetribeFlexSdk.TokenStore.CreateTokenStore<SharetribeFlexSdk.TokenStore.CreateMemoryTokenStoreParams>;
    browserCookieStore: typeof SharetribeFlexSdk.TokenStore.CreateTokenStore<SharetribeFlexSdk.TokenStore.CreateBrowserCookieStoreParams>;
    expressCookieStore: typeof SharetribeFlexSdk.TokenStore.CreateTokenStore<SharetribeFlexSdk.TokenStore.CreateExpressCookieStoreParams>;
  };
}

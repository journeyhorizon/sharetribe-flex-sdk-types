declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export class Sdk {
      authInfo: SharetribeFlexSdk.authInfo;
      login: SharetribeFlexSdk.login;
      loginWithIdp: SharetribeFlexSdk.loginWithIdp;
      logout: SharetribeFlexSdk.logout;
      exchangeToken: SharetribeFlexSdk.exchangeToken;
      assetByVersion: SharetribeFlexSdk.assetByVersion;
      assetByAlias: SharetribeFlexSdk.assetByAlias;
      assetsByAlias: SharetribeFlexSdk.assetsByAlias;
      assetsByVersion: SharetribeFlexSdk.assetsByVersion;
      availabilityExceptions: SharetribeFlexSdk.availabilityExceptions;
      bookings: SharetribeFlexSdk.bookings;
      currentUser: SharetribeFlexSdk.currentUser;
      images: SharetribeFlexSdk.images;
      listings: SharetribeFlexSdk.listings;
      messages: SharetribeFlexSdk.messages;
      ownListings: SharetribeFlexSdk.ownListings;
      passwordReset: SharetribeFlexSdk.passwordReset;
      stock: SharetribeFlexSdk.stock;
      stockAdjustments: SharetribeFlexSdk.stockAdjustments;
      stripeAccount: SharetribeFlexSdk.stripeAccount;
      stripeAccountLinks: SharetribeFlexSdk.stripeAccountLinks;
      stripeCustomer: SharetribeFlexSdk.stripeCustomer;
      stripePersons: SharetribeFlexSdk.stripePersons;
      stripeSetupIntent: SharetribeFlexSdk.stripeSetupIntents;
      timeslots: SharetribeFlexSdk.timeslots;
      transactions: SharetribeFlexSdk.transactions;
      users: SharetribeFlexSdk.Users;
      processTransitions: SharetribeFlexSdk.processTransitions;
      reviews: SharetribeFlexSdk.Reviews;
      marketplace: SharetribeFlexSdk.marketplace;
    }
  }
}

declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export class Sdk {
      authInfo: SharetribeFlexSdk.authInfo;
      currentUser: SharetribeFlexSdk.currentUser;
      passwordReset: SharetribeFlexSdk.passwordReset;
      stripeAccount: SharetribeFlexSdk.stripeAccount;
      stripeAccountLinks: SharetribeFlexSdk.stripeAccountLinks;

      stripeCustomer: SharetribeFlexSdk.stripeCustomer;
      users: SharetribeFlexSdk.Users;
    }
  }
}

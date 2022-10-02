declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export class SharetribeSdk {
      constructor(config: SharetribeFlexSdk.SharetribeSdkConfig);

      users: SharetribeFlexSdk.Users;
      images: SharetribeFlexSdk.Images;
      currentUser: SharetribeFlexSdk.CurrentUser;
      authInfo: typeof SharetribeFlexSdk.Auth.authInfo;
    }
  }
}

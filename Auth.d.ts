declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export class Auth {
      static authInfo(): Promise<{
        scopes: string[];
        isAnonymous: boolean;
        grantType: string;
      }>;
    }
  }
}

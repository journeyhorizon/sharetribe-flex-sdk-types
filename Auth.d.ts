declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export type authInfo = () => Promise<{
      scopes?: string[];
      isAnonymous: boolean;
      grantType: "client_credentials" | "refresh_token";
    }>;
  }
}

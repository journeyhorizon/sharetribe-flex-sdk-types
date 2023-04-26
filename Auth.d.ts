declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export type authInfo = () => Promise<{
      scopes?: string[];
      isAnonymous: boolean;
      grantType: "client_credentials" | "refresh_token";
    }>;
    export type logout = () => Promise<void>;
    export type login = (params: {
      username: string;
      password: string;
    }) => Promise<{
      status: number;
      statusText: string;
      data: {
        access_token: string;
        expires_in: number;
        refresh_token: string;
        scope: "user";
        token_type: "bearer";
      };
    }>;
  }
}

declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export type AuthInfo = {
      scopes?: string[];
      isAnonymous: boolean;
      grantType: "client_credentials" | "refresh_token";
    };
    export type authInfo = () => Promise<AuthInfo>;

    export type logout = () => Promise<void>;

    export type exchangeToken = () => Promise<{
      status: number;
      statusText: string;
      data: {
        access_token: string;
        expires_in: number;
        refresh_token: string;
        scope: "trusted:user";
        token_type: "bearer";
      };
    }>;

    export type loginAs = (params: {
      code: string;
      redirect_uri: string;
      code_verifier: string;
    }) => Promise<void>;

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

    export type loginWithIdp = (params: {
      idpId: string;
      idpClientId: string;
      idpToken: string
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

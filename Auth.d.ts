declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export namespace Auth {
      type authInfo = () => Promise<{
        scopes: string[];
        isAnonymous: boolean;
        grantType: string;
      }>;
      interface LoginParams {
        username: string;
        password: string;
      }
      type login = (params: LoginParams) => Promise<{
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope: string;
        refresh_token?: string;
      }>;
      type logout = () => Promise<void>;

      interface LoginWithIdpParams {
        idpId: string;
        idpClientId: string;
        idpToken: string;
      }
      type loginWithIdp = (params: LoginWithIdpParams) => Promise<{
        access_token: string;
        token_type: "bearer";
        expires_in: number;
        scope: string;
        refresh_token?: string;
      }>;
    }
  }
}

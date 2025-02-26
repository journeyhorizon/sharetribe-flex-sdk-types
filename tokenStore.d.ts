declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    namespace TokenStore {
      type Token = Record<string, number | string>;

      export interface TokenStore {
        getToken(): Token | Promise<Token>;
        setToken(token: Token): void | Promise<void>;
        removeToken(): void | Promise<void>;
      }
      export interface CreateExpressCookieStoreParams {
        req: import("express").Request;
        res: import("express").Response;
        clientId: string;
        secure?: boolean;
      }
      export interface CreateBrowserCookieStoreParams {
        clientId: string;
        secure?: boolean;
      }
      export interface CreateMemoryTokenStoreParams {}
      export function CreateTokenStore<T = unknown>(params: T): TokenStore;
    }
  }
}

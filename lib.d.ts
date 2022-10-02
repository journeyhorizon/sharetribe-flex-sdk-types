import { Agent as HttpAgent } from "http";
import { Agent as HttpsAgent } from "https";
import { AxiosAdapter } from "axios";

declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface SharetribeSdkConfig {
      clientId: string;
      clientSecret?: string;
      baseUrl?: string;
      assetCdnBaseUrl?: string;
      typeHandlers?: Array<unknown>;
      adapter?: AxiosAdapter;
      version?: "v1";
      httpAgent?: HttpAgent;
      httpsAgent?: HttpsAgent;
      transitVerbose?: boolean;
      tokenStore?: TokenStore.TokenStore;
    }

    export type Response<T> = {
      data: T;
      included: SharetribeFlexSdk.NormalizeEntity[];
    } & (T extends any[]
      ? {
          meta: {
            totalItems: number;
            totalPages: number;
            page: number;
            paginationLimit: number;
            perPage: number;
          };
        }
      : {});

    export type Nullable<T> = T | null;
  }
}

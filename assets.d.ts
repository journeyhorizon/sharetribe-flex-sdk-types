declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface AssetMeta {
      version: string;
    }

    type AssetResponse<T> = {
      status: number;
      statusText: string;
      data: {
        data: T;
        included?: Record<string, unknown>[];
        meta?: AssetMeta;
      };
    };

    export type SingleAssetDoc = AssetResponse<Record<string, unknown>>;
    export type CollectionAssetDoc = AssetResponse<Record<string, unknown>[]>;

    export type assetByVersion = (params: {
      path: string;
      version: string;
    }) => Promise<SingleAssetDoc>;

    export type assetByAlias = (params: {
      path: string;
      alias: string;
    }) => Promise<SingleAssetDoc>;

    export type assetsByAlias = (params: {
      paths: string[];
      alias: string;
    }) => Promise<CollectionAssetDoc>;

    export type assetsByVersion = (params: {
      paths: string[];
      version: string;
    }) => Promise<CollectionAssetDoc>;
  }
}

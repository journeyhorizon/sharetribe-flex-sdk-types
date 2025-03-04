declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export class sitemapData {
      queryListings(): Promise<
        CollectionResourceDoc<{
          id: SharetribeFlexSdk.Types.UUID;
          type: "listingSitemapEntry";
        }>
      >;
      queryAssets(params: { pathPrefix: string }): Promise<
        CollectionResourceDoc<{
          id: SharetribeFlexSdk.Types.UUID;
          type: "assetSitemapEntry";
          attributes: {
            assetPath: string;
          };
        }>
      >;
    }
  }
}

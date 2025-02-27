declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface MarketplaceAttributes {
      name: string;
      /**
       * @deprecated
       */
      description: null;
    }

    export interface NormalizedMarketplace
      extends NormalizedResourceObject<"marketplace", MarketplaceAttributes> {}

    export interface Marketplace
      extends DenormalizedResourceObject<NormalizedMarketplace> {}

    export class marketplace {
      show(params?: {
        "fields.marketplace"?: string[];
      }): Promise<SingleResourceDoc<NormalizedMarketplace>>;
    }
  }
}

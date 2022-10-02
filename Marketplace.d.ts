declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface MarketplaceAttributes {
      name: string;
    }
    export interface NormalizedMarketplace
      extends NormalizeEntity<"marketplace"> {
      attributes: MarketplaceAttributes;
    }

    export interface Marketplace extends Entity<"marketplace"> {
      attributes: MarketplaceAttributes;
    }
  }
}

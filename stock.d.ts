declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {

    interface ResourceAttributesMap {
      stock: StockAttributes;
    }

    interface StockAttributes {
      quantity: number;
    }

    export interface NormalizedStock
      extends NormalizedResourceObject<"stock", StockAttributes, {}> {}

    export interface Stock
      extends DenormalizedResourceObject<NormalizedStock> {}

    interface CompareAndSetParams {
      listingId: ID;
      oldTotal: number;
      newTotal: number;
    }

    interface CompareAndSetQueryParams {
      expand?: boolean;
      "fields.stock": string[];
    }

    export class stock {
      compareAndSet(
        params: CompareAndSetParams,
        queryParams?: CompareAndSetQueryParams
      ): Promise<SingleResourceDoc<NormalizedStock>>;
    }
  }
}

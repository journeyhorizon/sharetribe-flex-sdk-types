declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface StockAttributes {
      quantity: number;
    }

    export interface Stock
      extends ResourceObject<"stock", StockAttributes, {}> {}

    export interface CompareAndSetParams {
      listingId: Types.UUID | string;
      oldTotal: number;
      newTotal: number;
    }

    export interface CompareAndSetQueryParams {
      expand?: boolean;
      "fields.stock": string[];
    }

    export class stock {
      compareAndSet(
        params: CompareAndSetParams,
        queryParams?: CompareAndSetQueryParams
      ): Promise<SingleResourceDoc<Stock>>;
    }
  }
}

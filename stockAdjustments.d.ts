declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      stockAdjustment: StockAdjustmentAttributes;
    }
    interface RelationshipsObjectMap {
      stockAdjustment: StockAdjustmentRelationships;
    }

    interface StockAdjustmentAttributes {
      at: Date;
      quantity: number;
    }

    type StockAdjustmentRelationships = {
      ownListing: {
        data: {
          id: Types.UUID;
          type: "ownListing";
        };
      };
      stockReservation: {
        data: {
          id: Types.UUID;
          type: "stockReservation";
        };
      };
    };

    export interface NormalizedStockAdjustment
      extends NormalizedResourceObject<
        "stockAdjustment",
        StockAdjustmentAttributes,
        StockAdjustmentRelationships
      > {}

    export interface StockAdjustment
      extends DenormalizedResourceObject<NormalizedStockAdjustment> {}

    interface StockAdjustmentBaseQueryParams {
      include?: Array<
        | "ownListing"
        | "ownListing.currentStock"
        | "stockReservation"
        | "stockReservation.transaction"
        | "stockReservation.transaction.customer"
        | "stockReservation.transaction.customer.profileImage"
      >;
      "fields.image"?: Array<`variants.${ImageVariants}`>;
      "fields.ownListing"?: string[];
      "fields.transaction"?: string[];
      [key: `imageVariant.${string}`]: string;
    }

    interface StockAdjustmentQueryParams
      extends StockAdjustmentBaseQueryParams {
      listingId: ID;
      start: Date;
      end: Date;
    }

    interface StockAdjustmentCreateParams {
      listingId: ID;
      quantity: number;
    }

    interface StockAdjustmentCreateQueryParams
      extends StockAdjustmentBaseQueryParams {
      expand?: boolean;
    }

    export class stockAdjustments {
      query(
        params: StockAdjustmentQueryParams
      ): Promise<CollectionResourceDoc<NormalizedStockAdjustment>>;
      create(
        params: StockAdjustmentCreateParams,
        queryParams?: StockAdjustmentCreateQueryParams
      ): Promise<SingleResourceDoc<NormalizedStockAdjustment>>;
    }
  }
}

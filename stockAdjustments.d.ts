declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface StockAdjustmentAttributes {
      at: Date | number;
      quantity: number;
    }

    export type StockAdjustmentRelationships = {
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

    export interface StockAdjustment
      extends ResourceObject<
        "stockAdjustment",
        StockAdjustmentAttributes,
        StockAdjustmentRelationships
      > {}

    export interface StockAdjustmentBaseQueryParams {
      include?: Array<
        | "ownListing"
        | "ownListing.currentStock"
        | "stockReservation"
        | "stockReservation.transaction"
        | "stockReservation.transaction.customer"
        | "stockReservation.transaction.customer.profileImage"
      >;
      "fields.image"?: Array<`variants.${PredefinedImageVariants}`>;
      "fields.ownListing"?: string[];
      "fields.transaction"?: string[];
    }

    export interface StockAdjustmentQueryParams
      extends StockAdjustmentBaseQueryParams {
      listingId: Types.UUID | string;
      start: Date | number;
      end: Date | number;
    }

    export interface StockAdjustmentCreateParams {
      listingId: Types.UUID | string;
      quantity: number;
    }

    export interface StockAdjustmentCreateQueryParams
      extends StockAdjustmentBaseQueryParams {
      expand?: boolean;
    }

    export class stockAdjustments {
      query(
        params: StockAdjustmentQueryParams
      ): Promise<CollectionResourceDoc<StockAdjustment>>;
      create(
        params: StockAdjustmentCreateParams,
        queryParams?: StockAdjustmentCreateQueryParams
      ): Promise<SingleResourceDoc<StockAdjustment>>;
    }
  }
}

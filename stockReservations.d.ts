declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {

    interface ResourceAttributesMap {
      stockReservation: StockReservationAttributes;
    }
    interface RelationshipsObjectMap {
      stockReservation: StockReservationRelationships;
    }
    interface StockReservationAttributes {
      quantity: number;
      state: "pending" | "proposed" | "accepted" | "declined" | "cancelled";
    }

    type StockReservationRelationships = {
      transaction: {
        data: {
          id: Types.UUID;
          type: "transaction";
        };
      };
    };

    export interface NormalizedStockReservation
      extends NormalizedResourceObject<
        "stockReservation",
        StockReservationAttributes,
        StockReservationRelationships
      > {}

    export interface StockReservation
      extends DenormalizedResourceObject<NormalizedStockReservation> {}
  }
}

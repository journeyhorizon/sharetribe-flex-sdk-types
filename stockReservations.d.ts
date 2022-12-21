declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface StockReservationAttributes {
      quantity: number;
      state: "pending" | "proposed" | "accepted" | "declined" | "cancelled";
    }

    export type StockReservationRelationships = {
      transaction: {
        data: {
          id: Types.UUID;
          type: "transaction";
        };
      };
    };

    export interface StockReservation
      extends ResourceObject<
        "stockReservation",
        StockReservationAttributes,
        StockReservationRelationships
      > {}
  }
}

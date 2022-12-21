declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface BookingAttributes {
      seats: number;
      start: Date | number;
      end: Date | number;
      displayStart: Date | number;
      displayEnd: Date | number;
      state: "pending" | "proposed" | "accepted" | "declined" | "cancelled";
    }
    export type BookingRelationships = {
      transaction: {
        data: {
          id: Types.UUID;
          type: "transaction";
        };
      };
    };

    export interface Booking
      extends ResourceObject<
        "booking",
        BookingAttributes,
        BookingRelationships
      > {}

    export interface BookingBaseQueryParams {
      include?: Array<
        | "transaction"
        | "transaction.customer"
        | "transaction.customer.profileImage"
      >;
      "fields.image"?: Array<`variants.${PredefinedImageVariants}`>;
      "fields.transaction"?: string[];
      "fields.user"?: string[];
    }

    export interface QueryBookingParams extends BookingBaseQueryParams {
      listingId: Types.UUID | string;
      start: Date | number;
      end: Date | number;
      state?: string | string[];
    }

    export class bookings {
      query(
        params: QueryBookingParams
      ): Promise<CollectionResourceDoc<Booking>>;
    }
  }
}

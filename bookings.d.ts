declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    type BookingState =
      | "pending"
      | "proposed"
      | "accepted"
      | "declined"
      | "cancelled";

    export interface BookingAttributes {
      seats: number;
      start: DateLike;
      end: DateLike;
      displayStart: DateLike;
      displayEnd: DateLike;
      state: BookingState;
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
      start: DateLike;
      end: DateLike;
      state?: string | string[];
    }

    export class bookings {
      query(
        params: QueryBookingParams
      ): Promise<CollectionResourceDoc<Booking>>;
    }
  }
}

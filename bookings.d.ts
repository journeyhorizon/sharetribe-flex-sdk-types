declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      booking: BookingAttributes;
    }

    interface RelationshipsObjectMap {
      booking: BookingRelationships;
    }

    type BookingState =
      | "pending"
      | "proposed"
      | "accepted"
      | "declined"
      | "cancelled";

    interface BookingAttributes {
      seats: number;
      start: Date;
      end: Date;
      displayStart: Date;
      displayEnd: Date;
      state: BookingState;
    }

    type BookingRelationships = {
      transaction: {
        data: {
          id: Types.UUID;
          type: "transaction";
        };
      };
    };

    export interface NormalizedBooking
      extends NormalizedResourceObject<
        "booking",
        BookingAttributes,
        BookingRelationships
      > {}

    export interface Booking
      extends DenormalizedResourceObject<NormalizedBooking> {}

    interface BookingBaseQueryParams {
      include?: Array<
        | "transaction"
        | "transaction.customer"
        | "transaction.customer.profileImage"
      >;
      "fields.image"?: Array<`variants.${ImageVariants}`>;
      "fields.transaction"?: string[];
      "fields.user"?: string[];
    }

    interface QueryBookingParams extends BookingBaseQueryParams {
      listingId: ID;
      start: Date;
      end: Date;
      state?: string | string[];
    }

    export class bookings {
      query(
        params: QueryBookingParams
      ): Promise<CollectionResourceDoc<NormalizedBooking>>;
    }
  }
}

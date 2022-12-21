declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface AvailabilityExceptionAttributes {
      seats: number;
      start: Date | number;
      end: Date | number;
    }

    export type AvailabilityExceptionRelationships = {
      ownListing: {
        data: {
          id: Types.UUID;
          type: "ownListing";
        };
      };
    };

    export interface AvailabilityException
      extends ResourceObject<
        "availabilityException",
        AvailabilityExceptionAttributes,
        AvailabilityExceptionRelationships
      > {}

    export interface AvailabilityExceptionBaseQueryParams {
      include?: Array<"ownListing">;
      "fields.ownListing"?: string[];
    }

    export interface QueryAvailabilityExceptionParams
      extends AvailabilityExceptionBaseQueryParams {
      listingId: Types.UUID | string;
      start: Date | number;
      end: Date | number;
    }

    export interface CreateAvailabilityExceptionParams {
      listingId: Types.UUID | string;
      start: Date | number;
      end: Date | number;
      seats: number;
    }

    export interface CreateAvailabilityExceptionQueryParams
      extends AvailabilityExceptionBaseQueryParams {
      expand?: boolean;
    }

    export interface DeleteAvailabilityExceptionParams {
      id: Types.UUID | string;
    }

    export interface DeleteAvailabilityExceptionQueryParams
      extends AvailabilityExceptionBaseQueryParams {
      expand?: boolean;
    }

    export class availabilityExceptions {
      query(
        params: QueryAvailabilityExceptionParams
      ): Promise<CollectionResourceDoc<AvailabilityException>>;
      create(
        params: CreateAvailabilityExceptionParams,
        queryParams?: CreateAvailabilityExceptionQueryParams
      ): Promise<SingleResourceDoc<AvailabilityException>>;
      delete(
        params: DeleteAvailabilityExceptionParams,
        queryParams?: DeleteAvailabilityExceptionQueryParams
      ): Promise<SingleResourceDoc<AvailabilityException>>;
    }
  }
}

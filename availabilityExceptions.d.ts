declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      availabilityException: AvailabilityExceptionAttributes;
    }
    interface RelationshipsObjectMap {
      availabilityException: AvailabilityExceptionRelationships;
    }

    interface AvailabilityExceptionAttributes {
      seats: number;
      start: Date;
      end: Date;
    }

    type AvailabilityExceptionRelationships = {
      ownListing: {
        data: {
          id: Types.UUID;
          type: "ownListing";
        };
      };
    };

    export interface NormalizedAvailabilityException
      extends NormalizedResourceObject<
        "availabilityException",
        AvailabilityExceptionAttributes,
        AvailabilityExceptionRelationships
      > {}

    export interface AvailabilityException
      extends DenormalizedResourceObject<NormalizedAvailabilityException> {}

    interface AvailabilityExceptionBaseQueryParams {
      include?: Array<"ownListing">;
      "fields.ownListing"?: string[];
      "fields.availabilityException"?: string[];
    }

    interface QueryAvailabilityExceptionParams
      extends AvailabilityExceptionBaseQueryParams {
      listingId: Types.UUID | string;
      start: Date;
      end: Date;
    }

    interface CreateAvailabilityExceptionParams {
      listingId: Types.UUID | string;
      start: Date;
      end: Date;
      seats: number;
    }

    interface CreateAvailabilityExceptionQueryParams
      extends AvailabilityExceptionBaseQueryParams {
      expand?: boolean;
    }

    interface DeleteAvailabilityExceptionParams {
      id: ID;
    }

    interface DeleteAvailabilityExceptionQueryParams
      extends AvailabilityExceptionBaseQueryParams {
      expand?: boolean;
    }

    export class availabilityExceptions {
      query(
        params: QueryAvailabilityExceptionParams
      ): Promise<CollectionResourceDoc<NormalizedAvailabilityException>>;
      create(
        params: CreateAvailabilityExceptionParams,
        queryParams?: CreateAvailabilityExceptionQueryParams
      ): Promise<SingleResourceDoc<NormalizedAvailabilityException>>;
      delete(
        params: DeleteAvailabilityExceptionParams,
        queryParams?: DeleteAvailabilityExceptionQueryParams
      ): Promise<SingleResourceDoc<NormalizedAvailabilityException>>;
    }
  }
}

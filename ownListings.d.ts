declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      ownListing: OwnListingAttributes;
    }
    interface RelationshipsObjectMap {
      ownListing: OwnListingRelationships;
    }
    export interface OwnListingPublicData extends Record<string, unknown> {}
    export interface OwnListingPrivateData extends Record<string, unknown> {}
    export interface OwnListingMetadata extends Record<string, unknown> {}

    export type OwnListingAvailabilityPlan =
      | {
          type: "availability-plan/day";
          entries: Array<{
            dayOfWeek: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
            seats: number;
          }>;
        }
      | {
          type: "availability-plan/time";
          entries: Array<{
            seats: number;
            dayOfWeek: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
            startTime: string;
            endTime: string;
          }>;
        };
    interface OwnListingAttributes {
      title: string;
      description: Nullable<string>;
      geolocation: Nullable<Types.LatLng>;
      createdAt: Date;
      price: Nullable<Types.Money>;
      availabilityPlan: Nullable<OwnListingAvailabilityPlan>;
      publicData: OwnListingPublicData;
      privateData: OwnListingPrivateData;
      metadata: OwnListingMetadata;
      state: "draft" | "pendingApproval" | "published" | "closed";
      delete: boolean;
    }

    type OwnListingRelationships = {
      marketplace: {
        data: {
          id: Types.UUID;
          type: "marketplace";
        };
      };
      author: {
        data: {
          id: Types.UUID;
          type: "user";
        };
      };
      images: {
        data: Array<{
          id: Types.UUID;
          type: "image";
        }>;
      };
      currentStock: {
        data: {
          id: Types.UUID;
          type: "stock";
        };
      };
    };

    export interface NormalizedOwnListing
      extends NormalizedResourceObject<
        "ownListing",
        OwnListingAttributes,
        OwnListingRelationships
      > {}

    export interface OwnListing
      extends DenormalizedResourceObject<NormalizedOwnListing> {}

    interface OwnListingBaseQueryParams {
      "fields.images"?: Array<`variants.${ImageVariants}`>;
      "fields.listing"?: string[];
      include?: Array<
        | "marketplace"
        | "author"
        | "author.profileImage"
        | "images"
        | "currentStock"
      >;
      [key: `imageVariant.${string}`]: string;
    }

    interface ShowOwnListingParams extends OwnListingBaseQueryParams {
      id: ID;
    }

    interface QueryOwnListingParams extends OwnListingBaseQueryParams {
      ids?: string[];
      page?: number;
      perPage?: number;
      keywords?: string;
      origin?: Types.LatLng;
      bounds?: Types.LatLngBounds;
      price?: string;
      start?: Date;
      end?: Date;
      seats?: number;
      availability?: "day-full" | "day-partial" | "time-full" | "time-partial";
      minDuration?: number;
      stockMode?: "strict" | "match-undefined";
      minStock?: number;
      [key: `pub_${string}`]: string | number | string[] | boolean;
      [key: `meta_${string}`]: string | number | string[] | boolean;
      sort?: Array<
        | "createdAt"
        | "-createdAt"
        | "price"
        | "-price"
        | `pub_${string}`
        | `meta_${string}`
        | `-pub_${string}`
        | `-meta_${string}`
      >;
    }

    interface CreateListingParams {
      title: string;
      description?: Nullable<string>;
      geolocation?: Nullable<Types.LatLng>;
      price?: Nullable<Types.Money>;
      availabilityPlan?: Nullable<OwnListingAvailabilityPlan>;
      privateData?: Partial<OwnListingPrivateData>;
      publicData?: Partial<OwnListingPublicData>;
      images?: Array<Types.UUID>;
    }

    interface CreateListingQueryParams extends OwnListingBaseQueryParams {
      expand?: boolean;
    }

    interface PublishDraftParams {
      id: ID;
    }

    interface PublishDraftQueryParams extends OwnListingBaseQueryParams {
      expand?: boolean;
    }

    interface DiscardCraftParams {
      id: ID;
    }

    interface DiscardCraftQueryParams extends OwnListingBaseQueryParams {
      expand?: boolean;
    }

    interface CloseListingParams {
      id: ID;
    }

    interface CloseListingQueryParams extends OwnListingBaseQueryParams {
      expand?: boolean;
    }

    interface OpenListingParams {
      id: ID;
    }

    interface OpenListingQueryParams extends OwnListingBaseQueryParams {
      expand?: boolean;
    }

    interface AddImageParams {
      id: ID;
      imageId: ID;
    }

    interface AddImageQueryParams extends OwnListingBaseQueryParams {
      expand?: boolean;
    }

    export class ownListings {
      show(
        params: ShowOwnListingParams
      ): Promise<SingleResourceDoc<NormalizedOwnListing>>;
      query(
        params: QueryOwnListingParams
      ): Promise<CollectionResourceDoc<NormalizedOwnListing>>;
      create(
        params: CreateListingParams,
        queryParams?: CreateListingQueryParams
      ): Promise<SingleResourceDoc<NormalizedOwnListing>>;
      createDraft(
        params: CreateListingParams,
        queryParams?: CreateListingQueryParams
      ): Promise<SingleResourceDoc<NormalizedOwnListing>>;
      update(
        params: { id: ID } & Partial<CreateListingParams>,
        queryParams?: CreateListingQueryParams
      ): Promise<SingleResourceDoc<NormalizedOwnListing>>;
      publishDraft(
        params: PublishDraftParams,
        queryPrams?: PublishDraftQueryParams
      ): Promise<SingleResourceDoc<NormalizedOwnListing>>;
      discardDraft(
        params: DiscardCraftParams,
        queryParams?: DiscardCraftQueryParams
      ): Promise<SingleResourceDoc<NormalizedOwnListing>>;
      close(
        params: CloseListingParams,
        queryParams?: CloseListingQueryParams
      ): Promise<SingleResourceDoc<NormalizedOwnListing>>;
      open(
        params: OpenListingParams,
        queryParams?: OpenListingQueryParams
      ): Promise<SingleResourceDoc<NormalizedOwnListing>>;
      addImage(
        params: AddImageParams,
        queryParams?: AddImageQueryParams
      ): Promise<SingleResourceDoc<NormalizedOwnListing>>;
    }
  }
}

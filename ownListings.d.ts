declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface OwnListingPublicData {}
    export interface OwnListingPrivateData {}
    export interface OwnListingMetadata {}

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
            startTime: string;
            endTime: string;
          }>;
        };
    export interface OwnListingAttributes {
      title: string;
      description: string | null;
      geolocation: Types.LatLng | null;
      createdAt: Date | number;
      price: Types.Money | null;
      availabilityPlan: OwnListingAvailabilityPlan | null;
      publicData: OwnListingPublicData;
      privateData: OwnListingPrivateData;
      metadata: OwnListingMetadata;
      state: "draft" | "pendingApproval" | "published" | "closed";
      delete: boolean;
    }

    export type OwnListingRelationships = {
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

    export interface OwnListing
      extends ResourceObject<
        "ownListing",
        OwnListingAttributes,
        OwnListingRelationships
      > {}

    export interface OwnListingBaseQueryParams {
      "fields.images"?: Array<`variants.${PredefinedImageVariants}`>;
      "fields.listing"?: string[];
      include?: Array<
        | "marketplace"
        | "author"
        | "author.profileImage"
        | "images"
        | "currentStock"
      >;
    }

    export interface ShowOwnListingParams extends OwnListingBaseQueryParams {
      id: Types.UUID | string;
    }

    export interface QueryOwnListingParams {
      page?: number;
      perPage?: number;
    }

    export interface CreateListingParams {
      title: string;
      description?: string | null;
      geolocation?: Types.LatLng | null;
      price?: Types.Money | null;
      availabilityPlan?: OwnListingAvailabilityPlan | null;
      privateData?: Partial<OwnListingPrivateData>;
      publicData?: Partial<OwnListingPublicData>;
      images?: Array<Types.UUID>;
    }

    export interface CreateListingQueryParams
      extends OwnListingBaseQueryParams {
      expand?: boolean;
    }

    export interface PublishDraftParams {
      id: Types.UUID | string;
    }

    export interface PublishDraftQueryParams extends OwnListingBaseQueryParams {
      expand?: boolean;
    }

    export interface DiscardCraftParams {
      id: Types.UUID | string;
    }

    export interface DiscardCraftQueryParams extends OwnListingBaseQueryParams {
      expand?: boolean;
    }

    export interface CloseListingParams {
      id: Types.UUID | string;
    }

    export interface CloseListingQueryParams extends OwnListingBaseQueryParams {
      expand?: boolean;
    }

    export interface OpenListingParams {
      id: Types.UUID | string;
    }

    export interface OpenListingQueryParams extends OwnListingBaseQueryParams {
      expand?: boolean;
    }

    export interface AddImageParams {
      id: Types.UUID | string;
      imageId: Types.UUID | string;
    }

    export interface AddImageQueryParams extends OwnListingBaseQueryParams {
      expand?: boolean;
    }

    export class ownListings {
      show(
        params: ShowOwnListingParams
      ): Promise<SingleResourceDoc<OwnListing>>;
      query(
        params: QueryOwnListingParams
      ): Promise<CollectionResourceDoc<OwnListing>>;
      create(
        params: CreateListingParams,
        queryParams?: CreateListingQueryParams
      ): Promise<SingleResourceDoc<OwnListing>>;
      createDraft(
        params: CreateListingParams,
        queryParams?: CreateListingQueryParams
      ): Promise<SingleResourceDoc<OwnListing>>;
      update(
        params: { id: Types.UUID } & Partial<CreateListingParams>,
        queryParams?: CreateListingQueryParams
      ): Promise<SingleResourceDoc<OwnListing>>;
      publishDraft(
        params: PublishDraftParams,
        queryPrams?: PublishDraftQueryParams
      ): Promise<SingleResourceDoc<OwnListing>>;
      discardDraft(
        params: DiscardCraftParams,
        queryParams?: DiscardCraftQueryParams
      ): Promise<SingleResourceDoc<OwnListing>>;
      close(
        params: CloseListingParams,
        queryParams?: CloseListingQueryParams
      ): Promise<SingleResourceDoc<OwnListing>>;
      open(
        params: OpenListingParams,
        queryParams?: OpenListingQueryParams
      ): Promise<SingleResourceDoc<OwnListing>>;
      addImage(
        params: AddImageParams,
        queryParams?: AddImageQueryParams
      ): Promise<SingleResourceDoc<OwnListing>>;
    }
  }
}

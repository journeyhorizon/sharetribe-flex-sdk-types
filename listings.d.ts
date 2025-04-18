declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      listing: ListingAttributes;
    }
    interface RelationshipsObjectMap {
      listing: ListingRelationships;
    }

    export type ListingAvailabilityPlan =
      | {
          type: "availability-plan/day";
        }
      | {
          type: "availability-plan/time";
          timezone: string;
        };

    export interface ListingPublicData extends Record<string, unknown> {}
    export interface ListingMetadata extends Record<string, unknown> {}

    type ListingRelationships = {
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
        data: Array<{ id: Types.UUID; type: "image" }>;
      };
      currentStock: {
        data: {
          id: Types.UUID;
          type: "stock";
        };
      };
    };

    interface ListingAttributes {
      title: string;
      description: Nullable<string>;
      geolocation: Nullable<Types.LatLng>;
      createdAt: Date;
      price: Nullable<Types.Money>;
      availabilityPlan: Nullable<ListingAvailabilityPlan>;
      state: "published" | "closed";
      deleted: boolean;
      publicData: ListingPublicData;
      metadata: ListingMetadata;
    }

    export interface NormalizedListing
      extends NormalizedResourceObject<
        "listing",
        ListingAttributes,
        ListingRelationships
      > {}

    export interface Listing
      extends DenormalizedResourceObject<NormalizedListing> {}

    interface ShowListingParams {
      id: ID;
      "fields.image"?: Array<`variants.${ImageVariants}`>;
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

    interface QueryListingsParams {
      authorId?: ID;
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
      "fields.image"?: Array<`variants.${ImageVariants}`>;
      "fields.listing"?: string[];
      "fields.user"?: string[];
      include?: Array<
        | "marketplace"
        | "author"
        | "author.profileImage"
        | "images"
        | "currentStock"
      >;
      "limit.images"?: number;
      [key: `imageVariant.${string}`]: string;
    }

    export class listings {
      show(
        params: ShowListingParams
      ): Promise<SingleResourceDoc<NormalizedListing>>;
      query(
        params: QueryListingsParams
      ): Promise<CollectionResourceDoc<NormalizedListing>>;
    }
  }
}

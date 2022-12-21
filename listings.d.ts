declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export type ListingAvailabilityPlan =
      | {
          type: "availability-plan/day";
        }
      | {
          type: "availability-plan/time";
          timezone: string;
        };

    export interface ListingPublicData {}
    export interface ListingMetadata {}

    export type ListingRelationships = {
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

    export interface ListingAttributes {
      title: string;
      description: string | null;
      geolocation: Types.LatLng | null;
      createdAt: Date | number;
      price: Types.Money | null;
      availabilityPlan: ListingAvailabilityPlan | null;
      state: "published" | "closed";
      deleted: boolean;
      publicData: ListingPublicData;
      metadata: ListingMetadata;
    }

    export interface Listing
      extends ResourceObject<
        "listing",
        ListingAttributes,
        ListingRelationships
      > {}

    export interface ShowListingParams {
      id: Types.UUID | string;
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

    export interface QueryListingsParams {
      page?: number;
      perPage?: number;
      authorId?: Types.UUID | string;
      ids?: string[];
      keywords?: string;
      origin?: Types.LatLng;
      bounds?: Types.LatLngBounds;
      price?: string;
      start?: Date | number;
      end?: Date | number;
      seats?: number;
      availability?: "day-full" | "day-partial" | "time-full" | "time-partial";
      minDuration?: number;
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
        | `-pub_${string} | -meta_${string}`
      >;
      "fields.image"?: Array<`variants.${PredefinedImageVariants}`>;
      "fields.listing"?: string[];
      "fields.user"?: string[];
      include?: Array<
        | "marketplace"
        | "author"
        | "author.profileImage"
        | "images"
        | "currentStock"
      >;
    }

    export class listings {
      show(params: ShowListingParams): Promise<SingleResourceDoc<Listing>>;
      query(
        params: QueryListingsParams
      ): Promise<CollectionResourceDoc<Listing>>;
    }
  }
}

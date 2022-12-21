declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ReviewAttributes {
      type: "ofProvider" | "ofCustomer";
      createdAt: Date | number;
      deleted: boolean;
    }
    interface PublicReviewAttributes extends ReviewAttributes {
      content: string;
      rating: 1 | 2 | 3 | 4 | 5;
    }
    interface PendingReviewAttributes extends ReviewAttributes {
      content: null;
      rating: null;
    }

    export type ReviewRelationships = {
      author: {
        data: {
          id: Types.UUID;
          type: "user";
        };
      };
      listing: {
        data: {
          id: Types.UUID;
          type: "listing";
        };
      };
      subject: {
        data: {
          id: Types.UUID;
          type: "user";
        };
      };
    };

    export interface Review
      extends ResourceObject<
        "review",
        PublicReviewAttributes | PendingReviewAttributes,
        ReviewRelationships
      > {}

    export interface ReviewBaseQueryParams {
      include?: Array<
        | "author"
        | "author.profileImage"
        | "listing"
        | "subject"
        | "subject.profileImage"
      >;
      "fields.image"?: Array<`variants.${PredefinedImageVariants}`>;
      "fields.listing"?: string[];
      "fields.user"?: string[];
    }

    export interface ShowReviewParams extends ReviewBaseQueryParams {
      id: Types.UUID;
    }

    interface QueryReviewBaseParam extends ReviewBaseQueryParams {
      type?: "ofCustomer" | "ofProvider";
      state?: Array<"public" | "pending">;
      page?: number;
      perPage?: number;
    }

    export interface QueryReviewByTransactionIdParams
      extends QueryReviewBaseParam {
      transactionId: Types.UUID | string;
    }
    export interface QueryReviewByListingIdParams extends QueryReviewBaseParam {
      listingId: Types.UUID | string;
    }
    export interface QueryReviewBySubjectIdParams extends QueryReviewBaseParam {
      subjectId: Types.UUID | string;
    }

    export class Reviews {
      show(params: ShowReviewParams): Promise<SingleResourceDoc<Review>>;
      query(
        params:
          | QueryReviewByTransactionIdParams
          | QueryReviewByListingIdParams
          | QueryReviewBySubjectIdParams
      ): Promise<CollectionResourceDoc<Review>>;
    }
  }
}

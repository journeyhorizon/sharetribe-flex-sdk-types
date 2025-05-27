declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      review: ReviewAttributes;
    }
    interface ReviewAttributes {
      type: "ofProvider" | "ofCustomer";
      createdAt: Date;
      deleted: boolean;
    }
    interface PublicReviewAttributes extends ReviewAttributes {
      content: string;
      rating: 1 | 2 | 3 | 4 | 5;
      state: "public";
    }
    interface PendingReviewAttributes extends ReviewAttributes {
      content: null;
      rating: null;
      state: "pending";
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

    export interface NormalizedReview
      extends NormalizedResourceObject<
        "review",
        PublicReviewAttributes | PendingReviewAttributes,
        ReviewRelationships
      > {}

    export interface Review
      extends DenormalizedResourceObject<NormalizedReview> {}

    interface ReviewBaseQueryParams {
      include?: Array<
        | "author"
        | "author.profileImage"
        | "listing"
        | "subject"
        | "subject.profileImage"
      >;
      "fields.image"?: Array<`variants.${ImageVariants}`>;
      "fields.listing"?: string[];
      "fields.user"?: string[];
      [key: `imageVariant.${string}`]: string;
    }

    interface ShowReviewParams extends ReviewBaseQueryParams {
      id: ID;
    }

    interface QueryReviewBaseParam extends ReviewBaseQueryParams {
      type?: "ofCustomer" | "ofProvider";
      state?: Array<"public" | "pending">;
      page?: number;
      perPage?: number;
    }

    interface QueryReviewByTransactionIdParams extends QueryReviewBaseParam {
      transactionId: ID;
    }
    interface QueryReviewByListingIdParams extends QueryReviewBaseParam {
      listingId: ID;
    }
    interface QueryReviewBySubjectIdParams extends QueryReviewBaseParam {
      subjectId: ID;
    }

    export class Reviews {
      show(
        params: ShowReviewParams
      ): Promise<SingleResourceDoc<NormalizedReview>>;
      query(
        params:
          | QueryReviewByTransactionIdParams
          | QueryReviewByListingIdParams
          | QueryReviewBySubjectIdParams
      ): Promise<CollectionResourceDoc<NormalizedReview>>;
    }
  }
}

declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      transaction: TransactionAttributes;
    }
    interface RelationshipsObjectMap {
      transaction: TransactionRelationships;
    }
    type LineItemCountValue<T = number> =
      | {
          quantity: T;
        }
      | {
          percentage: T;
        }
      | {
          seats: number;
          units: number;
        };

    export type LineItem<T = number> = {
      code: `line-item/${string}`;
      unitPrice: Types.Money;
      lineTotal: Types.Money;
      reversal: boolean;
      includeFor: Array<"customer" | "provider">;
    } & LineItemCountValue<T>;

    export interface TransactionProtectedData extends Record<string, unknown> {}
    export interface TransactionMetadata extends Record<string, unknown> {}

    interface TransactionAttributes {
      createdAt: Date;
      processName: string;
      processVersion: number;
      lastTransition: string;
      lastTransitionedAt: Date;
      lineItems: Array<LineItem>;
      payinTotal: Types.Money;
      payoutTotal: Types.Money;
      protectedData: TransactionProtectedData;
      metadata: TransactionMetadata;
      transitions: Array<{
        transition: string;
        createdAt: Date;
        by: "customer" | "provider" | "operator" | "system";
      }>;
    }

    type TransactionRelationships = {
      marketplace: {
        data: {
          id: Types.UUID;
          type: "marketplace";
        };
      };
      listing: {
        data: {
          id: Types.UUID;
          type: "listing";
        };
      };
      provider: {
        data: {
          id: Types.UUID;
          type: "user";
        };
      };
      customer: {
        data: {
          id: Types.UUID;
          type: "user";
        };
      };
      booking: {
        data: {
          id: Types.UUID;
          type: "booking";
        };
      };
      stockReservation: {
        data: {
          id: Types.UUID;
          type: "stockReservation";
        };
      };
      reviews: {
        data: Array<{
          id: Types.UUID;
          type: "review";
        }>;
      };
      messages: {
        data: Array<{
          id: Types.UUID;
          type: "message";
        }>;
      };
    };

    export interface NormalizedTransaction
      extends NormalizedResourceObject<
        "transaction",
        TransactionAttributes,
        TransactionRelationships
      > {}

    export interface Transaction
      extends DenormalizedResourceObject<NormalizedTransaction> {}

    export interface TransactionBaseQueryParams {
      include?: Array<
        | "marketplace"
        | "listing"
        | "listing.images"
        | "listing.currentStock"
        | "provider"
        | "provider.profileImage"
        | "customer"
        | "customer.profileImage"
        | "booking"
        | "stockReservation"
        | "reviews"
        | "reviews.author"
        | "reviews.author.profileImage"
        | "reviews.subject"
        | "reviews.subject.profileImage"
        | "messages"
        | "messages.sender"
        | "messages.sender.profileImage"
      >;
      "fields.image"?: Array<`variants.${ImageVariants}`>;
      "fields.user"?: string[];
      "fields.listing"?: string[];
      [key: `imageVariant.${string}`]: string | undefined;
    }

    interface ShowTransactionParams extends TransactionBaseQueryParams {
      id: ID;
    }

    interface QueryTransactionParams extends TransactionBaseQueryParams {
      only?: "sale" | "order";
      lastTransitions: string[];
    }

    interface InitiateTransactionParams {
      processAlias: string;
      transition: string;
      params: Record<string, unknown>;
    }

    interface InitiateTransactionQueryParams
      extends TransactionBaseQueryParams {
      expand?: boolean;
    }

    interface TransitionTransactionParams {
      id: Types.UUID | string;
      transition: string;
      params: Record<string, unknown>;
    }

    interface TransitionTransactionQueryParams
      extends TransactionBaseQueryParams {
      expand?: boolean;
    }

    export class transactions {
      show(
        params: ShowTransactionParams
      ): Promise<SingleResourceDoc<NormalizedTransaction>>;
      query(
        params: QueryTransactionParams
      ): Promise<CollectionResourceDoc<NormalizedTransaction>>;
      initiate(
        params: InitiateTransactionParams,
        queryParams?: InitiateTransactionQueryParams
      ): Promise<SingleResourceDoc<NormalizedTransaction>>;
      initiateSpeculative(
        params: InitiateTransactionParams,
        queryParams?: InitiateTransactionQueryParams
      ): Promise<SingleResourceDoc<NormalizedTransaction>>;
      transition(
        params: TransitionTransactionParams,
        queryParams?: TransitionTransactionQueryParams
      ): Promise<SingleResourceDoc<NormalizedTransaction>>;
      transitionSpeculative(
        params: TransitionTransactionParams,
        queryParams?: TransitionTransactionQueryParams
      ): Promise<SingleResourceDoc<NormalizedTransaction>>;
    }
  }
}

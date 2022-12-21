import { type } from "os";

declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    type LineItemCountValue =
      | {
          quantity: number;
        }
      | {
          percentage: number;
        }
      | {
          seats: number;
          units: number;
        };
    export type LineItem = {
      code: `line-item/${string}`;
      unitPrice: Types.Money;
      lineTotal: Types.Money;
      reversal: boolean;
      includedFor: Array<"customer" | "provider">;
    } & LineItemCountValue;

    export interface TransactionProtectedData {}
    export interface TransactionMetadata {}

    export interface TransactionAttributes {
      createdAt: Date | number;
      processName: string;
      processVersion: number;
      lastTransition: string;
      lastTransitionedAt: Date | number;
      lineItems: Array<{
        code: string;
        unitPrice: Types.Money;
      }>;
      payinTotal: Types.Money;
      payoutTotal: Types.Money;
      protectedData: TransactionProtectedData;
      metadata: TransactionMetadata;
      transitions: Array<{
        transition: string;
        createdAt: Date | number;
        by: "customer" | "provider" | "operator" | "system";
      }>;
    }
    export type TransactionRelationships = {
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

    export interface Transaction
      extends ResourceObject<
        "transaction",
        TransactionAttributes,
        TransactionRelationships
      > {}

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
      "fields.image"?: Array<`variants.${PredefinedImageVariants}`>;
      "fields.user"?: string[];
      "fields.listing"?: string[];
    }

    export interface ShowTransactionParams extends TransactionBaseQueryParams {
      id: Types.UUID | string;
    }

    export interface QueryTransactionParams extends TransactionBaseQueryParams {
      only?: "sale" | "order";
      lastTransitions: string[];
    }

    export interface InitiateTransactionParams {
      processAlias: string;
      transition: string;
      params: Record<string, unknown>;
    }

    export interface InitiateTransactionQueryParams
      extends TransactionBaseQueryParams {
      expand?: boolean;
    }

    export interface TransitionTransactionParams {
      id: Types.UUID | string;
      transition: string;
      params: Record<string, unknown>;
    }

    export interface TransitionTransactionQueryParams
      extends TransactionBaseQueryParams {
      expand?: boolean;
    }

    export class transactions {
      show(
        params: ShowTransactionParams
      ): Promise<SingleResourceDoc<Transaction>>;
      query(
        params: QueryTransactionParams
      ): Promise<CollectionResourceDoc<Transaction>>;
      initiate(
        params: InitiateTransactionParams,
        queryParams?: InitiateTransactionQueryParams
      ): Promise<SingleResourceDoc<Transaction>>;
      initiateSpeculative(
        params: InitiateTransactionParams,
        queryParams?: InitiateTransactionQueryParams
      ): Promise<SingleResourceDoc<Transaction>>;
      transition(
        params: TransitionTransactionParams,
        queryParams?: TransitionTransactionQueryParams
      ): Promise<SingleResourceDoc<Transaction>>;
      transitionSpeculative(
        params: TransitionTransactionParams,
        queryParams?: TransitionTransactionQueryParams
      ): Promise<SingleResourceDoc<Transaction>>;
    }
  }
}

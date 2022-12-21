declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface StripeAccountAttributes {
      stripeAccountId: string;
      stripeAccountData: Record<string, unknown>;
    }

    export interface StripeAccount
      extends SharetribeFlexSdk.ResourceObject<
        "stripeAccount",
        StripeAccountAttributes,
        {}
      > {}

    export type StripeRequestCapabilities =
      | "card_payments"
      | "transfers"
      | "legacy_payments";

    export interface CreateStripeAccountParams {
      country: string;
      accountToken?: string;
      bankAccountToken?: string;
      businessProfileMCC?: string;
      businessProfileURL?: string;
      businessProfileProductDescription?: string;
      requestedCapabilities?: Array<StripeRequestCapabilities>;
    }

    export interface CreateStripeAccountQueryParams {
      expand?: boolean;
    }

    export interface UpdateStripeAccountQueryParams {
      expand?: boolean;
    }

    export interface UpdateStripeAccountParams
      extends Partial<Omit<"CreateStripeAccountParams", "country">> {}

    export class stripeAccount {
      fetch(): Promise<SingleResourceDoc<StripeAccount>>;
      create(
        params: CreateStripeAccountParams,
        queryParams?: CreateStripeAccountQueryParams
      ): Promise<SingleResourceDoc<StripeAccount>>;
      update(
        params: UpdateStripeAccountParams,
        queryParams?: UpdateStripeAccountQueryParams
      ): Promise<SingleResourceDoc<StripeAccount>>;
    }
  }
}

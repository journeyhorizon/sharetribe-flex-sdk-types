declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      stripeAccount: StripeAccountAttributes;
    }

    interface StripeAccountAttributes {
      stripeAccountId: string;
      stripeAccountData: Record<string, unknown>;
    }

    export interface NormalizedStripeAccount
      extends NormalizedResourceObject<
        "stripeAccount",
        StripeAccountAttributes,
        {}
      > {}

    export interface StripeAccount
      extends DenormalizedResourceObject<NormalizedStripeAccount> {}

    type StripeRequestCapabilities =
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

    interface CreateStripeAccountQueryParams {
      expand?: boolean;
    }

    interface UpdateStripeAccountQueryParams {
      expand?: boolean;
    }

    interface UpdateStripeAccountParams
      extends Partial<Omit<"CreateStripeAccountParams", "country">> {}

    export class stripeAccount {
      fetch(): Promise<SingleResourceDoc<NormalizedStripeAccount>>;
      create(
        params: CreateStripeAccountParams,
        queryParams?: CreateStripeAccountQueryParams
      ): Promise<SingleResourceDoc<NormalizedStripeAccount>>;
      update(
        params: UpdateStripeAccountParams,
        queryParams?: UpdateStripeAccountQueryParams
      ): Promise<SingleResourceDoc<NormalizedStripeAccount>>;
    }
  }
}

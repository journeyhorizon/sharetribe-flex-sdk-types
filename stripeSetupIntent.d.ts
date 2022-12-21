declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface StripeSetupIntentAttributes {
      stripeSetupIntentId: string;
      clientSecret: string;
    }
    export interface StripeSetupIntent
      extends ResourceObject<
        "stripeSetupIntent",
        StripeSetupIntentAttributes,
        {}
      > {}

    export interface CreateStripeSetupIntentParams {}
    export interface CreateStripeSetupIntentQueryParams {
      expand?: boolean;
    }

    export class stripeSetupIntents {
      create(
        params: CreateStripeSetupIntentParams,
        queryParams?: CreateStripeSetupIntentQueryParams
      ): Promise<SingleResourceDoc<StripeSetupIntent>>;
    }
  }
}

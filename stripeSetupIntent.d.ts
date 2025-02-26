declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      stripeSetupIntent: StripeSetupIntentAttributes;
    }
    interface StripeSetupIntentAttributes {
      stripeSetupIntentId: string;
      clientSecret: string;
    }
    export interface NormalizedStripeSetupIntent
      extends NormalizedResourceObject<
        "stripeSetupIntent",
        StripeSetupIntentAttributes,
        {}
      > {}

    export interface StripeSetupIntent
      extends DenormalizedResourceObject<NormalizedStripeSetupIntent> {}

    interface CreateStripeSetupIntentParams {}
    interface CreateStripeSetupIntentQueryParams {
      expand?: boolean;
    }

    export class stripeSetupIntents {
      create(
        params: CreateStripeSetupIntentParams,
        queryParams?: CreateStripeSetupIntentQueryParams
      ): Promise<SingleResourceDoc<NormalizedStripeSetupIntent>>;
    }
  }
}

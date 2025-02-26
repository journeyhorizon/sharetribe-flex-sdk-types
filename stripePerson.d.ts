declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      stripePerson: StripePersonAttributes;
    }
    interface StripePersonAttributes {
      stripePersonId: string;
    }

    interface NormalizedStripePerson
      extends NormalizedResourceObject<
        "stripePerson",
        StripePersonAttributes,
        {}
      > {}

    export interface StripePerson
      extends DenormalizedResourceObject<NormalizedStripePerson> {}

    interface CreateStripePersonParams {
      personToken: string;
    }

    interface CreateStripePersonQueryParams {
      expand?: boolean;
    }

    export class stripePersons {
      create(
        params: CreateStripePersonParams,
        queryParams?: CreateStripePersonQueryParams
      ): Promise<SingleResourceDoc<NormalizedStripePerson>>;
    }
  }
}

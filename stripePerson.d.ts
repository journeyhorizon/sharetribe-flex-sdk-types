declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface StripePersonAttributes {
      stripePersonId: string;
    }

    export interface StripePerson
      extends ResourceObject<"stripePerson", StripePersonAttributes, {}> {}

    export interface CreateStripePersonParams {
      personToken: string;
    }

    export interface CreateStripePersonQueryParams {
      expand?: boolean;
    }

    export class stripePersons {
      create(
        params: CreateStripePersonParams,
        queryParams?: CreateStripePersonQueryParams
      ): Promise<SingleResourceDoc<StripePerson>>;
    }
  }
}

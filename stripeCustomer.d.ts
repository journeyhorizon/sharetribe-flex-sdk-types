declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      stripeCustomer: StripeCustomerAttributes;
    }
    interface RelationshipsObjectMap {
      stripeCustomer: StripeCustomerRelationships;
    }
    interface StripeCustomerAttributes {
      stripeCustomerId: string;
    }

    type StripeCustomerRelationships = {
      defaultPaymentMethod: {
        data: {
          id: Types.UUID;
          type: "stripePaymentMethod";
        };
      };
    };

    export interface NormalizedStripeCustomer
      extends NormalizedResourceObject<
        "stripeCustomer",
        StripeCustomerAttributes,
        StripeCustomerRelationships
      > {}

    export interface StripeCustomer
      extends DenormalizedResourceObject<NormalizedStripeCustomer> {}

    interface CreateStripeCustomerParams {
      stripePaymentMethodId?: string;
      stripeCustomerEmail?: string;
    }

    interface CreateStripeCustomerQueryParams {
      expand?: boolean;
    }

    interface AddPaymentMethodParams {
      stripePaymentMethodId: string;
    }

    interface AddPaymentMethodQueryParams {
      stripePaymentMethodId: string;
      expand?: boolean;
    }

    interface DeletePaymentMethodParams {}

    interface DeletePaymentMethodQueryParams {
      expand?: boolean;
    }

    export class stripeCustomer {
      create(
        params: CreateStripeCustomerParams,
        queryParams?: CreateStripeCustomerQueryParams
      ): Promise<SingleResourceDoc<StripeCustomer>>;
      addPaymentMethod(
        params: AddPaymentMethodParams,
        queryParams?: AddPaymentMethodQueryParams
      ): Promise<SingleResourceDoc<StripeCustomer>>;
      deletePaymentMethod(
        params: DeletePaymentMethodParams,
        queryParams?: DeletePaymentMethodQueryParams
      ): Promise<SingleResourceDoc<StripeCustomer>>;
    }
  }
}

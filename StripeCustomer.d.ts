declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface StripeCustomerAttributes {
      stripeCustomerId: string;
    }

    export type StripeCustomerRelationships = {
      defaultPaymentMethod: {
        data: {
          id: Types.UUID;
          type: "stripePaymentMethod";
        };
      };
    };

    export interface StripeCustomer
      extends ResourceObject<
        "stripeCustomer",
        StripeCustomerAttributes,
        StripeCustomerRelationships
      > {}

    export interface CreateStripeCustomerParams {
      stripePaymentMethodId?: string;
      stripeCustomerEmail?: string;
    }

    export interface CreateStripeCustomerQueryParams {
      expand?: boolean;
    }

    export interface AddPaymentMethodParams {
      stripePaymentMethodId: string;
    }

    export interface AddPaymentMethodQueryParams {
      stripePaymentMethodId: string;
    }

    export interface DeletePaymentMethodParams {}

    export interface DeletePaymentMethodQueryParams {}

    export class stripeCustomer {
      create(
        params: CreateStripeCustomerParams,
        queryParams?: CreateStripeCustomerQueryParams
      ): Promise<SingleResourceDoc<stripeCustomer>>;
      addPaymentMethod(
        params: AddPaymentMethodParams,
        queryParams?: AddPaymentMethodQueryParams
      ): Promise<SingleResourceDoc<stripeCustomer>>;
      deletePaymentMethod(
        params: DeletePaymentMethodParams,
        queryParams?: DeletePaymentMethodQueryParams
      ): Promise<SingleResourceDoc<stripeCustomer>>;
    }
  }
}

declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export type StripeCustomerRelationships = "defaultPaymentMethod";

    export interface StripeCustomerAttributes {
      stripeCustomerId: string;
    }

    export interface NormalizedStripeCustomer
      extends NormalizeEntity<"stripeCustomer"> {
      attributes: StripeCustomerAttributes;
      relationships: Record<
        StripeCustomerRelationships,
        {
          data: {
            id: Types.UUID;
            type: "stripePaymentMethod";
          };
        }
      >;
    }
    export interface StripeCustomer extends Entity<"stripeCustomer"> {
      attributes: StripeCustomerAttributes;
      defaultPaymentMethod: Nullable<StripePaymentMethod>;
    }
  }
}

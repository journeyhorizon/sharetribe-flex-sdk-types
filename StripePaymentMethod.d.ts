declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface StripePaymentMethodAttributes {
      type: "stripe-payment-method/card";
      stripePaymentMethodId: string;
      card: {
        brand: string;
        last4Digits: string;
        expirationYear: number;
        expirationMonth: number;
      };
    }
    export interface NormalizedStripePaymentMethod
      extends NormalizeEntity<"stripePaymentMethod"> {}
    export interface StripePaymentMethod
      extends Entity<"stripePaymentMethod"> {}
  }
}

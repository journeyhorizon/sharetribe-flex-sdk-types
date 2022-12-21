declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface StripePaymentMethodAttributes {
      type: "stripe-payment-method/card";
      stripePaymentMethodId: string;
      card: {
        brand: string;
        last4Digits: string;
        expirationYear: number;
        expirationMonth: number;
      };
    }

    export interface StripePaymentMethod
      extends ResourceObject<
        "stripePaymentMethod",
        StripePaymentMethodAttributes,
        {}
      > {}
  }
}

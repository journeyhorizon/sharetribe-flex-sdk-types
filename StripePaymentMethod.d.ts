declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      stripePaymentMethod: StripePaymentMethodAttributes;
    }

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
      extends NormalizedResourceObject<
        "stripePaymentMethod",
        StripePaymentMethodAttributes,
        {}
      > { }

    export interface StripePaymentMethod extends DenormalizedResourceObject<NormalizedStripePaymentMethod> { }
  }
}

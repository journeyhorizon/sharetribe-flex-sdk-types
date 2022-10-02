declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface StripeAccountAttributes {
      stripeAccountId: string;
      stripeAccountData: Nullable<Record<string, unknown>>;
    }
    export interface NormalizedStripeAccount
      extends NormalizeEntity<"stripeAccount"> {}
    export interface StripeAccount extends Entity<"stripeAccount"> {}
  }
}

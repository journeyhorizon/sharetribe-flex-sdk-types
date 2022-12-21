declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface StripeAccountLinkAttributes {
      url: string;
      expiresAt: Date | number;
    }

    export interface StripeAccountLink
      extends ResourceObject<
        "stripeAccountLink",
        StripeAccountLinkAttributes,
        {}
      > {}

    export interface CreateStripeAccountLinkParams {
      failureURL: string;
      successURL: string;
      type: string;
      collect: string;
    }

    export interface CreateStripeAccountLinkQueryParams {
      expand?: boolean;
    }

    export class stripeAccountLinks {
      create(
        params: CreateStripeAccountLinkParams,
        queryParams?: CreateStripeAccountLinkQueryParams
      ): Promise<SingleResourceDoc<StripeAccountLink>>;
    }
  }
}

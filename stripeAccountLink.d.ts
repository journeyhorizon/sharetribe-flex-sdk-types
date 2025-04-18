declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      stripeAccountLink: StripeAccountLinkAttributes;
    }
    interface StripeAccountLinkAttributes {
      url: string;
      expiresAt: Date;
    }

    interface NormalizedStripeAccountLink
      extends NormalizedResourceObject<
        "stripeAccountLink",
        StripeAccountLinkAttributes,
        {}
      > {}

    export interface StripeAccountLink
      extends DenormalizedResourceObject<NormalizedStripeAccountLink> {}

    interface CreateStripeAccountLinkParams {
      failureURL: string;
      successURL: string;
      type: string;
      // @deprecated
      collect?: string;
      collectionOptions?: {
        fields: "currently_due" | "eventually_due";
        future_requirements: "include" | "omit";
      };
    }

    interface CreateStripeAccountLinkQueryParams {
      expand?: boolean;
    }

    export class stripeAccountLinks {
      create(
        params: CreateStripeAccountLinkParams,
        queryParams?: CreateStripeAccountLinkQueryParams
      ): Promise<SingleResourceDoc<NormalizedStripeAccountLink>>;
    }
  }
}

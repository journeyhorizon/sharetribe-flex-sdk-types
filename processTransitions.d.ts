declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      processTransition: ProcessTransitionAttributes;
    }

    interface ProcessTransitionAttributes {
      name: string;
      actor: "customer" | "provider" | "operator" | "system";
      actions: string[];
      params: {
        req: Record<string, unknown> | null;
        opt: Record<string, unknown> | null;
      };
    }
    export interface NormalizeProcessTransition
      extends NormalizedResourceObject<
        "processTransition",
        ProcessTransitionAttributes,
        {}
      > {}
    export interface ProcessTransition
      extends DenormalizedResourceObject<NormalizeProcessTransition> {}

    interface QueryProcessTransitionParams {
      transactionId: ID;
    }
    export class processTransitions {
      query(
        params: QueryProcessTransitionParams
      ): Promise<CollectionResourceDoc<NormalizeProcessTransition>>;
    }
  }
}

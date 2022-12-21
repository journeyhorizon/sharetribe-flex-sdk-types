declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface ProcessTransitionAttributes {
      name: string;
      actor: "customer" | "provider" | "operator" | "system";
      actions: string[];
      params: {
        req: Record<string, unknown> | null;
        opt: Record<string, unknown> | null;
      };
    }
    export interface ProcessTransition
      extends ResourceObject<
        "processTransition",
        ProcessTransitionAttributes,
        {}
      > {}

    export interface QueryProcessTransitionParams {
      transactionId: Types.UUID | string;
    }
    class processTransition {
      query(
        params: QueryProcessTransitionParams
      ): Promise<CollectionResourceDoc<ProcessTransition>>;
    }
  }
}

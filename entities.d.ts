declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface NormalizeEntity<T extends string = ""> {
      id: Types.UUID;
      type: T;
      attributes: unknown;
      relationships: Record<
        string,
        {
          data:
            | { id: Types.UUID; type: string }
            | Array<{ id: Types.UUID; type: string }>;
        }
      >;
    }
    export interface Entity<T extends string = "">
      extends Exclude<NormalizeEntity<T>, "relationships"> {}
  }
}

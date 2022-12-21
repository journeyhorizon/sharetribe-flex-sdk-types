declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export type AttributesObject<
      ATTRS extends { [k: string]: any } = { [k: string]: any }
    > = { [K in keyof ATTRS]: ATTRS[K] };

    export interface ResourceObject<
      T extends string = string,
      A extends AttributesObject = AttributesObject,
      R extends RelationshipsObject = RelationshipsObject
    > {
      id: SharetribeFlexSdk.Types.UUID;
      type: T;
      attributes: AttributesObject<A>;
      relationships?: RelationshipsObject<R>;
    }

    export type RelationshipsObject<
      ATTRS extends { [k: string]: RelationshipsWithData } = {
        [k: string]: RelationshipsWithData;
      }
    > = { [K in keyof ATTRS]: ATTRS[K] };

    export type RelationshipsWithData =
      | RelationshipWithSingleData
      | RelationshipWithMultipleData;

    export interface RelationshipWithSingleData {
      data: Pick<ResourceObject, "id" | "type">;
    }
    export interface RelationshipWithMultipleData {
      data: Array<Pick<ResourceObject, "id" | "type">>;
    }
  }
}

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
      relationships: RelationshipsObject<R>;
    }

    type DenormalisedRelationship<
      R extends RelationshipsObject = RelationshipsObject
    > = {
      [P in keyof R]?: R[P] extends RelationshipWithSingleData
        ? ResourceObject<R[P]["data"]["type"]>
        : R[P] extends RelationshipWithMultipleData
        ? ResourceObject<R[P]["data"][number]["type"]>
        : unknown;
    };

    export type DenormalisedResourceObject<R extends ResourceObject> = Omit<
      R,
      "relationships"
    > &
      DenormalisedRelationship<R["relationships"]>;

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

declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export type ResourceTypes =
      | "marketplace"
      | "user"
      | "currentUser"
      | "passwordReset"
      | "stripeAccount"
      | "stripeAccountLink"
      | "stripePerson"
      | "stripeSetupIntent"
      | "stripeCustomer"
      | "stripePaymentMethod"
      | "listing"
      | "ownListing"
      | "availabilityException"
      | "image"
      | "transaction"
      | "processTransition"
      | "booking"
      | "timeSlot"
      | "stock"
      | "stockAdjustment"
      | "stockReservation"
      | "review"
      | "message"
      | "permissionSet"
      | (string & {});

    type AttributesObject<
      ATTRS extends { [k: string]: any } = { [k: string]: any }
    > = { [K in keyof ATTRS]: ATTRS[K] };

    export interface NormalizedResourceObject<
      T extends ResourceTypes = string,
      A extends AttributesObject = AttributesObject,
      R extends RelationshipsObject = RelationshipsObject
    > {
      id: SharetribeFlexSdk.Types.UUID;
      type: T;
      attributes: A;
      relationships?: R;
    }

    interface ResourceAttributesMap {}
    interface RelationshipsObjectMap {}

    type ResolveResourceAttributes<T extends ResourceTypes> =
      T extends keyof ResourceAttributesMap
        ? ResourceAttributesMap[T]
        : AttributesObject;

    type ResolveResourceRelationships<T extends ResourceTypes> =
      T extends keyof RelationshipsObjectMap
        ? RelationshipsObjectMap[T]
        : RelationshipsObject;

    type DenormalizedRelationship<
      R extends RelationshipsObject | undefined = RelationshipsObject
    > = {
      [P in keyof R]?:
        | (R[P] extends RelationshipWithSingleData
            ? DenormalizedResourceObject<
                NormalizedResourceObject<
                  R[P]["data"]["type"],
                  ResolveResourceAttributes<R[P]["data"]["type"]>,
                  ResolveResourceRelationships<R[P]["data"]["type"]>
                >
              >
            : R[P] extends RelationshipWithMultipleData
            ? Array<
                DenormalizedResourceObject<
                  NormalizedResourceObject<
                    R[P]["data"][number]["type"],
                    ResolveResourceAttributes<R[P]["data"][number]["type"]>,
                    ResolveResourceRelationships<R[P]["data"][number]["type"]>
                  >
                >
              >
            : unknown)
        | null;
    };

    export type DenormalizedResourceObject<R extends NormalizedResourceObject> =
      Omit<R, "relationships"> & DenormalizedRelationship<R["relationships"]>;

    export type RelationshipsObject<
      ATTRS extends { [k: string]: RelationshipsWithData } = {
        [k: string]: RelationshipsWithData;
      }
    > = { [K in keyof ATTRS]: ATTRS[K] };

    export type RelationshipsWithData =
      | RelationshipWithSingleData
      | RelationshipWithMultipleData;

    export interface RelationshipWithSingleData {
      data: Pick<NormalizedResourceObject, "id" | "type">;
    }
    export interface RelationshipWithMultipleData {
      data: Array<Pick<NormalizedResourceObject, "id" | "type">>;
    }
  }
}

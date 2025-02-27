declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      permissionSet: PermissionSetAttributes;
    }
    interface PermissionSetAttributes {
      postListings: "permission/allow" | "permission/deny";
      initiateTransactions: "permission/allow" | "permission/deny";
      read: "permission/allow" | "permission/deny";
    }

    export interface NormalizedPermissionSet
      extends NormalizedResourceObject<
        "permissionSet",
        PermissionSetAttributes
      > {}

    export interface PermissionSet
      extends DenormalizedResourceObject<NormalizedPermissionSet> {}
  }
}

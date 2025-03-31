declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      user: UserAttributes;
    }
    interface RelationshipsObjectMap {
      user: UserRelationships;
    }

    export interface UserPublicData extends Record<string, unknown> {}

    export interface UserMetadata extends Record<string, unknown> {}

    interface UserAttributes {
      banned: boolean;
      deleted: boolean;
      createdAt: Date;
      state: "active" | "pendingApproval" | "banned";
      profile: {
        displayName: string;
        abbreviatedName: string;
        bio: Nullable<string>;
        publicData: UserPublicData;
        metadata: UserMetadata;
      };
    }

    type UserRelationships = {
      profileImage: {
        data: {
          id: Types.UUID;
          type: "image";
        };
      };
      marketplace: {
        data: {
          id: Types.UUID;
          type: "marketplace";
        };
      };
    };

    export interface NormalizedUser
      extends SharetribeFlexSdk.NormalizedResourceObject<
        "user",
        UserAttributes,
        UserRelationships
      > {}

    export interface User extends DenormalizedResourceObject<NormalizedUser> {}

    interface ShowUserParams {
      id: Types.UUID;
      include?: Array<"profileImage" | "marketplace">;
      "fields.image"?: `variants.${SharetribeFlexSdk.ImageVariants}`;
      [key: `imageVariant.${string}`]: string;
    }

    export class Users {
      show(params: ShowUserParams): Promise<DocWithData<NormalizedUser>>;
    }
  }
}

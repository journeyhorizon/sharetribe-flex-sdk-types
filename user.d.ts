declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface UserPublicData {}

    export interface UserMetadata {}

    export interface UserAttributes {
      banned: boolean;
      deleted: boolean;
      createdAt: Date | number;
      profile: {
        displayName: string;
        abbreviatedName: string;
        bio: string | null;
        publicData: UserPublicData;
        metadata: UserMetadata;
      };
    }

    export type UserRelationships = {
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

    export interface User
      extends SharetribeFlexSdk.ResourceObject<
        "user",
        UserAttributes,
        UserRelationships
      > {}

    export interface ShowUserParams {
      id: Types.UUID;
      include?: Array<"profileImage" | "marketplace">;
      "fields.image"?: `variants.${SharetribeFlexSdk.PredefinedImageVariants}`;
    }

    export class Users {
      show(params: ShowUserParams): Promise<DocWithData<User>>;
    }
  }
}

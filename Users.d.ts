declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    type UserRelationships = "marketplace" | "profileImage";
    interface User {
      id: Types.UUID;
      type: "user";
      attributes: {
        banned: boolean;
        deleted: boolean;
        createdAt: Date;
        profile: {
          displayName: string;
          abbreviatedName: string;
          bio: string | null;
          publicData: Record<string, unknown>;
          metadata: Record<string, unknown>;
        };
      };
      relationships: Record<
        UserRelationships,
        {
          data: {
            id: Types.UUID;
            type: "marketplace" | "image";
          };
        }
      >;
    }
    interface ShowUserParams {
      id: Types.UUID;
      include?: Array<UserRelationships>;
      "fields.image"?: Array<`string.${ImageVariants}`>;
      "fields.user"?: Array<
        | keyof User["attributes"]
        | `profile.${keyof User["attributes"]["profile"]}`
      >;
    }
    class Users {
      show(params: ShowUserParams): Promise<Response<User>>;
    }
  }
}

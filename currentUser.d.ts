declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      currentUser: CurrentUserAttributes;
    }

    interface RelationshipsObjectMap {
      currentUser: CurrentUserRelationships;
    }

    export interface CurrentUserPublicData extends Record<string, unknown> {}
    export interface CurrentUserProtectedData extends Record<string, unknown> {}
    export interface CurrentUserPrivateData extends Record<string, unknown> {}
    export interface CurrentUserMetadata extends Record<string, unknown> {}

    interface CurrentUserAttributes {
      banned: boolean;
      deleted: boolean;
      createdAt: Date;
      email: string;
      state: "banned" | "active" | "pendingApproval";
      emailVerified: boolean;
      pendingEmail: Nullable<string>;
      stripeConnected: boolean;
      identityProviders: Array<{
        idpId: string;
        userId: string;
      }>;
      profile: {
        firstName: string;
        lastName: string;
        displayName: string;
        abbreviatedName: string;
        bio: Nullable<string>;
        publicData: CurrentUserPublicData;
        protectedData: CurrentUserProtectedData;
        privateData: CurrentUserPrivateData;
        metadata: CurrentUserMetadata;
      };
    }
    type CurrentUserRelationships = {
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
      stripeAccount: {
        data: {
          id: Types.UUID;
          type: "stripeAccount";
        };
      };
      stripeCustomer: {
        data: {
          id: Types.UUID;
          type: "stripeCustomer";
        };
      };
      effectivePermissionSet: {
        data: {
          id: Types.UUID;
          type: "permissionSet";
        };
      };
    };

    interface CurrentUserBaseQueryParams {
      include?: Array<
        | "marketplace"
        | "profileImage"
        | "stripeAccount"
        | "stripeCustomer"
        | "stripeCustomer.defaultPaymentMethod"
        | "effectivePermissionSet"
      >;
      "fields.image"?: Array<`variants.${ImageVariants}`>;
      [key: `imageVariant.${string}`]: string;
    }

    export interface NormalizedCurrentUser
      extends NormalizedResourceObject<
        "currentUser",
        CurrentUserAttributes,
        CurrentUserRelationships
      > {}

    export interface CurrentUser
      extends DenormalizedResourceObject<NormalizedCurrentUser> {}

    interface ShowCurrentUserParams extends CurrentUserBaseQueryParams {}

    interface DeleteCurrentUserParams {
      currentPassword: string;
    }

    interface DeleteCurrentUserQueryParams extends CurrentUserBaseQueryParams {
      expand?: boolean;
    }

    interface CreateUserParams {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      displayName?: string;
      bio?: string;
      publicData?: Partial<CurrentUserPublicData>;
      protectedData?: Partial<CurrentUserProtectedData>;
      privateData?: Partial<CurrentUserPrivateData>;
    }

    interface CreateUserQueryParams extends CurrentUserBaseQueryParams {
      expand?: boolean;
    }

    interface CreateUserWithIDPParams {
      idpId: string;
      idpClientId: string;
      idpToken: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      displayName?: string;
      bio?: string;
      publicData?: Partial<CurrentUserPublicData>;
      protectedData?: Partial<CurrentUserProtectedData>;
      privateData?: Partial<CurrentUserPrivateData>;
    }

    interface CreateUserWithIDPQueryParams extends CurrentUserBaseQueryParams {
      expand?: boolean;
    }

    interface UpdateProfileParams {
      firstName?: string;
      lastName?: string;
      displayName?: string;
      bio?: string;
      publicData?: Partial<CurrentUserPublicData>;
      protectedData?: Partial<CurrentUserProtectedData>;
      privateData?: Partial<CurrentUserPrivateData>;
      profileImageId?: Types.UUID | string;
    }

    interface UpdateProfileQueryParams extends CurrentUserBaseQueryParams {
      expand?: boolean;
    }

    interface ChangePasswordParams {
      currentPassword: string;
      newPassword: string;
    }

    interface ChangePasswordQueryParams extends CurrentUserBaseQueryParams {
      expand?: boolean;
    }

    interface ChangeEmailParams {
      currentPassword: string;
      email: string;
    }

    interface ChangeEmailQueryParams extends CurrentUserBaseQueryParams {
      expand?: boolean;
    }

    interface VerifyEmailParams {
      verificationToken: string;
    }

    interface VerifyEmailQueryParams extends CurrentUserBaseQueryParams {
      expand?: boolean;
    }

    export class currentUser {
      show(
        params?: ShowCurrentUserParams
      ): Promise<SingleResourceDoc<NormalizedCurrentUser>>;
      delete(
        params: DeleteCurrentUserParams,
        queryParams?: DeleteCurrentUserQueryParams
      ): Promise<SingleResourceDoc<NormalizedCurrentUser>>;
      create(
        params: CreateUserParams,
        queryParams?: CreateUserQueryParams
      ): Promise<SingleResourceDoc<NormalizedCurrentUser>>;
      createWithIdp(
        params: CreateUserWithIDPParams,
        queryParams?: CreateUserWithIDPQueryParams
      ): Promise<SingleResourceDoc<NormalizedCurrentUser>>;
      updateProfile(
        params: UpdateProfileParams,
        queryParams?: UpdateProfileQueryParams
      ): Promise<SingleResourceDoc<NormalizedCurrentUser>>;
      changePassword(
        params: ChangePasswordParams,
        queryParams?: ChangePasswordQueryParams
      ): Promise<SingleResourceDoc<NormalizedCurrentUser>>;
      changeEmail(
        params: ChangeEmailParams,
        queryParams?: ChangeEmailQueryParams
      ): Promise<SingleResourceDoc<NormalizedCurrentUser>>;
      verifyEmail(
        params: VerifyEmailParams,
        queryParams?: VerifyEmailQueryParams
      ): Promise<SingleResourceDoc<NormalizedCurrentUser>>;
      sendVerificationEmail(): Promise<void>;
    }
  }
}

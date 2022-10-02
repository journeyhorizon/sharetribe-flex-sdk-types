declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    type CurrentUserRelationships =
      | "marketplace"
      | "profileImage"
      | "stripeAccount"
      | "stripeCustomer"
      | "stripeCustomer.defaultPayment";

    export interface CurrentUserAttributes {
      banned: boolean;
      deleted: boolean;
      createdAt: Date;
      email: string;
      emailVerified: boolean;
      pendingEmail: string | null;
      stripeConnected: boolean;
      profile: {
        firstName: string;
        lastName: string;
        displayName: string;
        abbreviatedName: string;
        bio: string | null;
        publicData: Record<string, unknown>;
        protectedData: Record<string, unknown>;
        privateData: Record<string, unknown>;
        metadata: Record<string, unknown>;
      };
    }

    export interface NormalizedCurrentUser
      extends NormalizeEntity<"currentUser"> {
      attributes: CurrentUserAttributes;
      relationships: Record<
        CurrentUserRelationships,
        {
          data: {
            id: Types.UUID;
            type:
              | "marketplace"
              | "image"
              | "stripeAccount"
              | "stripeCustomer"
              | "stripePaymentMethod";
          };
        }
      >;
    }

    export interface CurrentUser extends Entity<"currentUser"> {
      attributes: CurrentUserAttributes;
      profileImage: Nullable<Image>;
      stripeAccount: Nullable<StripeAccount>;
      stripeCustomer: Nullable<StripeCustomer>;
      marketplace: Nullable<Marketplace>;
    }

    interface ShowCurrentUserParams {
      include?: Array<CurrentUserRelationships>;
      "fields.image"?: Array<`string.${ImageVariants}`>;
    }

    interface DeleteCurrentUserParams {
      currentPassword: string;
    }

    interface DeleteCurrentUserOptions {
      expand?: boolean;
    }

    interface CreateUserParams {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      displayName?: string;
      bio?: string;
      publicData?: Record<string, unknown>;
      protectedData?: Record<string, unknown>;
      privateData?: Record<string, unknown>;
    }

    interface CreateUserOptions {
      expand?: boolean;
    }

    interface CreateUserWithIdpParams {
      idpId: string;
      idpClientId: string;
      idpToken: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      displayName?: string;
      bio?: string;
      publicData?: Record<string, unknown>;
      protectedData?: Record<string, unknown>;
      privateData?: Record<string, unknown>;
    }
    interface CreateUserWithIdpOptions {
      expand?: boolean;
    }

    interface UpdateProfileParams {
      firstName?: string;
      lastName?: string;
      displayName?: string;
      bio?: string;
      publicData?: Record<string, unknown>;
      protectedData?: Record<string, unknown>;
      privateData?: Record<string, unknown>;
      profileImageId: Types.UUID;
    }

    interface UpdateProfileOptions {
      expand?: boolean;
    }

    interface ChangePasswordParams {
      currentPassword: string;
      newPassword: string;
    }

    interface ChangePasswordOptions {
      expand?: boolean;
    }

    interface ChangeEmailParams {
      currentPassword: string;
      email: string;
    }

    interface ChangeEmailOptions {
      expand?: boolean;
    }

    interface VerifyEmailParams {
      verificationToken: string;
    }

    interface VerifyEmailOptions {
      expand?: boolean;
    }

    class CurrentUser {
      /**
       * Query the public details of the user to whom the access token belongs.
       */
      show(
        param?: ShowCurrentUserParams
      ): Promise<Response<NormalizedCurrentUser>>;
      /**
       * Command that deletes current user.
       *
       * This API endpoint requires a **trusted user access token**.
       */
      delete(
        params: DeleteCurrentUserParams,
        options?: DeleteCurrentUserOptions
      ): Promise<Response<NormalizedCurrentUser>>;
      create(
        params: CreateUserParams,
        options?: CreateUserOptions
      ): Promise<Response<NormalizedCurrentUser>>;
      createWithIdp(
        params: CreateUserWithIdpParams,
        options?: CreateUserWithIdpOptions
      ): Promise<Response<NormalizedCurrentUser>>;
      updateProfile(
        params: UpdateProfileParams,
        options?: UpdateProfileOptions
      ): Promise<Response<NormalizedCurrentUser>>;
      changePassword(
        params: ChangePasswordParams,
        options?: ChangePasswordOptions
      ): Promise<Response<NormalizedCurrentUser>>;
      changeEmail(
        params: ChangeEmailParams,
        options?: ChangeEmailOptions
      ): Promise<Response<NormalizedCurrentUser>>;
      verifyEmail(
        params: VerifyEmailParams,
        options?: VerifyEmailOptions
      ): Promise<Response<NormalizedCurrentUser>>;
      sendVerificationEmail(): Promise<void>;
    }
  }
}

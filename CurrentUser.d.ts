declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface CurrentUserPublicData {}
    export interface CurrentUserProtectedData {}
    export interface CurrentUserPrivateData {}
    export interface CurrentUserMetadata {}
    export interface CurrentUserAttributes {
      banned: boolean;
      deleted: boolean;
      createdAt: Date | number;
      email: string;
      emailVerified: boolean;
      pendingEmail: string | null;
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
        bio: string | null;
        publicData: CurrentUserPublicData;
        protectedData: CurrentUserProtectedData;
        privateData: CurrentUserPrivateData;
        metadata: CurrentUserMetadata;
      };
    }
    export type CurrentUserRelationships = {
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
    };

    interface CurrentUserBaseQueryParams {
      include?: Array<
        | "marketplace"
        | "profileImage"
        | "stripeAccount"
        | "stripeCustomer"
        | "stripeCustomer.defaultPaymentMethod"
      >;
      "fields.image"?: Array<`variants.${PredefinedImageVariants}`>;
    }

    export interface CurrentUser
      extends ResourceObject<
        "currentUser",
        CurrentUserAttributes,
        CurrentUserRelationships
      > {}

    export interface ShowCurrentUserParams extends CurrentUserBaseQueryParams {}

    export interface DeleteCurrentUserParams {
      currentPassword: string;
    }

    export interface DeleteCurrentUserQueryParams
      extends CurrentUserBaseQueryParams {
      expand?: boolean;
    }

    export interface CreateUserParams {
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

    export interface CreateUserQueryParams extends CurrentUserBaseQueryParams {
      expand?: boolean;
    }

    export interface CreateUserWithIDPParams {
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

    export interface CreateUserWithIDPQueryParams
      extends CurrentUserBaseQueryParams {
      expand?: boolean;
    }

    export interface UpdateProfileParams {
      firstName?: string;
      lastName?: string;
      displayName?: string;
      bio?: string;
      publicData?: Partial<CurrentUserPublicData>;
      protectedData?: Partial<CurrentUserProtectedData>;
      privateData?: Partial<CurrentUserPrivateData>;
      profileImageId?: Types.UUID;
    }

    export interface UpdateProfileQueryParams
      extends CurrentUserBaseQueryParams {
      expand?: boolean;
    }

    export interface ChangePasswordParams {
      currentPassword: string;
      newPassword: string;
    }

    export interface ChangePasswordQueryParams
      extends CurrentUserBaseQueryParams {
      expand?: boolean;
    }

    export interface ChangeEmailParams {
      currentPassword: string;
      email: string;
    }

    export interface ChangeEmailQueryParams extends CurrentUserBaseQueryParams {
      expand?: boolean;
    }

    export interface VerifyEmailParams {
      verificationToken: string;
    }

    export interface VerifyEmailQueryParams extends CurrentUserBaseQueryParams {
      expand?: boolean;
    }

    export class currentUser {
      /**
       * Query the public details of the user to whom the access token belongs.
       *
       * @param {ShowCurrentUserParams} [params]
       * @return {Promise<SingleResourceDoc<CurrentUser>>}
       * @memberof currentUser
       */
      show(
        params?: ShowCurrentUserParams
      ): Promise<SingleResourceDoc<CurrentUser>>;
      /**
       * This API endpoint requires a trusted user access token.
       *
       * Command that deletes current user. Please note that:
       *
       * The user account and all the listings the user has created will be deleted.
       *
       * Personal user data will be removed according to GDPR guidelines. The messages and reviews the user has sent will not be deleted.
       *
       * If the user has ongoing transactions, they will not move forward.The user cannot receive payouts after deletion.
       *
       * Payouts will not be made for any ongoing transaction involving this user, including payouts for other users.
       *
       * This action is permanent.
       *
       * @return {Promise<SingleResourceDoc<CurrentUser>>}
       * @memberof currentUser
       */
      delete(
        params: DeleteCurrentUserParams,
        queryParams?: DeleteCurrentUserQueryParams
      ): Promise<SingleResourceDoc<CurrentUser>>;
      /**
       * Command that creates a new marketplace user.
       * When the user is created, email message is sent to the provided email address with an email verification token (or link, depending on the configured email template for your marketplace). The email verification token is valid for 48 hours.
       *
       * @param {CreateUserParams} params
       * @param {CreateUserQueryParams} [queryParams]
       * @return {Promise<SingleResourceDoc<CurrentUser>>}
       * @memberof currentUser
       */
      create(
        params: CreateUserParams,
        queryParams?: CreateUserQueryParams
      ): Promise<SingleResourceDoc<CurrentUser>>;
      createWithIdp(
        params: CreateUserWithIDPParams,
        queryParams?: CreateUserWithIDPQueryParams
      ): Promise<SingleResourceDoc<CurrentUser>>;
      /**
       * Command that updates the authenticated user's profile information.
       *
       * @param {UpdateProfileParams} params
       * @param {UpdateProfileQueryParams} [queryParams]
       * @return {Promise<SingleResourceDoc<CurrentUser>>}
       * @memberof currentUser
       */
      updateProfile(
        params: UpdateProfileParams,
        queryParams?: UpdateProfileQueryParams
      ): Promise<SingleResourceDoc<CurrentUser>>;
      /**
       * Command that changes the authenticated user's password.
       *
       * Calls to this command require the current user password for additional authorization.
       *
       * @param {ChangePasswordParams} params
       * @param {ChangePasswordQueryParams} [queryParams]
       * @return {Promise<SingleResourceDoc<CurrentUser>>}
       * @memberof currentUser
       */
      changePassword(
        params: ChangePasswordParams,
        queryParams?: ChangePasswordQueryParams
      ): Promise<SingleResourceDoc<CurrentUser>>;
      /**
       * Command that initiates email change for the authenticated user. If the user has previously verified their email address, the response will contain the new email in the pendingEmail attribute. Otherwise, email will immediately be replaced (and emailVerified remains false).
       *
       * The email change will be completed when the new address is verified via the /current_user/verify_email API endpoint.
       *
       * This command sends an email message to the user, containing an email verification token or link. The token is valid for 48 hours.
       *
       * Calls to this command require the current user password for additional authorization.
       *
       * @param {ChangeEmailParams} params
       * @param {ChangeEmailQueryParams} [queryParams]
       * @return {Promise<SingleResourceDoc<CurrentUser>>}
       * @memberof currentUser
       */
      changeEmail(
        params: ChangeEmailParams,
        queryParams?: ChangeEmailQueryParams
      ): Promise<SingleResourceDoc<CurrentUser>>;
      /**
       * Command that marks user's current or pending email as verified. If the user had a pendingEmail (i.e. they initiated email change via /current_user/change_email), then that email becomes the new primary email for the user.
       *
       * @param {VerifyEmailParams} params
       * @param {VerifyEmailQueryParams} [queryParams]
       * @return {Promise<SingleResourceDoc<CurrentUser>>}
       * @memberof currentUser
       */
      verifyEmail(
        params: VerifyEmailParams,
        queryParams?: VerifyEmailQueryParams
      ): Promise<SingleResourceDoc<CurrentUser>>;
      sendVerificationEmail(): Promise<void>;
    }
  }
}

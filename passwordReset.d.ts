declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface RequestResetPasswordParams {
      email: string;
    }

    export interface ResetPasswordParams {
      email: string;
      passwordResetToken: string;
      newPassword: string;
    }

    export class passwordReset {
      request(params: RequestResetPasswordParams): Promise<
        SingleResourceDoc<{
          id: Types.UUID;
          type: "passwordReset";
        }>
      >;
      reset(params: ResetPasswordParams): Promise<
        SingleResourceDoc<{
          id: Types.UUID;
          type: "passwordReset";
        }>
      >;
    }
  }
}

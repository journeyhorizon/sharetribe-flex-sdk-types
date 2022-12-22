declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export class transit {
      read(
        str: string,
        opts?: {
          typeHandlers?: Array<{
            sdkType: unknown;
            customType: unknown;
            writer: (v: unknown) => unknown;
            reader: (v: unknown) => unknown;
          }>;
        }
      ): Record<string, unknown>;
      write(
        data: Record<string, unknown> | unknown,
        opts?: {
          typeHandlers?: Array<{
            sdkType: unknown;
            customType: unknown;
            writer: (v: unknown) => unknown;
            reader: (v: unknown) => unknown;
          }>;
          verbose?: boolean;
        }
      ): Record<string, unknown>;
    }
  }
}

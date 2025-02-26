declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export type TypeHandler = {
      sdkType: unknown;
      customType: unknown;
      writer: (v: unknown) => unknown;
      reader: (v: unknown) => unknown;
    };
    export class transit {
      read(
        str: string,
        opts?: {
          typeHandlers?: Array<TypeHandler>;
        }
      ): any;
      write(
        data: Record<string, unknown> | unknown,
        opts?: {
          typeHandlers?: Array<TypeHandler>;
          verbose?: boolean;
        }
      ): any;
    }
  }
}

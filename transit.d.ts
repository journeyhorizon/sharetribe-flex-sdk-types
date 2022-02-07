import { types } from "./types";

export interface TypeHandler<SdkType extends types = any, CustomType = any> {
  type: SdkType;
  customType: CustomType;
  writer: (v: any) => SdkType;
  reader: (v: any) => CustomType;
}

export declare type transit = {
  read: (
    str: string,
    options: {
      typeHandlers: Array<TypeHandler>;
    }
  ) => any;
  write: (
    data: any,
    options: {
      typeHandlers: Array<TypeHandler>;
      verbose?: boolean;
    }
  ) => any;
};

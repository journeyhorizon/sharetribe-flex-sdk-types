declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export type PredefinedImageVariants =
      | "default"
      | "landscape-crop"
      | "landscape-crop2x"
      | "landscape-crop4x"
      | "landscape-crop6x"
      | "scaled-small"
      | "scaled-medium"
      | "scaled-large"
      | "scaled-xlarge"
      | "square-small"
      | "square-small2x"
      | "facebook"
      | "twitter";

    export interface ImageAttributes {
      variants: Record<
        PredefinedImageVariants,
        {
          width: number;
          height: number;
          url: string;
          name: string;
        }
      >;
    }
    export interface Image
      extends SharetribeFlexSdk.ResourceObject<"image", ImageAttributes, {}> {}

    export class images {
      upload(): Promise<any>;
    }
  }
}

declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      image: ImageAttributes;
    }

    export type ImageVariants =
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
      | "twitter"
      | (string & {});

    interface ImageAttributes {
      variants: Record<
        ImageVariants,
        {
          width: number;
          height: number;
          url: string;
          name: string;
        }
      >;
    }
    export interface NormalizedImage
      extends NormalizedResourceObject<"image", ImageAttributes, {}> {}

    export interface Image
      extends DenormalizedResourceObject<NormalizedImage> {}

    export class images {
      upload(
        params: { image: any },
        queryParams?: {
          expanded?: boolean;
          "fields.image"?: Array<`variants.${ImageVariants}`>;
          [key: `imageVariant.${string}`]: string;
        }
      ): Promise<any>;
    }
  }
}

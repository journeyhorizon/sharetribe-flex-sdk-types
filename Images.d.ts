declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export type ImageVariants =
      | "default"
      | "landscape-crop"
      | "landscape-crop2x"
      | "landscape-crop4x"
      | "landscape-crop6x"
      | "scaled-small"
      | "scaled-medium"
      | "scale0large"
      | "scale-xlarge"
      | "square-small"
      | "square-small2x"
      | "facebook"
      | "twitter";
    interface Image {
      id: Types.UUID;
      type: "image";
      attributes: {
        variants: [
          Record<
            string | ImageVariants,
            {
              name: string;
              width: number;
              height: number;
              url: string;
            }
          >
        ];
      };
    }

    interface UploadImageParams {
      image: Blob | unknown;
    }

    interface UploadImageOptions {
      expand?: boolean;
      "fields.image"?: Array<`string.${ImageVariants}`>;
    }

    class Images {
      upload(
        params: UploadImageParams,
        options?: UploadImageOptions
      ): Promise<Response<Image>>;
    }
  }
}

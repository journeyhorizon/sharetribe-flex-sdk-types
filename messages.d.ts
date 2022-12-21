declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface MessageAttributes {
      content: string;
      createdAt: Date | number;
    }
    export type MessageRelationships = {
      sender: {
        data: {
          id: Types.UUID;
          type: "user";
        };
      };
      transaction: {
        data: {
          id: Types.UUID;
          type: "transaction";
        };
      };
    };

    export interface Message
      extends ResourceObject<
        "message",
        MessageAttributes,
        MessageRelationships
      > {}

    interface MessageBaseParams {
      include?: Array<"sender" | "sender.profileImage" | "transaction">;
      "fields.image"?: Array<`variants.${PredefinedImageVariants}`>;
      "fields.user"?: string[];
      "fields.transaction"?: string[];
    }

    export interface QueryMessageParams extends MessageBaseParams {
      page?: number;
      perPage?: number;
      transactionId: Types.UUID | string;
    }

    export interface SendMessageParams {
      transactionId: Types.UUID | string;
      content: string;
    }

    export interface SendMessageQueryParams extends MessageAttributes {
      expand?: boolean;
    }

    export class messages {
      query(
        params: QueryMessageParams
      ): Promise<CollectionResourceDoc<Message>>;
      send(
        params: SendMessageParams,
        queryParams?: SendMessageQueryParams
      ): Promise<SingleResourceDoc<Message>>;
    }
  }
}

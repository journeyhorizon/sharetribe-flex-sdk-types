declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {

    interface ResourceAttributesMap {
      message: MessageAttributes;
    }

    interface RelationshipsObjectMap {
      message: MessageRelationships;
    }

    interface MessageAttributes {
      content: string;
      createdAt: Date;
    }
    type MessageRelationships = {
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

    export interface NormalizedMessage
      extends NormalizedResourceObject<
        "message",
        MessageAttributes,
        MessageRelationships
      > {}
    export interface Message
      extends DenormalizedResourceObject<NormalizedMessage> {}

    interface MessageBaseParams {
      include?: Array<"sender" | "sender.profileImage" | "transaction">;
      "fields.image"?: Array<`variants.${ImageVariants}`>;
      "fields.user"?: string[];
      "fields.transaction"?: string[];
      [key: `imageVariant.${string}`]: string;
    }

    interface QueryMessageParams extends MessageBaseParams {
      page?: number;
      perPage?: number;
      transactionId: ID;
    }

    interface SendMessageParams {
      transactionId: ID;
      content: string;
    }

    interface SendMessageQueryParams extends MessageBaseParams {
      expand?: boolean;
    }

    export class messages {
      query(
        params: QueryMessageParams
      ): Promise<CollectionResourceDoc<NormalizedMessage>>;
      send(
        params: SendMessageParams,
        queryParams?: SendMessageQueryParams
      ): Promise<SingleResourceDoc<NormalizedMessage>>;
    }
  }
}

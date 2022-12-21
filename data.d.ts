declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface Meta {
      page: number;
      perPage: number;
      totalPages?: number;
      totalItems: number;
    }

    export type Included = ResourceObject[];

    export type DocWithData<T> = {
      status: number;
      statusText: string;
      data: {
        data: T;
        included?: Included;
        meta?: T extends Array<any> ? Meta : undefined;
      };
    }

    export type SingleResourceDoc<T> = DocWithData<T>;

    export type CollectionResourceDoc<T> = DocWithData<Array<T>>;
  }
}

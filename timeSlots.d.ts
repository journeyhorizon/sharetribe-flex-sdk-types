declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    interface ResourceAttributesMap {
      timeSlot: TimeSlotAttributes;
    }
    interface TimeSlotAttributes {
      type: `time-slot/${"day" | "time"}`;
      seats: number;
      start: Date;
      end: Date;
    }

    export interface NormalizedTimeSlot
      extends NormalizedResourceObject<"timeSlot", TimeSlotAttributes, {}> {}

    export interface TimeSlot
      extends DenormalizedResourceObject<NormalizedTimeSlot> {}

    interface QueryTimeSlotParams {
      listingId: ID;
      start: Date;
      end: Date;
      page?: number;
      perPage?: number;
    }

    export class timeslots {
      query(
        params: QueryTimeSlotParams
      ): Promise<CollectionResourceDoc<NormalizedTimeSlot>>;
    }
  }
}

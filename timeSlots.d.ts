declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    export interface TimeSlotAttributes {
      type: `time-slot/${"day" | "time"}`;
      seats: number;
      start: Date | number;
      end: Date | number;
    }

    export interface TimeSlot
      extends ResourceObject<"timeSlot", TimeSlotAttributes, {}> {}

    export interface QueryTimeSlotParams {
      listingId: Types.UUID | string;
      start: Date | number;
      end: Date | number;
    }

    export class timeslots {
      query(
        params: QueryTimeSlotParams
      ): Promise<CollectionResourceDoc<TimeSlot>>;
    }
  }
}

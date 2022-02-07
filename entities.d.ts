import { LatLng, Money, UUID } from "./types";
type ExtendedData = Record<string, unknown>;
export type EntityType =
  | "user"
  | "listing"
  | "image"
  | "marketplace"
  | "stripeAccount"
  | "stripePaymentMethod"
  | "stripeCustomer"
  | "currentUser"
  | "stripeAccountLink"
  | "stripePerson"
  | "stripeSetupIntent"
  | "stock"
  | "ownListing"
  | "availabilityException"
  | "booking"
  | "stockReservation"
  | "review"
  | "message"
  | "transaction"
  | "processTransition"
  | "timeSlot"
  | "stockAdjustment"
  | unknown;
export interface IEntity<T extends string = string> {
  id: UUID;
  type: EntityType;
  attributes: Record<string, unknown>;
  relationships: {
    [key: string]: {
      data: { id: UUID; type: string } | Array<{ id: UUID; type: string }>;
    };
  };
}

/**
 * | Variant          | FitMode      | Width               | Height       |
 * | :--------------- | :----------  | :------------------ | :----------- |
 * | default          | scale        | 750px               | 750px        |
 * | landscape-crop   | crop         | 400px               | 267px        |
 * | landscape-crop2x | crop         | 800px               | 533px        |
 * | landscape-crop4x | crop         | 1600px              | 1066px       |
 * | landscape-crop6x | crop         | 2400px              | 1602px       |
 * | scaled-small     | scale        | 320px               | 320px        |
 * | scaled-medium    | scale        | 750px               | 750px        |
 * | scaled-large     | scale        | 1024px              | 1024px       |
 * | scaled-xlarge    | scale        | 2400px              | 2400px       |
 * | square-small     | crop         | 240px               | 240px        |
 * | square-small2x   | crop         | 480px               | 480px        |
 * | facebook         | crop         | 1200px              | 630px        |
 * | twitter          | crop         | 600px               | 314px        |
 */
type PredefinedImageVariants =
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

export type ImageVariants = `variants.${PredefinedImageVariants}`;
export interface IImage extends IEntity<"image"> {
  attributes: {
    variants:
      | Record<
          PredefinedImageVariants,
          {
            name: string;
            width: number;
            height: number;
            url: string;
          }
        >
      | Record<
          string,
          {
            name: string;
            width: number;
            height: number;
            url: string;
          }
        >;
  };
}

export interface IMarketplace extends IEntity<"marketplace"> {
  attributes: {
    name: string;
  };
}

export type UserRelationships = "marketplace" | "profileImage";
export interface IUser<
  TPublicData extends ExtendedData = {},
  TMetaData extends ExtendedData = {}
> extends IEntity<"user"> {
  attributes: {
    banned: boolean;
    deleted: boolean;
    createdAt: Date;
    profile: {
      displayName: string;
      abbreviatedName: string;
      bio: string | null;
      publicData: TPublicData;
      metadata: TMetaData;
    };
  };
  marketplace: IMarketplace;
  image: IImage | null;
}

export interface IStripeAccount extends IEntity<"stripeAccount"> {
  attributes: {
    stripeAccountId: string;
    stripeAccountData: Record<string, unknown> | null;
  };
}

export interface IStripePaymentMethod extends IEntity<"stripePaymentMethod"> {
  attributes: {
    type: "stripe-payment-method/card";
    stripePaymentMethodId: string;
    card: {
      brand: string;
      last4Digits: string;
      expirationYear: number;
      expirationMonth: number;
    };
  };
}

export interface IStripeCustomer extends IEntity<"stripeCustomer"> {
  attributes: {
    stripeCustomerId: string;
  };
  defaultPaymentMethod: IStripePaymentMethod | null;
}

export type CurrentUserRelationships =
  | "marketplace"
  | "profileImage"
  | "stripeAccount"
  | "stripeCustomer"
  | "stripeCustomer.defaultPaymentMethod";

export interface ICurrentUser<
  TPublicData extends ExtendedData = {},
  TProtectedData extends ExtendedData = {},
  TPrivateData extends ExtendedData = {},
  TMetaData extends ExtendedData = {}
> extends IEntity<"currentUser"> {
  attributes: {
    banned: boolean;
    deleted: boolean;
    createdAt: Date;
    email: string;
    emailVerified: boolean;
    pendingEmail: string | null;
    stripeConnected: boolean;
    identityProviders: Array<{
      idpId: string;
      userId: string;
    }>;
    profile: {
      firstName: string;
      lastName: string;
      displayName: string;
      abbreviatedName: string;
      bio: string | null;
      publicData: TPublicData;
      protectedData: TProtectedData;
      privateData: TPrivateData;
      metadata: TMetaData;
    };
  };
  profileImage: IImage | null;
  marketplace: IMarketplace;
  stripeAccount: IStripeAccount | null;
  stripeCustomer: IStripeCustomer | null;
}

export interface IStripeAccountLink extends IEntity<"stripeAccountLink"> {
  attributes: {
    url: string;
    expiresAt: Date;
  };
}

export interface IStripePerson extends IEntity<"stripePerson"> {
  attributes: {
    stripePersonId: string;
  };
}

export interface IStripeSetupIntent extends IEntity<"stripeSetupIntent"> {
  attributes: {
    stripeSetupIntentId: string;
    clientSecret: string;
  };
}

export interface IStock extends IEntity<"stock"> {
  attributes: {
    quantity: number;
  };
}

export type ListingRelationships =
  | "marketplace"
  | "author"
  | "author.profileImage"
  | "images"
  | "currentStock";

export interface IListing<
  TPublicData extends ExtendedData = {},
  TMetaData extends ExtendedData = {}
> extends IEntity<"listing"> {
  attributes: {
    title: string;
    description: string | null;
    geolocation: LatLng | null;
    createdAt: Date;
    price: Money | null;
    availabilityPlan:
      | null
      | {
          type: "availability-plan/day";
        }
      | {
          type: "availability-plan/time";
          timezone: string;
        };
    publicData: TPublicData;
    metadata: TMetaData;
    deleted: boolean;
    state: "published" | "closed";
  };
  marketplace: IMarketplace;
  author: IUser;
  images: IImage[] | null;
  currentStock: IStock | null;
}

export type OwnListingRelationships =
  | "marketplace"
  | "author"
  | "author.profileImage"
  | "images"
  | "currentStock";

export interface IOwnListing<
  TPublicData extends ExtendedData = {},
  TPrivateData extends ExtendedData = {},
  TMetaData extends ExtendedData = {}
> extends IEntity<"ownListing"> {
  attributes: {
    title: string;
    description: string | null;
    geolocation: LatLng | null;
    createdAt: Date;
    price: Money | null;
    state: "draft" | "pendingApproval" | "published" | "closed";
    availabilityPlan:
      | null
      | {
          type: "availability-plan/day";
          entries: Array<{
            dayOfWeek: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
            seats: number;
          }>;
        }
      | {
          type: "availability-plan/time";
          timezone: string;
          entries: Array<{
            seats: number;
            startTime: string;
            endTime: string;
          }>;
        };
    publicData: TPublicData;
    privateData: TPrivateData;
    metadata: TMetaData;
    currentStock: IStock | null;
    images: IImage[] | null;
    author: ICurrentUser;
    marketplace: IMarketplace;
  };
}

export type AvailabilityExceptionRelationships = "ownListing";

export interface IAvailabilityException
  extends IEntity<"availabilityException"> {
  attributes: {
    seats: number;
    start: Date;
    end: Date;
  };
  ownListing: IOwnListing;
}

export type BookingRelationships =
  | "transaction"
  | "transaction.customer"
  | "transaction.customer.profileImage";
export interface IBooking extends IEntity<"booking"> {
  attributes: {
    seats: number;
    start: Date;
    end: Date;
    displayStart: Date;
    displayEnd: Date;
    state: "pending" | "proposed" | "accepted" | "declined" | "cancelled";
  };
  transaction: ITransaction;
}

export interface IStockReservation extends IEntity<"stockReservation"> {
  attributes: {
    quantity: number;
    state: "pending" | "proposed" | "accepted" | "declined" | "cancelled";
  };
}

export type ReviewRelationships =
  | "author"
  | "author.profileImage"
  | "listing"
  | "subject"
  | "subject.profileImage";
export interface IReview extends IEntity<"review"> {
  attributes: {
    type: "ofCustomer" | "ofProvider";
    state: "pending" | "public";
    rating: 1 | 2 | 3 | 4 | 5;
    content: string;
    createdAt: Date;
    deleted: boolean;
  };
  author: IUser;
  listing: IListing;
  subject: IUser;
}

export type MessageRelationships =
  | "sender"
  | "sender.profileImage"
  | "transaction";
export interface IMessage extends IEntity<"message"> {
  attributes: {
    content: string;
    createdAt: Date;
  };
  sender: IUser;
  transaction: ITransaction;
}

export type TransactionRelationships =
  | "marketplace"
  | "listing"
  | "listing.images"
  | "listing.currentStock"
  | "provider"
  | "provider.profileImage"
  | "customer"
  | "customer.providerImage"
  | "booking"
  | "stockReservation"
  | "reviews"
  | "reviews.author"
  | "reviews.author.profileImage"
  | "reviews.subject"
  | "reviews.subject.profileImage"
  | "messages"
  | "messages.sender"
  | "messages.sender.profileImage";

export interface ITransaction<
  TProtectedData extends ExtendedData = {},
  TMetaData extends ExtendedData = {}
> extends IEntity<"transaction"> {
  attributes: {
    createdAt: Date;
    processName: string;
    processVersion: number;
    lastTransition: `transition/${string}`;
    lastTransitionedAt: Date;
    lineItems: Array<{
      code: `line-item/${string}`;
      unitPrice: Money;
      quantity?: number;
      units?: number;
      seats?: number;
      percentage?: number;
      lineTotal: Money;
      reversal: boolean;
      includedFor: Array<"customer" | "provider">;
    }>;
    payinTotal: Money;
    payoutTotal: Money;
    protectedData: TProtectedData;
    metadata: TMetaData;
    transitions: Array<{
      transition: string;
      createdAt: Date;
      by: "customer" | "provider" | "operator" | "system";
    }>;
    marketplace: IMarketplace;
    listing: IListing;
    provider: IUser;
    customer: IUser;
    booking: IBooking;
    stockReservation: IStockReservation;
    reviews: IReview[];
    messages: IMessage[];
  };
}

export interface IProcessTransition extends IEntity<"processTransition"> {
  attributes: {
    name: string;
    author: "customer" | "provider" | "operator" | "system";
    actions: string[];
    params: {
      req: Record<string, unknown> | null;
      opt: Record<string, unknown> | null;
    };
  };
}

export interface ITimeSlot extends IEntity<"timeSlot"> {
  attributes: {
    type: `time-slot/${"date" | "time"}`;
    seats: number;
    start: Date;
    end: Date;
  };
}

export type StockAdjustmentRelationships =
  | "ownListing"
  | "ownListing.currentStock"
  | "stockReservation"
  | "stockReservation.transaction"
  | "stockReservation.transaction.customer"
  | "stockReservation.transaction.customer.profileImage";
export interface IStockAdjustment extends IEntity<"stockAdjustment"> {
  attributes: {
    at: Date;
    quantity: number;
  };
}

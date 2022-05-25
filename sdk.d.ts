import {
  AvailabilityExceptionRelationships,
  BookingRelationships,
  CurrentUserRelationships,
  IAvailabilityException,
  IBooking,
  ICurrentUser,
  IEntity,
  IImage,
  IListing,
  ImageVariants,
  IMessage,
  IOwnListing,
  IProcessTransition,
  IReview,
  IStock,
  IStockAdjustment,
  IStockReservation,
  IStripeAccount,
  IStripeAccountLink,
  IStripeCustomer,
  IStripePerson,
  IStripeSetupIntent,
  ITimeSlot,
  ITransaction,
  IUser,
  ListingRelationships,
  MessageRelationships,
  OwnListingRelationships,
  ReviewRelationships,
  StockAdjustmentRelationships,
  TransactionRelationships,
  UserRelationships,
} from "./entities";
import { LatLng, LatLngBounds, Money, UUID } from "./types";

type SdkResponse<T extends IEntity | IEntity[] = IEntity> = {
  status: number;
  statusText: string;
  data: {
    data: T;
    included?: Array<IEntity>;
    meta: T extends IEntity[]
      ? {
          page: number;
          perPage?: number;
          totalItems: number;
          totalPages: number;
        }
      : undefined;
  };
};

type CurrentUserQueryParams = {
  expand?: boolean;
  include?: Array<CurrentUserRelationships>;
  "fields.image"?: Array<ImageVariants>;
};

export type Sdk = {
  authInfo: () => Promise<{
    grantType: "refresh_token";
    isAnonymous: boolean;
    scopes: string[];
  }>;
  login: (params: { username: string; password: string }) => Promise<{
    access_token: string;
    scope: "user";
    token_type: "bearer";
    expires_in: number;
    refresh_token: string;
  }>;
  logout: () => Promise<void>;
  users: {
    show: (params: {
      id: UUID;
      include?: Array<UserRelationships>;
      "fields.image"?: Array<ImageVariants>;
      "fields.user"?: Array<keyof IUser["attributes"]>;
    }) => Promise<SdkResponse<IUser>>;
  };
  currentUser: {
    show: (
      params?: Omit<CurrentUserQueryParams, "expand">
    ) => Promise<SdkResponse<ICurrentUser>>;
    create: (
      params: {
        email: string;
        firstName: string;
        lastName: string;
        displayName?: string;
        password: string;
        bio?: string;
        publicData?: Record<string, unknown>;
        protectedData?: Record<string, unknown>;
        privateData?: Record<string, unknown>;
      },
      queryParams?: {
        expand: boolean;
        include?: Array<CurrentUserRelationships>;
        "fields.image"?: Array<ImageVariants>;
        "fields.user"?: Array<keyof ICurrentUser["attributes"]>;
      }
    ) => Promise<SdkResponse<ICurrentUser>>;
    createWithIdp: (
      params: {
        idpId: string;
        idpClientId: string;
        idpToken: string;
        email?: string;
        firstName?: string;
        lastName?: string;
        displayName?: string;
        bio?: string;
        publicData?: Record<string, unknown>;
        protectedData?: Record<string, unknown>;
        privateData?: Record<string, unknown>;
      },
      queryParams?: CurrentUserQueryParams
    ) => Promise<SdkResponse<ICurrentUser>>;
    updateProfile: (
      params: Partial<{
        firstName: string;
        lastName: string;
        displayName: string;
        bio: string;
        publicData: Record<string, unknown>;
        protectedData: Record<string, unknown>;
        privateData: Record<string, unknown>;
        profileImageId: UUID;
      }>,
      queryParams?: CurrentUserQueryParams
    ) => Promise<SdkResponse<ICurrentUser>>;
    changePassword: (
      params: {
        currentPassword: string;
        newPassword: string;
      },
      queryParams?: CurrentUserQueryParams
    ) => Promise<SdkResponse<ICurrentUser>>;
    changeEmail: (
      params: {
        currentPassword: string;
        email: string;
      },
      queryParams?: CurrentUserQueryParams
    ) => Promise<SdkResponse<ICurrentUser>>;
    verifyEmail: (
      params: {
        verificationToken: string;
      },
      queryParams?: CurrentUserQueryParams
    ) => Promise<SdkResponse<ICurrentUser>>;
    sendVerificationEmail: () => Promise<void>;
  };
  passwordReset: {
    request: (params: { email: string }) => Promise<void>;
    reset: (params: {
      email: string;
      passwordResetToken: string;
      newPassword: string;
    }) => Promise<void>;
  };
  stripeAccount: {
    fetch: () => Promise<SdkResponse<IStripeAccount>>;
    create: (
      params: {
        country: string;
        accountToken?: string;
        bankAccountToken?: string;
        businessProfileMCC?: string;
        businessProfileURL?: string;
        businessProfileProductDescription?: string;
        requestedCapabilities?: Array<
          "card_payments" | "transfers" | "legacy_payments"
        >;
      },
      queryParams?: {
        expand: boolean;
      }
    ) => Promise<SdkResponse<IStripeAccount>>;
    update: (
      params: Partial<{
        accountToken?: string;
        bankAccountToken?: string;
        businessProfileMCC?: string;
        businessProfileURL?: string;
        businessProfileProductDescription?: string;
        requestedCapabilities?: Array<
          "card_payments" | "transfers" | "legacy_payments"
        >;
      }>,
      queryParams?: {
        expand: boolean;
      }
    ) => Promise<SdkResponse<IStripeAccount>>;
  };
  stripeAccountLinks: {
    create: (
      params: {
        failureURL: string;
        successURL: string;
        type: "custom_account_verification" | "custom_account_update";
        collect: "currently_due" | "eventually_due";
      },
      queryParams?: {
        expand: boolean;
      }
    ) => Promise<SdkResponse<IStripeAccountLink>>;
  };
  stripePersons: {
    create: (
      params: {
        personToken: string;
      },
      queryParams?: {
        expand: boolean;
      }
    ) => Promise<SdkResponse<IStripePerson>>;
  };
  stripeSetupIntents: {
    create: (
      params: {},
      queryParams?: {
        expand: boolean;
      }
    ) => Promise<SdkResponse<IStripeSetupIntent>>;
  };
  stripeCustomer: {
    create: (
      params: {
        stripePaymentMethodId: string;
      },
      queryParams?: {
        expand: true;
        include?: ["defaultPaymentMethod"];
      }
    ) => Promise<SdkResponse<IStripeCustomer>>;
    addPaymentMethod: (
      params: {
        stripePaymentMethodId: string;
      },
      queryParams?: {
        expand: true;
        include?: ["defaultPaymentMethod"];
      }
    ) => Promise<SdkResponse<IStripeCustomer>>;
    deletePaymentMethod: (
      params: {},
      queryParams?: {
        expand: true;
        include?: ["defaultPaymentMethod"];
      }
    ) => Promise<SdkResponse<IStripeCustomer>>;
  };
  listings: {
    show: (params: {
      id: UUID;
      include?: Array<ListingRelationships>;
      "fields.image"?: Array<ImageVariants>;
      "fields.listing"?: Array<keyof IListing["attributes"]>;
      "fields.user"?: Array<keyof IUser["attributes"]>;
    }) => Promise<SdkResponse<IListing>>;
    query: (
      params?: Partial<{
        authorId: UUID;
        ids: UUID[] | string[];
        keywords: string;
        origin: LatLng;
        bounds: LatLngBounds;
        price: string;
        start: Date;
        end: Date;
        seats: number;
        availability: `${"day" | "time"}-${"full" | "partial"}`;
        minDuration: number;
        minStock: number;
        sort: string;
        [key: `${"pub_" | "meta_"}${string}`]: string | number | string[];
        include?: Array<ListingRelationships>;
        "fields.image"?: Array<ImageVariants>;
        "fields.listing"?: Array<keyof IListing["attributes"]>;
        "fields.user"?: Array<keyof IUser["attributes"]>;
        [key: `limit.${string}`]: number;
        page?: number;
        perPage?: number;
      }>
    ) => Promise<SdkResponse<IListing[]>>;
  };
  ownListings: {
    show: (params: {
      id: UUID;
      include?: Array<OwnListingRelationships>;
      "fields.image"?: Array<ImageVariants>;
      "fields.listing"?: Array<keyof IListing["attributes"]>;
      "fields.user"?: Array<keyof ICurrentUser["attributes"]>;
    }) => Promise<SdkResponse<IOwnListing>>;
    query: (params?: {
      include?: Array<OwnListingRelationships>;
      "fields.image"?: Array<ImageVariants>;
      "fields.listing"?: Array<keyof IListing["attributes"]>;
      "fields.user"?: Array<keyof ICurrentUser["attributes"]>;
      page?: number;
      perPage?: number;
    }) => Promise<SdkResponse<IOwnListing[]>>;
    create: (
      params: {
        title: string;
        description?: string;
        geolocation?: LatLng;
        price?: Money;
        availabilityPlan?:
          | {
              type: "availability-plan/day";
              entries: Array<{
                dayOfWeek:
                  | "mon"
                  | "tue"
                  | "wed"
                  | "thu"
                  | "fri"
                  | "sat"
                  | "sun";
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
        privateData?: Record<string, unknown>;
        publicData?: Record<string, unknown>;
        images?: Array<UUID>;
      },
      queryParams?: {
        expand: boolean;
        "fields.image"?: Array<ImageVariants>;
        "fields.listing"?: Array<keyof IListing["attributes"]>;
        "fields.user"?: Array<keyof ICurrentUser["attributes"]>;
      }
    ) => Promise<SdkResponse<IOwnListing>>;
    createDraft: (
      params: {
        title: string;
        description?: string;
        geolocation?: LatLng;
        price?: Money;
        availabilityPlan?:
          | {
              type: "availability-plan/day";
              entries: Array<{
                dayOfWeek:
                  | "mon"
                  | "tue"
                  | "wed"
                  | "thu"
                  | "fri"
                  | "sat"
                  | "sun";
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
        privateData?: Record<string, unknown>;
        publicData?: Record<string, unknown>;
        images?: Array<UUID>;
      },
      queryParams?: {
        expand: boolean;
        "fields.image"?: Array<ImageVariants>;
        "fields.listing"?: Array<keyof IListing["attributes"]>;
        "fields.user"?: Array<keyof ICurrentUser["attributes"]>;
      }
    ) => Promise<SdkResponse<IOwnListing>>;
    update: (
      params: {
        id: UUID;
      } & Partial<{
        title: string;
        description?: string;
        geolocation?: LatLng;
        price?: Money;
        availabilityPlan?:
          | {
              type: "availability-plan/day";
              entries: Array<{
                dayOfWeek:
                  | "mon"
                  | "tue"
                  | "wed"
                  | "thu"
                  | "fri"
                  | "sat"
                  | "sun";
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
        privateData?: Record<string, unknown>;
        publicData?: Record<string, unknown>;
        images?: Array<UUID>;
      }>,
      queryParams?: {
        expand: boolean;
        "fields.image"?: Array<ImageVariants>;
        "fields.listing"?: Array<keyof IListing["attributes"]>;
        "fields.user"?: Array<keyof ICurrentUser["attributes"]>;
      }
    ) => Promise<SdkResponse<IOwnListing>>;
    publishDraft: (
      params: {
        id: UUID;
      },
      queryParams?: {
        expand: boolean;
        "fields.image"?: Array<ImageVariants>;
        "fields.listing"?: Array<keyof IListing["attributes"]>;
        "fields.user"?: Array<keyof ICurrentUser["attributes"]>;
      }
    ) => Promise<SdkResponse<IOwnListing>>;
    discardDraft: (
      params: {
        id: UUID;
      },
      queryParams?: {
        expand: boolean;
        "fields.image"?: Array<ImageVariants>;
        "fields.listing"?: Array<keyof IListing["attributes"]>;
        "fields.user"?: Array<keyof ICurrentUser["attributes"]>;
      }
    ) => Promise<SdkResponse<IOwnListing>>;
    close: (
      params: {
        id: UUID;
      },
      queryParams?: {
        expand: boolean;
        "fields.image"?: Array<ImageVariants>;
        "fields.listing"?: Array<keyof IListing["attributes"]>;
        "fields.user"?: Array<keyof ICurrentUser["attributes"]>;
      }
    ) => Promise<SdkResponse<IOwnListing>>;
    open: (
      params: {
        id: UUID;
      },
      queryParams?: {
        expand: boolean;
        "fields.image"?: Array<ImageVariants>;
        "fields.listing"?: Array<keyof IListing["attributes"]>;
        "fields.user"?: Array<keyof ICurrentUser["attributes"]>;
      }
    ) => Promise<SdkResponse<IOwnListing>>;
    addImage: (
      params: {
        id: UUID;
        listingId: UUID;
      },
      queryParams?: {
        expand: boolean;
        "fields.image"?: Array<ImageVariants>;
        "fields.listing"?: Array<keyof IListing["attributes"]>;
        "fields.user"?: Array<keyof ICurrentUser["attributes"]>;
      }
    ) => Promise<SdkResponse<IOwnListing>>;
  };
  availabilityExceptions: {
    query: (params: {
      listingId: UUID;
      start: Date;
      end: Date;
      page?: number;
      perPage?: number;
      include?: Array<AvailabilityExceptionRelationships>;
      "fields.ownListing"?: Array<keyof IOwnListing["attributes"]>;
    }) => Promise<SdkResponse<IAvailabilityException[]>>;
    create: (
      params: {
        listingId: UUID;
        start: Date;
        end: Date;
        seats: number;
      },
      queryParams?: {
        expand: boolean;
        include?: Array<AvailabilityExceptionRelationships>;
        "fields.ownListing"?: Array<keyof IOwnListing["attributes"]>;
      }
    ) => Promise<SdkResponse<IAvailabilityException>>;
    delete: (
      params: {
        id: UUID;
      },
      queryParams?: {
        expand: boolean;
        include?: Array<AvailabilityExceptionRelationships>;
        "fields.ownListing"?: Array<keyof IOwnListing["attributes"]>;
      }
    ) => Promise<SdkResponse<IAvailabilityException>>;
  };
  images: {
    upload: (
      params: { image: any },
      queryParams?: {
        expand: boolean;
        "fields.image"?: Array<ImageVariants>;
      }
    ) => Promise<SdkResponse<IImage>>;
  };
  bookings: {
    query: (params: {
      listingId: UUID;
      start: Date;
      end: Date;
      page?: number;
      perPage?: number;
      include?: Array<BookingRelationships>;
      "fields.image"?: Array<ImageVariants>;
    }) => Promise<SdkResponse<IBooking[]>>;
  };
  transactions: {
    show: (params: {
      id: UUID;
      include?: Array<TransactionRelationships>;
      "fields.user"?: Array<keyof IUser["attributes"]>;
      "fields.listing"?: Array<keyof IListing["attributes"]>;
      "fields.booking"?: Array<keyof IBooking["attributes"]>;
      "fields.review"?: Array<keyof IReview["attributes"]>;
      "fields.message"?: Array<keyof IMessage["attributes"]>;
    }) => Promise<SdkResponse<ITransaction>>;
    query: (params?: {
      only?: "sale" | "order";
      lastTransitions: string[];
      page?: number;
      perPage?: number;
      include?: Array<TransactionRelationships>;
      "fields.user"?: Array<keyof IUser["attributes"]>;
      "fields.listing"?: Array<keyof IListing["attributes"]>;
      "fields.booking"?: Array<keyof IBooking["attributes"]>;
      "fields.review"?: Array<keyof IReview["attributes"]>;
      "fields.message"?: Array<keyof IMessage["attributes"]>;
    }) => Promise<SdkResponse<ITransaction[]>>;
    initiate: (
      params: {
        processAlias: string;
        transition: string;
        params: Record<string, unknown>;
      },
      queryParams?: {
        expand: boolean;
        include?: Array<TransactionRelationships>;
        "fields.user"?: Array<keyof IUser["attributes"]>;
        "fields.listing"?: Array<keyof IListing["attributes"]>;
        "fields.booking"?: Array<keyof IBooking["attributes"]>;
        "fields.review"?: Array<keyof IReview["attributes"]>;
        "fields.message"?: Array<keyof IMessage["attributes"]>;
      }
    ) => Promise<SdkResponse<ITransaction>>;
    initiateSpeculative: (
      params: {
        processAlias: string;
        transition: string;
        params: Record<string, unknown>;
      },
      queryParams?: {
        expand: boolean;
        include?: Array<TransactionRelationships>;
        "fields.user"?: Array<keyof IUser["attributes"]>;
        "fields.listing"?: Array<keyof IListing["attributes"]>;
        "fields.booking"?: Array<keyof IBooking["attributes"]>;
        "fields.review"?: Array<keyof IReview["attributes"]>;
        "fields.message"?: Array<keyof IMessage["attributes"]>;
      }
    ) => Promise<SdkResponse<ITransaction>>;
    transition: (
      params: {
        id: UUID;
        transition: string;
        params: Record<string, unknown>;
      },
      queryParams?: {
        expand: boolean;
        include?: Array<TransactionRelationships>;
        "fields.user"?: Array<keyof IUser["attributes"]>;
        "fields.listing"?: Array<keyof IListing["attributes"]>;
        "fields.booking"?: Array<keyof IBooking["attributes"]>;
        "fields.review"?: Array<keyof IReview["attributes"]>;
        "fields.message"?: Array<keyof IMessage["attributes"]>;
      }
    ) => Promise<SdkResponse<ITransaction>>;
    transitionSpeculative: (
      params: {
        id: UUID;
        transition: string;
        params: Record<string, unknown>;
      },
      queryParams?: {
        expand: boolean;
        include?: Array<TransactionRelationships>;
        "fields.user"?: Array<keyof IUser["attributes"]>;
        "fields.listing"?: Array<keyof IListing["attributes"]>;
        "fields.booking"?: Array<keyof IBooking["attributes"]>;
        "fields.review"?: Array<keyof IReview["attributes"]>;
        "fields.message"?: Array<keyof IMessage["attributes"]>;
      }
    ) => Promise<SdkResponse<ITransaction>>;
  };
  processTransitions: {
    query: (params: {
      transactionId: UUID;
    }) => Promise<SdkResponse<IProcessTransition>>;
  };
  timeslots: {
    query: (params: {
      listingId: UUID;
      start: Date;
      end: Date;
      page?: number;
      perPage?: number;
    }) => Promise<SdkResponse<ITimeSlot>>;
  };
  stock: {
    compareAndSet: (
      params: {
        listingId: UUID;
        oldTotal: number;
        newTotal: number;
      },
      queryParams?: {
        expand: boolean;
      }
    ) => Promise<SdkResponse<IStock>>;
  };
  stockAdjustments: {
    query: (params: {
      listingId: UUID;
      start: Date;
      end: Date;
      page?: number;
      perPage?: number;
    }) => Promise<SdkResponse<IStockAdjustment[]>>;
    create: (
      params: {
        listingId: UUID;
        quantity: number;
      },
      queryParams?: {
        expand: boolean;
        include?: Array<StockAdjustmentRelationships>;
        "fields.ownListing"?: Array<keyof IOwnListing["attributes"]>;
        "fields.stockReservation"?: Array<
          keyof IStockReservation["attributes"]
        >;
      }
    ) => Promise<SdkResponse<IStockAdjustment>>;
  };
  reviews: {
    show: (params: {
      id: UUID;
      include?: Array<ReviewRelationships>;
      "fields.user"?: Array<keyof IUser["attributes"]>;
      "fields.listing"?: Array<keyof Partial<IListing["attributes"]>>;
    }) => Promise<SdkResponse<IReview>>;
    query: (
      params: Partial<{
        transactionId: UUID;
        listingId: UUID;
        subjectId: UUID;
        type: "ofCustomer" | "ofProvider";
        state: string;
        include?: Array<ReviewRelationships>;
        "fields.image"?: Array<ImageVariants>;
        "fields.user"?: Array<keyof Partial<IUser["attributes"]>>;
        "fields.listing"?: Array<keyof Partial<IListing["attributes"]>>;
        page?: number;
        perPage?: number;
      }>
    ) => Promise<SdkResponse<IReview[]>>;
  };
  messages: {
    query: (params: {
      transactionId: UUID;
      page?: number;
      perPage?: number;
      include?: Array<MessageRelationships>;
      "fields.user": Array<keyof IUser["attributes"]>;
      "fields.image": Array<ImageVariants>;
    }) => Promise<SdkResponse<IMessage[]>>;
    send: (
      params: {
        transactionId: UUID;
        content: string;
      },
      queryParams?: {
        expand: boolean;
        include?: Array<MessageRelationships>;
        "fields.user": Array<keyof IUser["attributes"]>;
        "fields.image": Array<ImageVariants>;
      }
    ) => Promise<SdkResponse<IMessage>>;
  };
};

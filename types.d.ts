declare module "sharetribe-flex-sdk" {
  namespace SharetribeFlexSdk {
    namespace Types {
      class UUID {
        _sdkType: "UUID";
        uuid: string;
        /**
         *  Creates an instance of UUID.
         * @param {string} uuid - UUID represented as string
         * @memberof UUID
         */
        constructor(uuid: string);
      }
      /**
         Money type to represent money

        - `amount`: The money amount in `minor` unit. In most cases, the minor unit means cents.
                    However, in currencies without cents, e.g. Japanese Yen, the `amount` value
                    is the number of Yens.
        - `currency`: ISO 4217 currency code

        Examples:

        ```
        new Money(5000, "USD") // $50
        new Money(150, "EUR")  // 1.5€
        new Money(2500, "JPY") // ¥2500
        ```
      */
      class Money {
        _sdkType: "Money";
        amount: number;
        currency: string;
        /**
         *  Creates an instance of Money.
         * @param {number} amount
         * @param {string} currency
         * @memberof Money
         */
        constructor(amount: number, currency: string);
      }
      class LatLng {
        _sdkType: "LatLng";
        lat: number;
        lng: number;
        /**
         *  Creates an instance of LatLng.
         * @param {number} lat
         * @param {number} lng
         * @memberof LatLng
         */
        constructor(lat: number, lng: number);
      }
      class LatLngBounds {
        _sdkType: "LatLngBounds";
        ne: LatLng;
        sw: LatLng;
        /**
         *  Creates an instance of LatLngBounds.
         * @param {LatLng} ne
         * @param {LatLng} sw
         * @memberof LatLngBounds
         */
        constructor(ne: LatLng, sw: LatLng);
      }
      /**
        Type to represent arbitrary precision decimal value.

        It's recommended to use a library such as decimal.js to make decimal
        calculations.
      */
      class BigDecimal {
        _sdkType: "BigDecimal";
        value: number;
        /**
         *  Creates an instance of BigDecimal.
         * @param {number} value
         * @memberof BigDecimal
         */
        constructor(value: number);
      }

      function toType(
        value: unknown
      ): UUID | LatLng | LatLngBounds | Money | BigDecimal | unknown;

      function reviver(key: string, value: unknown): ReturnType<typeof toType>;
      function replacer(key: string, value: unknown): unknown;
    }
  }
}

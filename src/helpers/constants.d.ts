/**
 * @description The base url for the CoinGecko API
 * @kind constant
 */
export const BASE: "https://api.coingecko.com/api/";
/**
 * @description The host of the CoinGecko API
 * @kind constant
 */
export const HOST: "api.coingecko.com";
/**
 * @description The current version for the CoinGecko API
 * @kind constant
 */
export const API_VERSION: "3";
/**
 * @description The CoinGecko URI according to base and current version
 * @kind constant
 */
export const URI: string;
/**
 * @description The maximum number of requests per second for the CoinGecko API
 * @kind constant
 */
export const REQUESTS_PER_SECOND: 10;
export namespace ORDER {
    const GECKO_ASC: string;
    const GECKO_DESC: string;
    const MARKET_CAP_ASC: string;
    const MARKET_CAP_DESC: string;
    const VOLUME_ASC: string;
    const VOLUME_DESC: string;
    const COIN_NAME_ASC: string;
    const COIN_NAME_DESC: string;
    const PRICE_ASC: string;
    const PRICE_DESC: string;
    const HOUR_24_ASC: string;
    const HOUR_24_DESC: string;
    const TRUST_SCORE_DESC: string;
    const NAME_ASC: string;
    const NAME_DESC: string;
    const OPEN_INTEREST_BTC_ASC: string;
    const OPEN_INTEREST_BTC_DESC: string;
    const TRADE_VOLUME_24H_BTC_ASC: string;
    const TRADE_VOLUME_24H_BTC_DESC: string;
}
export namespace STATUS_UPDATE_CATEGORY {
    const GENERAL: string;
    const MILESTONE: string;
    const PARTNERSHIP: string;
    const EXCHANGE_LISTING: string;
    const SOFTWARE_RELEASE: string;
    const FUND_MOVEMENT: string;
    const NEW_LISTINGS: string;
    const EVENT: string;
}
export namespace STATUS_UPDATE_PROJECT_TYPE {
    const COIN: string;
    const MARKET: string;
}
export namespace EVENT_TYPE {
    const EVENT_1: string;
    export { EVENT_1 as EVENT };
    export const CONFERENCE: string;
    export const MEETUP: string;
}
/**
 * @description Timeout for connecton to CoinGecko API in milliseconds (default: 30 seconds)
 * @kind constant
 */
export const TIMEOUT: 30000;

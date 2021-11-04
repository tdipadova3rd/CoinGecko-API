declare const _exports: typeof CoinGecko;
export = _exports;
/**
 * @class CoinGecko
 * @author Mark Miscavage <markmiscavage@protonmail.com>
 * @description A Node.js wrapper for the CoinGecko API with no dependencies. For more information, visit: https://www.coingecko.com/api/docs/v3
 * @example
 *     const CoinGecko = require('coingecko-api');
 *     const CoinGeckoClient = new CoinGecko();
 * @public
 * @version 1.0.10
 * @license MIT
 * @kind class
 */
declare class CoinGecko {
    /**
     * @description Check API server status
     * @function ping
     * @returns {ReturnObject}
     */
    ping(): (success: boolean, message: string, code: number, data: any) => {
        success: boolean;
        message: string;
        code: number;
        data: any;
    };
    /**
     * @description Get cryptocurrency global data
     * @function global
     * @returns {ReturnObject}
     */
    global(): (success: boolean, message: string, code: number, data: any) => {
        success: boolean;
        message: string;
        code: number;
        data: any;
    };
    /**
     * @description Calls related to coins
     */
    get coins(): {
        /**
         * @description List all coins with data (name, price, market, developer, community, etc) - paginated by 50
         * @function coins.all()
         * @param {object} params - Parameters to pass through to the request
         * @param {string} params.order - Order results by CoinGecko.ORDER[*]
         * @param {number} params.per_page - Total results per page
         * @param {number} params.page - Page through results
         * @param {boolean} params.localization [default: true] - Set to false to exclude localized languages in response
         * @param {boolean} params.sparkline [default: false] - Include sparkline 7 days data
         * @returns {ReturnObject}
         */
        all: (params?: {
            order: string;
            per_page: number;
            page: number;
            localization: boolean;
            sparkline: boolean;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Use this to obtain all the coins’ id in order to make API calls
         * @function coins.list()
         * @returns {ReturnObject}
         */
        list: () => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Use this to obtain all the coins market data (price, market cap, volume)
         * @function coins.markets()
         * @param {object} params - Parameters to pass through to the request
         * @param {string} params.vs_currency [default: usd] - The target currency of market data (usd, eur, jpy, etc.)
         * @param {array|string} params.ids - List of coin id to filter if you want specific results
         * @param {string} params.order - Order results by CoinGecko.ORDER[*]
         * @param {number} params.per_page - Total results per page
         * @param {number} params.page - Page through results
         * @param {boolean} params.sparkline [default: false] - Include sparkline 7 days data (true/false)
         * @returns {ReturnObject}
         */
        markets: (params?: {
            vs_currency: string;
            ids: any[] | string;
            order: string;
            per_page: number;
            page: number;
            sparkline: boolean;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get current data (name, price, market, … including exchange tickers) for a coin.
         * @function coins.fetch()
         * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
         * @param {object} params - Parameters to pass through to the request
         * @param {boolean} params.tickers [default: true] - Include ticker data
         * @param {boolean} params.market_data [default: true] - Include market data
         * @param {boolean} params.community_data [default: true] - Include community data
         * @param {boolean} params.developer_data [default: true] - Include developer data
         * @param {boolean} params.localization [default: true] - Set to false to exclude localized languages in response
         * @param {boolean} params.sparkline [default: false] - Include sparkline 7 days data (true/false)
         * @returns {ReturnObject}
         */
        fetch: (coinId: string, params?: {
            tickers: boolean;
            market_data: boolean;
            community_data: boolean;
            developer_data: boolean;
            localization: boolean;
            sparkline: boolean;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get coin tickers (paginated to 100 items).
         * @function coins.fetchTickers()
         * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
         * @param {object} params - Parameters to pass through to the request
         * @param {string} params.page - Page through results
         * @param {number} params.exchange_ids - Filter tickers by exchange_ids
         * @param {string} params.order [default: trust_score_desc] - Order results by CoinGecko.ORDER.TRUST_SCORE_DESC or CoinGecko.ORDER.VOLUME_DESC
         * @returns {ReturnObject}
         */
        fetchTickers: (coinId: string, params?: {
            page: string;
            exchange_ids: number;
            order: string;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get historical data (name, price, market, stats) at a given date for a coin
         * @function coins.fetchHistory()
         * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
         * @param {object} params - Parameters to pass through to the request
         * @param {string} params.date - (Required) The date of data snapshot in dd-mm-yyyy eg. 30-12-2017
         * @param {boolean} params.localization [default: true] - Set to false to exclude localized languages in response
         * @returns {ReturnObject}
         */
        fetchHistory: (coinId: string, params?: {
            date: string;
            localization: boolean;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get historical market data include price, market cap, and 24h volume (granularity auto)
         * @function coins.fetchMarketChart()
         * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
         * @param {object} params - Parameters to pass through to the request
         * @param {string} params.vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
         * @param {string} params.days [default: 1] - (Required) Data up to number of days ago (eg. 1,14,30,max)
         * @returns {ReturnObject}
         */
        fetchMarketChart: (coinId: string, params?: {
            vs_currency: string;
            days: string;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto).
         *   Minutely data will be used for duration within 1 day.
         *   Hourly data will be used for duration between 1 day and 90 days.
         *   Daily data will be used for duration above 90 days.
         * @function coins.fetchMarketChartRange()
         * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
         * @param {object} params - Parameters to pass through to the request
         * @param {string} params.vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
         * @param {number} params.from - (Required) From date in UNIX Timestamp (eg. 1392577232)
         * @param {number} params.to - (Required) To date in UNIX Timestamp (eg. 1422577232)
         * @returns {ReturnObject}
         */
        fetchMarketChartRange: (coinId: string, params?: {
            vs_currency: string;
            from: number;
            to: number;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get status updates for a given coin
         * @function coins.fetchStatusUpdates()
         * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
         * @param {object} params - Parameters to pass through to the request
         * @param {number} params.per_page - Total results per page
         * @param {number} params.page - Page through results
         * @returns {ReturnObject}
         */
        fetchStatusUpdates: (coinId: string, params?: {
            per_page: number;
            page: number;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get coin info from contract address
         * @function coins.fetchCoinContractInfo()
         * @param {object} contractAddress - (Required) Token’s contract address
         * @param {string} assetPlatform [default: ethereum] - (Required) Asset platform (only ethereum is supported at this moment)
         * @returns {ReturnObject}
         */
        fetchCoinContractInfo: (contractAddress: object, assetPlatform?: string) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get historical market data include price, market cap, and 24h volume (granularity auto) from a contract address
         * @function coins.fetchCoinContractMarketChart()
         * @param {object} contractAddress - (Required) Token’s contract address
         * @param {string} assetPlatform [default: ethereum] - (Required) Asset platform (only ethereum is supported at this moment)
         * @param {object} params - Parameters to pass through to the request
         * @param {string} params.vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
         * @param {string} params.days [default: 1] - (Required) Data up to number of days ago (eg. 1,14,30,max)
         * @returns {ReturnObject}
         */
        fetchCoinContractMarketChart: (contractAddress: object, assetPlatform?: string, params?: {
            vs_currency: string;
            days: string;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto)
         * @function coins.fetchCoinContractMarketChartRange()
         * @param {object} contractAddress - (Required) Token’s contract address
         * @param {string} assetPlatform [default: ethereum] - (Required) Asset platform (only ethereum is supported at this moment)
         * @param {object} params - Parameters to pass through to the request
         * @param {string} params.vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
         * @param {number} params.from - (Required) From date in UNIX Timestamp (eg. 1392577232)
         * @param {number} params.to - (Required) To date in UNIX Timestamp (eg. 1422577232)
         * @returns {ReturnObject}
         */
        fetchCoinContractMarketChartRange: (contractAddress: object, assetPlatform?: string, params?: {
            vs_currency: string;
            from: number;
            to: number;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
    };
    /**
     * @description Calls related to exchanges
     */
    get exchanges(): {
        /**
         * @description List all exchanges
         * @function exchanges.all()
         * @returns {ReturnObject}
         */
        all: () => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description List all supported markets id and name
         * @function exchanges.list()
         * @returns {ReturnObject}
         */
        list: () => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get exchange volume in BTC and top 100 tickers only for a given exchange
         * @function exchanges.fetch()
         * @param {string} exchangeId - (Required) The exchange id (can be obtained from exchanges.all()) eg. binance
         * @returns {ReturnObject}
         */
        fetch: (exchangeId: string) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get tickers for a given exchange
         * @function exchanges.fetchTickers()
         * @param {string} exchangeId - (Required) The exchange id (can be obtained from exchanges.all()) eg. binance
         * @param {object} params - Parameters to pass through to the request
         * @param {number} params.page - Page through results
         * @param {number} params.coin_ids - Filter tickers by coin_ids
         * @param {string} params.order [default: trust_score_desc] - Order results by CoinGecko.ORDER.TRUST_SCORE_DESC or CoinGecko.ORDER.VOLUME_DESC
         * @returns {ReturnObject}
         */
        fetchTickers: (exchangeId: string, params?: {
            page: number;
            coin_ids: number;
            order: string;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get status updates for a given exchange
         * @function exchanges.fetchStatusUpdates()
         * @param {string} exchangeId - (Required) The exchange id (can be obtained from exchanges.all()) eg. binance
         * @param {object} params - Parameters to pass through to the request
         * @param {number} params.per_page - Total results per page
         * @param {number} params.page - Page through results
         * @returns {ReturnObject}
         */
        fetchStatusUpdates: (exchangeId: string, params?: {
            per_page: number;
            page: number;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get volume chart data for a given exchange, returned in BTC
         * @function exchanges.fetchVolumeChart()
         * @param {string} exchangeId - (Required) The exchange id (can be obtained from exchanges.all()) eg. binance
         * @param {object} params - Parameters to pass through to the request
         * @param {number} params.days - Data up to number of days ago (eg. 1, 14, 30)
         * @returns {ReturnObject}
         */
        fetchVolumeChart: (exchangeId: string, params?: {
            days: number;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
    };
    /**
     * @description Calls related to status updates
     */
    get statusUpdates(): {
        /**
         * @description List all status_updates with data (description, category, created_at, user, user_title and pin)
         * @function statusUpdates.all()
         * @param {object} params - Parameters to pass through to the request
         * @param {number} params.category - Filter results by CoinGecko.STATUS_UPDATE_CATEGORY[*]
         * @param {number} params.project_type - Filter results by CoinGecko.STATUS_UPDATE_PROJECT_TYPE[*] (If left empty returns both status from coins and markets)
         * @param {number} params.per_page - Total results per page
         * @param {number} params.page - Page through results
         * @returns {ReturnObject}
         */
        all: (params?: {
            category: number;
            project_type: number;
            per_page: number;
            page: number;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
    };
    /**
     * @description Calls related to events
     */
    get events(): {
        /**
         * @description Get events, paginated by 100
         * @function events.all()
         * @param {object} params - Parameters to pass through to the request
         * @param {number} params.country_code - country_code of event (eg. ‘US’). Use events.fetchHistory() for list of country_codes
         * @param {string} params.type - Type of event (eg.‘Conference’). Use events.fetchTypes() for list of types. Or use CoinGecko.EVENT_TYPE[*]
         * @param {number} params.page - Page of results (paginated by 100)
         * @param {boolean} params.upcoming_events_only [default: true] - Lists only upcoming events
         * @param {string} params.from_date - Lists events after this date yyyy-mm-dd
         * @param {string} params.to_date - Lists events before this date yyyy-mm-dd (set upcoming_events_only to false if fetching past events)
         * @returns {ReturnObject}
         */
        all: (params?: {
            country_code: number;
            type: string;
            page: number;
            upcoming_events_only: boolean;
            from_date: string;
            to_date: string;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get list of event countries
         * @function events.fetchCountries()
         * @returns {ReturnObject}
         */
        fetchCountries: () => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get list of event types
         * @function events.fetchTypes()
         * @returns {ReturnObject}
         */
        fetchTypes: () => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
    };
    /**
     * @description Calls related to exchange rates
     */
    get exchangeRates(): {
        /**
         * @description Get BTC-to-Currency exchange rates
         * @function exchangeRates.all()
         * @returns {ReturnObject}
         */
        all: () => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
    };
    /**
     * @description Calls related to "simple" endpoints
     */
    get simple(): {
        /**
         * @description Get the current price of any cryptocurrencies in any other supported currencies that you need
         * @function simple.price()
         * @param {object} params - Parameters to pass through to the request
         * @param {array|string} params.ids - (Required) A single id or a list of coin ids to filter if you want specific results. Use coins.list() for a list of coin ids.
         * @param {array|string} params.vs_currencies [default: usd] - A single id or a list of ids. Use simple.supportedVsCurrencies() for a list of vsCurrency ids.
         * @param {boolean} params.include_24hr_vol [default: false] - To include 24hr_vol (true/false)
         * @param {boolean} params.include_last_updated_at [default: false] - To include last_updated_at of price (true/false)
         * @returns {ReturnObject}
         */
        price: (params?: {
            ids: any[] | string;
            vs_currencies: any[] | string;
            include_24hr_vol: boolean;
            include_last_updated_at: boolean;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get list of supported vs/comparisons currencies
         * @function simple.supportedVsCurrencies()
         * @returns {ReturnObject}
         */
        supportedVsCurrencies: () => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Get current price of tokens (using contract addresses) for a given platform in any other currency that you need
         * @function simple.fetchTokenPrice()
         * @param {object} params - Parameters to pass through to the request
         * @param {string} assetPlatform [default: ethereum] - (Required) Asset platform (only ethereum is supported at this moment)
         * @param {string|array} params.contract_addresses - (Required) Token’s contract address
         * @param {string|array} params.vs_currencies - (Required) vs_currency of coins. Use simple.supportedVsCurrencies() for a list of vsCurrency ids.
         * @param {boolean} params.include_market_cap [default: false] - Include market cap in results or not
         * @param {boolean} params.include_24hr_vol [default: false] - Include 24hr volume in results or not
         * @param {boolean} params.include_24hr_change [default: false] - Include 24hr change in results or not
         * @param {boolean} params.include_last_updated_at [default: false] - Include last updated date in results or not
         * @returns {ReturnObject}
         */
        fetchTokenPrice: (params?: object, assetPlatform?: string) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
    };
    /**
     * @description Calls related to finance endpoints
     */
    get finance(): {
        /**
         * @description List all finance platforms
         * @function finance.fetchPlatforms()
         * @param {object} params - Parameters to pass through to the request
         * @param {number} params.per_page - Total results per page
         * @param {number} params.page - Page of results (paginated to 100 by default)
         * @returns {ReturnObject}
         */
        fetchPlatforms: (params?: {
            per_page: number;
            page: number;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description List all finance products
         * @function finance.fetchProducts()
         * @param {object} params - Parameters to pass through to the request
         * @param {number} params.per_page - Total results per page
         * @param {number} params.page - Page of results (paginated to 100 by default)
         * @param {string} params.start_at - Start date of the financial products
         * @param {string} params.end_at - End date of the financial products
         * @returns {ReturnObject}
         */
        fetchProducts: (params?: {
            per_page: number;
            page: number;
            start_at: string;
            end_at: string;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
    };
    /**
     * @description Calls related to index endpoints
     */
    get indexes(): {
        /**
         * @description List all market indexes
         * @function indexes.all()
         * @param {object} params - Parameters to pass through to the request
         * @param {number} params.per_page - Total results per page
         * @param {number} params.page - Page of results
         * @returns {ReturnObject}
         */
        all: (params?: {
            per_page: number;
            page: number;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Fetch market index by id
         * @function indexes.fetch()
         * @param {string} marketId - (Required) The market id (can be obtained from exchanges.list())
         * @param {string} indexId - (Required) The index id (can be obtained from indexes.list())
         * @returns {ReturnObject}
         */
        fetch: (marketId: string, indexId: string) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description List market indexes id and name
         * @function indexes.list()
         * @returns {ReturnObject}
         */
        list: () => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
    };
    /**
     * @description Calls related to derivative endpoints
     */
    get derivatives(): {
        /**
         * @description List all derivative tickers
         * @function derivatives.fetchTickers()
         * @returns {ReturnObject}
         */
        fetchTickers: () => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description List all derivative exchanges
         * @function derivatives.allExchanges()
         * @param {object} params - Parameters to pass through to the request
         * @param {string} params.order - Order results by CoinGecko.ORDER[*]
         * @param {number} params.per_page - Total results per page
         * @param {number} params.page - Page of results
         * @returns {ReturnObject}
         */
        allExchanges: (params?: {
            order: string;
            per_page: number;
            page: number;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description Show derivative exchange data
         * @function derivatives.fetchExchange()
         * @param {string} exchangeId - (Required) The exchange id (can be obtained from derivatives.listExchanges()) e.g. bitmex
         * @param {object} params - Parameters to pass through to the request
         * @param {boolean} params.include_tickers [default: false] - Include the tickers information
         * @returns {ReturnObject}
         */
        fetchExchange: (exchangeId: string, params?: {
            include_tickers: boolean;
        }) => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
        /**
         * @description List all derivative exchanges name and identifier
         * @function derivatives.listExchanges()
         * @returns {ReturnObject}
         */
        listExchanges: () => (success: boolean, message: string, code: number, data: any) => {
            success: boolean;
            message: string;
            code: number;
            data: any;
        };
    };
    /**
     * @description Build options for https.request
     * @function _buildRequestOptions
     * @protected
     * @param {string} path - Relative path for API
     * @param {object} params - Object representing query strings for url parameters
     * @returns {Object} - {path, method, host, port} Options for request
     */
    protected _buildRequestOptions(path: string, params: object): any;
    /**
     * @description Perform https request
     * @function _request
     * @protected
     * @param {string} path - Relative path for API
     * @param {object} params - Object representing query strings for url parameters
     * @returns {Promise} Body of https request data results
     */
    protected _request(path: string, params: object): Promise<any>;
}
declare namespace CoinGecko {
    const API_VERSION: string;
    const REQUESTS_PER_SECOND: number;
    const ORDER: {
        GECKO_ASC: string;
        GECKO_DESC: string;
        MARKET_CAP_ASC: string;
        MARKET_CAP_DESC: string;
        VOLUME_ASC: string;
        VOLUME_DESC: string;
        COIN_NAME_ASC: string;
        COIN_NAME_DESC: string;
        PRICE_ASC: string;
        PRICE_DESC: string;
        HOUR_24_ASC: string;
        HOUR_24_DESC: string;
        TRUST_SCORE_DESC: string;
        NAME_ASC: string;
        NAME_DESC: string;
        OPEN_INTEREST_BTC_ASC: string;
        OPEN_INTEREST_BTC_DESC: string;
        TRADE_VOLUME_24H_BTC_ASC: string;
        TRADE_VOLUME_24H_BTC_DESC: string;
    };
    const STATUS_UPDATE_CATEGORY: {
        GENERAL: string;
        MILESTONE: string;
        PARTNERSHIP: string;
        EXCHANGE_LISTING: string;
        SOFTWARE_RELEASE: string;
        FUND_MOVEMENT: string;
        NEW_LISTINGS: string;
        EVENT: string;
    };
    const STATUS_UPDATE_PROJECT_TYPE: {
        COIN: string;
        MARKET: string;
    };
    const EVENT_TYPE: {
        EVENT: string;
        CONFERENCE: string;
        MEETUP: string;
    };
    const TIMEOUT: number;
}

'use strict';

//Modules
const https = require('https');
const querystring = require('querystring');

//Helpers
const Utils = require('./helpers/utilities');

/**
 * @typedef {Object} ReturnObject
 * @description - Return object for requests in the class. Helper for reference.
 * @param {boolean} success - Whether the response status code returned a successful code (>200 && <300)
 * @param {string} message - The response status message
 * @param {number} code - The response status code
 * @param {object|*} data - The body data in json format from the request
 * @property {boolean} success - Whether the response status code returned a successful code (>200 && <300)
 * @property {string} message - The response status message
 * @property {number} code - The response status code
 * @property {object|*} data - The body data in json format from the request
 */

/**
 * @class CoinGecko
 * @author Mark Miscavage <markmiscavage@protonmail.com>
 * @author Tony DiPadova <tdipadova3rd@gmail.com>
 * @description A Node.js wrapper for the CoinGecko API with no dependencies. For more information, visit: https://www.coingecko.com/api/docs/v3
 * @example
 *     const CoinGecko = require('coingecko-api-typed');
 *     const CoinGeckoClient = new CoinGecko();
 * @public
 * @version 1.0.20
 * @license MIT
 * @kind class
 */
class CoinGecko {

  /**
   * @description Construct a CoinGecko client
   */
  constructor(apiKey=null) {
    this._apiKey = apiKey;
  }

  /**
   * @description Check API server status
   * @function ping
   * @returns {Promise<ReturnObject>}
   */
  ping() {
    const path = `/ping`;

    return this._request(path);
  };

  /**
   * @description Get cryptocurrency global data
   * @function global
   * @returns {Promise<ReturnObject>}
   */
  global() {
    const path = `/global`;

    return this._request(path);
  };

  /**
   * @description Calls related to coins
   */
  get coins() {
    const pathPrefix = 'coins';

    return {

      /**
       * @description List all coins with data (name, price, market, developer, community, etc) - paginated by 50
       * @function coins.all()
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.order - Order results by CoinGecko.ORDER[*]
       * @param {number} params.per_page - Total results per page
       * @param {number} params.page - Page through results
       * @param {boolean} params.localization [default: true] - Set to false to exclude localized languages in response
       * @param {boolean} params.sparkline [default: false] - Include sparkline 7 days data
       * @returns {Promise<ReturnObject>}
       */
      all: (params = {}) => {
        const path = `/${pathPrefix}`;

        return this._request(path, params);
      },

      /**
       * @description Use this to obtain all the coins’ id in order to make API calls
       * @function coins.list()
       * @returns {Promise<ReturnObject>}
       */
      list: () => {
        const path = `/${pathPrefix}/list`;

        return this._request(path);
      },

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
       * @returns {Promise<ReturnObject>}
       */
      markets: (params = {}) => {
        const path = `/${pathPrefix}/markets`;

        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //If no params.vs_currency, set to default: 'usd'
        if (!Utils.isString(params['vs_currency']) || Utils.isStringEmpty(params['vs_currency'])) {
          params.vs_currency = 'usd';
        }

        //Check the params.ids
        //If is string, ok. If is array, convert to string
        if (Utils.isArray(params['ids'])) {
          params.ids = params.ids.join(',');
        }

        return this._request(path, params);
      },

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
       * @returns {Promise<ReturnObject>}
       */
      fetch: (coinId, params = {}) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        const path = `/${pathPrefix}/${coinId}`;

        return this._request(path, params);
      },

      /**
       * @description Get coin tickers (paginated to 100 items).
       * @function coins.fetchTickers()
       * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.page - Page through results
       * @param {number} params.exchange_ids - Filter tickers by exchange_ids
       * @param {string} params.order [default: trust_score_desc] - Order results by CoinGecko.ORDER.TRUST_SCORE_DESC or CoinGecko.ORDER.VOLUME_DESC
       * @returns {Promise<ReturnObject>}
       */
      fetchTickers: (coinId, params = {}) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        //Convert array to string
        if (Utils.isArray(params['exchange_ids'])) {
          params.exchange_ids = params.exchange_ids.join(',');
        }

        const path = `/${pathPrefix}/${coinId}/tickers`;

        return this._request(path, params);
      },

      /**
       * @description Get historical data (name, price, market, stats) at a given date for a coin
       * @function coins.fetchHistory()
       * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.date - (Required) The date of data snapshot in dd-mm-yyyy eg. 30-12-2017
       * @param {boolean} params.localization [default: true] - Set to false to exclude localized languages in response
       * @returns {Promise<ReturnObject>}
       */
      fetchHistory: (coinId, params = {}) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //If no params.date, set to default today/now
        if (!Utils.isString(params['date']) || Utils.isStringEmpty(params['date'])) Utils._WARN_('Missing parameter', 'params must include `date` and be a string in format: `dd-mm-yyyy`');

        const path = `/${pathPrefix}/${coinId}/history`;

        return this._request(path, params);
      },

      /**
       * @description Get historical market data include price, market cap, and 24h volume (granularity auto)
       * @function coins.fetchMarketChart()
       * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
       * @param {string} params.days [default: 1] - (Required) Data up to number of days ago (eg. 1,14,30,max)
       * @returns {Promise<ReturnObject>}
       */
      fetchMarketChart: (coinId, params = {}) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //If no params.vs_currency, set to default: 'usd'
        if (!Utils.isString(params['vs_currency']) || Utils.isStringEmpty(params['vs_currency'])) {
          params.vs_currency = 'usd';
        }

        //If no params.days, set to default: 1
        if (params['days'] == undefined) {
          params.days = 1;
        }

        const path = `/${pathPrefix}/${coinId}/market_chart`;

        return this._request(path, params);
      },

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
       * @returns {Promise<ReturnObject>}
       */
      fetchMarketChartRange: (coinId, params = {}) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //If no params.vs_currency, set to default: 'usd'
        if (!Utils.isString(params['vs_currency']) || Utils.isStringEmpty(params['vs_currency'])) {
          params.vs_currency = 'usd';
        }

        if (!Utils.isNumber(params['from'])) Utils._WARN_('Missing parameter', 'params must include `from` and be a UNIX timestamp.');
        if (!Utils.isNumber(params['to'])) Utils._WARN_('Missing parameter', 'params must include `to` and be a UNIX timestamp.');

        const path = `/${pathPrefix}/${coinId}/market_chart/range`;

        return this._request(path, params);
      },

      /**
       * @description Get coin info from contract address
       * @function coins.fetchCoinContractInfo()
       * @param {object} contractAddress - (Required) Token’s contract address
       * @param {string} assetPlatform [default: ethereum] - (Required) Asset platform (only ethereum is supported at this moment)
       * @returns {Promise<ReturnObject>}
       */
      fetchCoinContractInfo: (contractAddress, assetPlatform = 'ethereum') => {
        //Must have contractAddress, assetPlatform
        if (!Utils.isString(contractAddress) || Utils.isStringEmpty(contractAddress)) Utils._WARN_('Invalid parameter', 'contractAddress must be of type: String and greater than 0 characters.');
        if (!Utils.isString(assetPlatform) || Utils.isStringEmpty(assetPlatform)) Utils._WARN_('Invalid parameter', 'assetPlatform must be of type: String and greater than 0 characters.');

        const path = `/${pathPrefix}/${assetPlatform}/contract/${contractAddress}`;

        return this._request(path);
      },

      /**
       * @description Get historical market data include price, market cap, and 24h volume (granularity auto) from a contract address
       * @function coins.fetchCoinContractMarketChart()
       * @param {object} contractAddress - (Required) Token’s contract address
       * @param {string} assetPlatform [default: ethereum] - (Required) Asset platform (only ethereum is supported at this moment)
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
       * @param {string} params.days [default: 1] - (Required) Data up to number of days ago (eg. 1,14,30,max)
       * @returns {Promise<ReturnObject>}
       */
      fetchCoinContractMarketChart: (contractAddress, assetPlatform = 'ethereum', params = {}) => {
        //Must have contractAddress, assetPlatform
        if (!Utils.isString(contractAddress) || Utils.isStringEmpty(contractAddress)) Utils._WARN_('Invalid parameter', 'contractAddress must be of type: String and greater than 0 characters.');
        if (!Utils.isString(assetPlatform) || Utils.isStringEmpty(assetPlatform)) Utils._WARN_('Invalid parameter', 'assetPlatform must be of type: String and greater than 0 characters.');

        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //If no params.vs_currency, set to default: 'usd'
        if (!Utils.isString(params['vs_currency']) || Utils.isStringEmpty(params['vs_currency'])) {
          params.vs_currency = 'usd';
        }

        //If no params.days, set to default: 1
        if (params['days'] == undefined) {
          params.days = 1;
        }

        const path = `/${pathPrefix}/${assetPlatform}/contract/${contractAddress}/market_chart`;

        return this._request(path, params);
      },

      /**
       * @description Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto)
       * @function coins.fetchCoinContractMarketChartRange()
       * @param {object} contractAddress - (Required) Token’s contract address
       * @param {string} assetPlatform [default: ethereum] - (Required) Asset platform (only ethereum is supported at this moment)
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
       * @param {number} params.from - (Required) From date in UNIX Timestamp (eg. 1392577232)
       * @param {number} params.to - (Required) To date in UNIX Timestamp (eg. 1422577232)
       * @returns {Promise<ReturnObject>}
       */
      fetchCoinContractMarketChartRange: (contractAddress, assetPlatform = 'ethereum', params = {}) => {
        //Must have contractAddress, assetPlatform
        if (!Utils.isString(contractAddress) || Utils.isStringEmpty(contractAddress)) Utils._WARN_('Invalid parameter', 'contractAddress must be of type: String and greater than 0 characters.');
        if (!Utils.isString(assetPlatform) || Utils.isStringEmpty(assetPlatform)) Utils._WARN_('Invalid parameter', 'assetPlatform must be of type: String and greater than 0 characters.');

        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //If no params.vs_currency, set to default: 'usd'
        if (!Utils.isString(params['vs_currency']) || Utils.isStringEmpty(params['vs_currency'])) {
          params.vs_currency = 'usd';
        }

        //If no params.days, set to default: 1
        if (params['days'] == undefined) {
          params.days = 1;
        }

        const path = `/${pathPrefix}/${assetPlatform}/contract/${contractAddress}/market_chart/range`;

        return this._request(path, params);
      },
    };
  };

  /**
   * @description Calls related to exchanges
   */
  get exchanges() {
    const pathPrefix = 'exchanges';

    return {

      /**
       * @description List all exchanges
       * @function exchanges.all()
       * @returns {Promise<ReturnObject>}
       */
      all: () => {
        const path = `/${pathPrefix}`;

        return this._request(path);
      },

      /**
       * @description List all supported markets id and name
       * @function exchanges.list()
       * @returns {Promise<ReturnObject>}
       */
      list: () => {
        const path = `/${pathPrefix}/list`;

        return this._request(path);
      },

      /**
       * @description Get exchange volume in BTC and top 100 tickers only for a given exchange
       * @function exchanges.fetch()
       * @param {string} exchangeId - (Required) The exchange id (can be obtained from exchanges.all()) eg. binance
       * @returns {Promise<ReturnObject>}
       */
      fetch: (exchangeId) => {
        //Must have exchangeId
        if (!Utils.isString(exchangeId) || Utils.isStringEmpty(exchangeId)) Utils._WARN_('Invalid parameter', 'exchangeId must be of type: String and greater than 0 characters.');

        const path = `/${pathPrefix}/${exchangeId}`;

        return this._request(path);
      },

      /**
       * @description Get tickers for a given exchange
       * @function exchanges.fetchTickers()
       * @param {string} exchangeId - (Required) The exchange id (can be obtained from exchanges.all()) eg. binance
       * @param {object} params - Parameters to pass through to the request
       * @param {number} params.page - Page through results
       * @param {number} params.coin_ids - Filter tickers by coin_ids
       * @param {string} params.order [default: trust_score_desc] - Order results by CoinGecko.ORDER.TRUST_SCORE_DESC or CoinGecko.ORDER.VOLUME_DESC
       * @returns {Promise<ReturnObject>}
       */
      fetchTickers: (exchangeId, params = {}) => {
        //Must have exchangeId
        if (!Utils.isString(exchangeId) || Utils.isStringEmpty(exchangeId)) Utils._WARN_('Invalid parameter', 'exchangeId must be of type: String and greater than 0 characters.');

        //Convert array to string
        if (Utils.isArray(params['coin_ids'])) {
          params.coin_ids = params.coin_ids.join(',');
        }

        const path = `/${pathPrefix}/${exchangeId}/tickers`;

        return this._request(path, params);
      },

      /**
       * @description Get volume chart data for a given exchange, returned in BTC
       * @function exchanges.fetchVolumeChart()
       * @param {string} exchangeId - (Required) The exchange id (can be obtained from exchanges.all()) eg. binance
       * @param {object} params - Parameters to pass through to the request
       * @param {number} params.days - Data up to number of days ago (eg. 1, 14, 30)
       * @returns {Promise<ReturnObject>}
       */
      fetchVolumeChart: (exchangeId, params = {}) => {
        //Must have exchangeId
        if (!Utils.isString(exchangeId) || Utils.isStringEmpty(exchangeId)) Utils._WARN_('Invalid parameter', 'exchangeId must be of type: String and greater than 0 characters.');

        const path = `/${pathPrefix}/${exchangeId}/volume_chart`;

        return this._request(path, params);
      },
    };
  };

  /**
   * @description Calls related to exchange rates
   */
  get exchangeRates() {
    return {

      /**
       * @description Get BTC-to-Currency exchange rates
       * @function exchangeRates.all()
       * @returns {Promise<ReturnObject>}
       */
      all: () => {
        const path = `/exchange_rates`;

        return this._request(path);
      }
    };
  };

  /**
   * @description Calls related to "simple" endpoints
   */
  get simple() {
    return {

      /**
       * @description Get the current price of any cryptocurrencies in any other supported currencies that you need
       * @function simple.price()
       * @param {object} params - Parameters to pass through to the request
       * @param {array|string} params.ids - (Required) A single id or a list of coin ids to filter if you want specific results. Use coins.list() for a list of coin ids.
       * @param {array|string} params.vs_currencies [default: usd] - A single id or a list of ids. Use simple.supportedVsCurrencies() for a list of vsCurrency ids.
       * @param {boolean} params.include_24hr_vol [default: false] - To include 24hr_vol (true/false)
       * @param {boolean} params.include_last_updated_at [default: false] - To include last_updated_at of price (true/false)
       * @returns {Promise<ReturnObject>}
       */
      price: (params = {}) => {
        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //Check the params.vs_currencies
        //If is string, ok. If is array, convert to string
        if (Utils.isArray(params['vs_currencies'])) {
          params.vs_currencies = params.vs_currencies.join(',');
        }

        //If no params.vs_currency, set to default: 'usd'
        if (!Utils.isString(params['vs_currencies']) || Utils.isStringEmpty(params['vs_currencies'])) {
          params.vs_currencies = 'usd';
        }

        //Check the params.ids
        //If is string, ok. If is array, convert to string
        if (Utils.isArray(params['ids'])) {
          params.ids = params.ids.join(',');
        }

        //Must have params.ids
        if (!Utils.isString(params['ids']) || Utils.isStringEmpty(params['ids'])) Utils._WARN_('Invalid parameter', 'params.ids must be of type: String or Array and greater than 0 characters.');

        //

        const path = `/simple/price`;

        return this._request(path, params);
      },

      /**
       * @description Get list of supported vs/comparisons currencies
       * @function simple.supportedVsCurrencies()
       * @returns {Promise<ReturnObject>}
       */
      supportedVsCurrencies: () => {
        const path = `/simple/supported_vs_currencies`;

        return this._request(path);
      },

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
       * @returns {Promise<ReturnObject>}
       */
      fetchTokenPrice: (params = {}, assetPlatform = 'ethereum') => {
        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //Must have assetPlatform
        if (!Utils.isString(assetPlatform) || Utils.isStringEmpty(assetPlatform)) Utils._WARN_('Invalid parameter', 'assetPlatform must be of type: String and greater than 0 characters.');

        //Must have contract_addresses, vs_currencies
        if (!params['contract_addresses']) Utils._WARN_('Missing parameter', 'params must include `contract_addresses` and be a of type: String or Object');
        if (!params['vs_currencies']) Utils._WARN_('Missing parameter', 'params must include `vs_currencies` and be a of type: String or Object');

        //If are arrays, convert to string
        if (Utils.isArray(params['contract_addresses'])) {
          params.contract_addresses = params.contract_addresses.join(',');
        }

        if (Utils.isArray(params['vs_currencies'])) {
          params.vs_currencies = params.vs_currencies.join(',');
        }

        const path = `/simple/token_price/${assetPlatform}`;

        return this._request(path, params);
      },
    };
  };

  /**
   * @description Calls related to finance endpoints
   */
  get assetPlatforms() {
    return {
      /**
       * @description List all finance platforms
       * @function finance.fetchPlatforms()
       * @param {object} params - Parameters to pass through to the request
       * @param {number} params.per_page - Total results per page
       * @param {number} params.page - Page of results (paginated to 100 by default)
       * @returns {Promise<ReturnObject>}
       */
      all: (params = {}) => {
        const path = `/asset_platforms`;
        return this._request(path, params);
      },
    };
  };

  /**
   * @description Calls related to index endpoints
   */
  get indexes() {
    const pathPrefix = 'indexes';

    return {
      /**
       * @description List all market indexes
       * @function indexes.all()
       * @param {object} params - Parameters to pass through to the request
       * @param {number} params.per_page - Total results per page
       * @param {number} params.page - Page of results
       * @returns {Promise<ReturnObject>}
       */
      all: (params = {}) => {
        const path = `/${pathPrefix}`;

        return this._request(path, params);
      },

      /**
       * @description Fetch market index by id
       * @function indexes.fetch()
       * @param {string} marketId - (Required) The market id (can be obtained from exchanges.list())
       * @param {string} indexId - (Required) The index id (can be obtained from indexes.list())
       * @returns {Promise<ReturnObject>}
       */
      fetch: (marketId, indexId) => {
        //Must have marketId
        if (!Utils.isString(marketId) || Utils.isStringEmpty(marketId)) Utils._WARN_('Invalid parameter', 'marketId must be of type: String and greater than 0 characters.');
        //Must have indexId
        if (!Utils.isString(indexId) || Utils.isStringEmpty(indexId)) Utils._WARN_('Invalid parameter', 'indexId must be of type: String and greater than 0 characters.');

        const path = `/${pathPrefix}/${marketId}/${indexId}`;

        return this._request(path);
      },

      /**
       * @description List market indexes id and name
       * @function indexes.list()
       * @returns {Promise<ReturnObject>}
       */
      list: () => {
        const path = `/${pathPrefix}/list`;

        return this._request(path);
      },

    };
  };

  /**
   * @description Calls related to derivative endpoints
   */
  get derivatives() {
    const pathPrefix = 'derivatives';

    return {
      /**
       * @description List all derivative tickers
       * @function derivatives.fetchTickers()
       * @returns {Promise<ReturnObject>}
       */
      fetchTickers: () => {
        const path = `/${pathPrefix}`;

        return this._request(path);
      },

      /**
       * @description List all derivative exchanges
       * @function derivatives.allExchanges()
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.order - Order results by CoinGecko.ORDER[*]
       * @param {number} params.per_page - Total results per page
       * @param {number} params.page - Page of results
       * @returns {Promise<ReturnObject>}
       */
      allExchanges: (params = {}) => {
        const path = `/${pathPrefix}/exchanges`;

        return this._request(path, params);
      },

      /**
       * @description Show derivative exchange data
       * @function derivatives.fetchExchange()
       * @param {string} exchangeId - (Required) The exchange id (can be obtained from derivatives.listExchanges()) e.g. bitmex
       * @param {object} params - Parameters to pass through to the request
       * @param {boolean} params.include_tickers [default: false] - Include the tickers information
       * @returns {Promise<ReturnObject>}
       */
      fetchExchange: (exchangeId, params = {}) => {
        //Must have exchangeId
        if (!Utils.isString(exchangeId) || Utils.isStringEmpty(exchangeId)) Utils._WARN_('Invalid parameter', 'exchangeId must be of type: String and greater than 0 characters.');

        const path = `/${pathPrefix}/exchanges/${exchangeId}`;

        return this._request(path, params);
      },

      /**
       * @description List all derivative exchanges name and identifier
       * @function derivatives.listExchanges()
       * @returns {Promise<ReturnObject>}
       */
      listExchanges: () => {
        const path = `/${pathPrefix}/exchanges/list`;

        return this._request(path);
      },
    };
  };

  /**
   * @description Determines if the pro endpoint should be used
   * @function _shouldCallPro
   * @protected
   * @returns {boolean} - Should call pro endpoint
   */
  _shouldCallPro() {
    return this._apiKey !== null;
  }

  /**
   * @description Add API key to request parameters if it exists
   * @function _insertApiKeyIntoParams
   * @protected
   * @param {string} apiKey - Pro API Key
   * @param {object} params - Object representing query strings for url parameters
   * @returns {Object} - {params} Updated params with API key
   */
  _insertApiKeyIntoParams(params) {
    //Insert pro API key if params and API key exist
    if (Utils.isObject(params) && this._shouldCallPro()) {
      params['x_cg_pro_api_key'] = this._apiKey;
    }
    return params;
  }

  /**
   * @description Resolve hostname to pro or normal host
   * @function _resolveHost
   * @protected
   * @returns {string} - Resolved hostname
   */
  _resolveHost() {
    return this._shouldCallPro() ? PRO_HOST : HOST;
  }

  /**
   * @description Build options for https.request
   * @function _buildRequestOptions
   * @protected
   * @param {string} path - Relative path for API
   * @param {object} params - Object representing query strings for url parameters
   * @returns {Object} - {path, method, host, port} Options for request
   */
  _buildRequestOptions(path, params) {
    //Insert pro API key if params and API key exist
    params = this._insertApiKeyIntoParams(params);

    //Stringify object params if exist
    if (Utils.isObject(params)) params = querystring.stringify(params);
    else params = undefined;

    //Make relative path
    //Check if has params, append accordingly
    if (params == undefined) path = `/api/v${API_VERSION}${path}`;
    else path = `/api/v${API_VERSION}${path}?${params}`;

    //Return options
    return {
      path,
      method: 'GET',
      host: this._resolveHost(),
      port: 443,
      timeout: CoinGecko.TIMEOUT,
    };
  };

  /**
   * @description Perform https request
   * @function _request
   * @protected
   * @param {string} path - Relative path for API
   * @param {object} params - Object representing query strings for url parameters
   * @returns {Promise<ReturnObject>} Body of https request data results
   */
  _request(path, params) {
    let options = this._buildRequestOptions(path, params);

    return new Promise((resolve, reject) => {
      //Perform request
      let req = https.request(options, (res) => {
        let body = [];

        //Set body on data
        res.on('data', (chunk) => {
          body.push(chunk);
        });

        //On end, end the Promise
        res.on('end', () => {
          try {
            body = Buffer.concat(body);
            body = body.toString();

            //Check if page is returned instead of JSON
            if (body.startsWith('<!DOCTYPE html>')) {
              Utils._WARN_('Invalid request', 'There was a problem with your request. The parameter(s) you gave are missing or incorrect.');
            } else if (body.startsWith('Throttled')) {
              Utils._WARN_('Throttled request', 'There was a problem with request limit.');
            }

            //Attempt to parse
            body = JSON.parse(body);
          }
          catch (error) {
            reject(error);
          };

          // Create return object
          resolve({
            success: !(res.statusCode < 200 || res.statusCode >= 300),
            message: res.statusMessage, 
            code: res.statusCode, 
            data: body 
          });
        });
      });

      //On error, reject the Promise
      req.on('error', (error) => reject(error));

      //On timeout, reject the Promise
      req.on('timeout', () => {
        req.abort();
        reject(new Error(`CoinGecko API request timed out. Current timeout is: ${CoinGecko.TIMEOUT} milliseconds`));
      });

      //End request
      req.end();
    });
  };
};

/**
 * @description The base url for the CoinGecko API
 * @kind constant
 */
 const BASE = 'https://api.coingecko.com/api/';

 /**
  * @description The host of the CoinGecko API
  * @kind constant
  */
 const HOST = 'api.coingecko.com';

 /**
 * @description The pro host of the CoinGecko API
 * @kind constant
 */
  const PRO_HOST = 'pro-api.coingecko.com';
 
 /**
  * @description The current version for the CoinGecko API
  * @kind constant
  */
 const API_VERSION = '3';
 
 /**
  * @description The CoinGecko URI according to base and current version
  * @kind constant
  */
 const URI = `${BASE}v${API_VERSION}`;
 
 /**
  * @description The maximum number of requests per second for the CoinGecko API
  * @kind constant
  */
 const REQUESTS_PER_SECOND = 10;
 
 /**
  * @description Timeout for connecton to CoinGecko API in milliseconds (default: 30 seconds)
  * @kind constant
  */
 const TIMEOUT = 30000;
 
 /**
  * @description Available options to order results by
  * @kind constant
  */
 const ORDER = {
   GECKO_ASC: 'gecko_asc',
   GECKO_DESC: 'gecko_desc',
   MARKET_CAP_ASC: 'market_cap_asc',
   MARKET_CAP_DESC: 'market_cap_desc',
   VOLUME_ASC: 'volume_asc',
   VOLUME_DESC: 'volume_desc',
   COIN_NAME_ASC: 'coin_name_asc',
   COIN_NAME_DESC: 'coin_name_desc',
   PRICE_ASC: 'price_asc',
   PRICE_DESC: 'price_desc',
   HOUR_24_ASC: 'h24_change_asc',
   HOUR_24_DESC: 'h24_change_desc',
   TRUST_SCORE_DESC: 'trust_score_desc',
   NAME_ASC: 'name_asc',
   NAME_DESC: 'name_desc',
   OPEN_INTEREST_BTC_ASC: 'open_interest_btc_asc',
   OPEN_INTEREST_BTC_DESC: 'open_interest_btc_desc',
   TRADE_VOLUME_24H_BTC_ASC: 'trade_volume_24h_btc_asc',
   TRADE_VOLUME_24H_BTC_DESC: 'trade_volume_24h_btc_desc',
 };

//Set Constants
CoinGecko.API_VERSION = API_VERSION;
CoinGecko.REQUESTS_PER_SECOND = REQUESTS_PER_SECOND;
CoinGecko.ORDER = ORDER;
CoinGecko.TIMEOUT = TIMEOUT;

module.exports = CoinGecko;
module.exports.default = CoinGecko;
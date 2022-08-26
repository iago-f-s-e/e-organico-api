export const enum EntryPoints {
  API = 'api',
  TRANSACTION = 'api/transaction',
  PAYMENT = 'api/payment',

  PRODUCER = 'api/producer',
  PRODUCER_PRODUCT = 'api/producer-product',
  PRODUCER_MARKET = 'api/producer-market',

  MARKET = 'api/market',
  MARKET_BY_ID = 'api/market/:id',
  MARKET_WITHOUT_PRODUCER_MARKET = 'api/market/without-producer-market',

  PRODUCT = 'api/product',
  PRODUCT_WITHOUT_PRODUCER_PRODUCT = 'api/product/without-producer-product'
}

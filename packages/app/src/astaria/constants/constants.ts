// Business logic
export const DEFAULT_SYMBOL = 'ETH';
export const JS_MAX_SAFE_DECIMALS_STEP = 0.0001; // 4 levels of precision

export const HIGH_LTV = 100;
export const INTENTS_APY_MAXIMUM = 1000; // contracts are coded to 1000% max rate as a maximum
export const BORROW_INTENT_APY_DEFAULT = HIGH_LTV;
export const LEND_INTENT_APY_DEFAULT = 10;
export const INTENTS_LTV_MAX = 200;
export const LEND_INTENTS_LTV_MAX = 100;
export const BORROW_AMOUNT_NO_LTV_EXPERT_MODE_THRESHOLD = 100000; // $100k
export const BORROW_COLLATERAL_AMOUNT_NO_EXPERT_MODE_LOWER_THRESHOLD = 10; // $10
export const REDIS_CACHING_SECONDS = 60; // 60 seconds
export const REDIS_CACHE_KEY = 'intent-feed';

export const MIDNIGHT_HOURS = 24;

// Notifications
export const FETCH_LIMIT = 10;

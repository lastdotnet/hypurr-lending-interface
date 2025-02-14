const HOME = '/';
const INTENTS = '/intents';
const INTENT = (shortId?: string) => `i/${shortId}`;
const LOANS = '/loans';
const MARKETS = '/markets';
const POINTS = '/points';
const POINTS_HISTORY = `${POINTS}/history`;
const POINTS_HOW_TO_EARN = `${POINTS}/how-to-earn`;
const POINTS_LEADERBOARD = `${POINTS}/leaderboard`;
const PRIVACY = '/privacy';
const PRIVACY_CA = `${PRIVACY}/ca`;
const TERMS = '/terms';
const WALLET_NOTIFICATIONS = '/wallet-notifications';
const WALLET_NOTIFICATIONS_DASHBOARD = `${WALLET_NOTIFICATIONS}/dashboard`;
const WALLET_NOTIFICATIONS_SETTINGS = `${WALLET_NOTIFICATIONS}/settings`;

export const ROUTES = {
  HOME,
  INTENT,
  INTENTS,
  LOANS,
  MARKETS,
  POINTS_HISTORY,
  POINTS_HOW_TO_EARN,
  POINTS_LEADERBOARD,
  PRIVACY,
  PRIVACY_CA,
  TERMS,
  WALLET_NOTIFICATIONS_DASHBOARD,
  WALLET_NOTIFICATIONS_SETTINGS,
};

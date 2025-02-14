import type { z } from 'zod';

import type { eventSchema, payload } from './events';

export type Event = z.infer<typeof eventSchema>;
export type EventPayload = z.infer<typeof payload>;

/**
 * Represents the type of a notification.
 * Possible values are:
 * - 'user-info': A notification for general user information.
 * - 'internal-info': A notification for internal information.
 * - 'internal-critical': A critical notification for internal use.
 * - 'error': A notification for reporting errors.
 */
export type NotificationType =
  | 'user-info'
  | 'internal-info'
  | 'internal-critical'
  | 'error';

/**
 * Represents the channel through which a notification can be sent.
 * Possible values are:
 * - 'slack': Send the notification to Slack.
 * - 'discord': Send the notification to Discord.
 * - 'telegram': Send the notification to Telegram.
 */
export type NotificationChannel = 'slack' | 'discord' | 'telegram';

/**
 * Represents the values that can be included in a notification.
 * The values are stored as key-value pairs.
 */
export type NotificationValues = {
  [name: string]: string;
};

/**
 * Represents the payload for reporting errors.
 * It can be either an EventPayload or an object with optional 'code' and 'trace' properties.
 */
export type ErrorPayload = EventPayload & {
  code?: string;
  trace?: string;
};

/**
 * Represents a notification message.
 * It includes the channel, payload, and type of the notification.
 */
export type NotificationMessage = {
  channel: NotificationChannel;
  payload: EventPayload | ErrorPayload;
  type: NotificationType;
};

export interface IAdapter {
  sendCriticalInfo(payload: EventPayload): Promise<boolean>;
  sendError(payload: ErrorPayload): Promise<boolean>;
  sendInternalInfo(payload: EventPayload): Promise<boolean>;
  sendUserInfo(payload: EventPayload): Promise<boolean>;
}

export type Adapters = { [name in NotificationChannel]: IAdapter };

export type SendMessageParams = {
  text: string;
};

export type SendMessageResult = {
  text: string;
};

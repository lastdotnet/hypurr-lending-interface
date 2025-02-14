'use server';

import { Client } from '@upstash/qstash';

import type {
  ErrorPayload,
  EventPayload,
  NotificationChannel,
  NotificationType,
} from './types';

const { NEXT_QSTASH_NOTIFICATIONS_TOPIC = '', NEXT_QSTASH_TOKEN = '' } =
  process.env;

const qStashClient = new Client({
  token: NEXT_QSTASH_TOKEN as string,
});

type NotifyProps = {
  channel: NotificationChannel;
  payload: EventPayload | ErrorPayload;
  type: NotificationType;
};

export async function notify({ channel, payload, type }: NotifyProps) {
  return (
    NEXT_QSTASH_TOKEN &&
    NEXT_QSTASH_NOTIFICATIONS_TOPIC &&
    qStashClient.publishJSON({
      body: { channel, payload, type },
      topic: NEXT_QSTASH_NOTIFICATIONS_TOPIC as string,
    })
  );
}

export async function sendInternalEvent(event: EventPayload) {
  return notify({ channel: 'slack', payload: event, type: 'internal-info' });
}

export async function sendInternalWarning(warning: ErrorPayload) {
  return notify({
    channel: 'slack',
    payload: warning,
    type: 'internal-critical',
  });
}

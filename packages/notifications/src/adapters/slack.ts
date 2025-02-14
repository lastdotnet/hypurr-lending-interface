import { IncomingWebhook } from '@slack/webhook';

import {
  type IAdapter,
  type NotificationType,
  type SendMessageParams,
} from '../types';
import { Adapter } from './adapter';

export class SlackAdapter extends Adapter implements IAdapter {
  private getWebhookUrl = (type: NotificationType): string | undefined => {
    switch (type) {
      case 'error':
      case 'internal-critical':
        return process.env.NEXT_SLACK_WARNINGS_WEBHOOK;
      case 'internal-info':
      case 'user-info':
        return process.env.NEXT_SLACK_EVENT_WEBHOOK;
    }
  };

  protected emojies = {
    error: ':zap:',
    'internal-critical': ':warning:',
    'internal-info': ':information_source:',
    'user-info': ':information_desk_person:',
  };

  protected boldWrapper = (str: string) => `*${str}*`;

  protected sendMessage = async (
    type: NotificationType,
    message: SendMessageParams
  ) => {
    const webhookUrl = this.getWebhookUrl(type);
    if (!webhookUrl) {
      throw new Error(`Slack webhook url is not defined!`);
    }
    const webhook = new IncomingWebhook(webhookUrl);
    return webhook.send(message);
  };
}

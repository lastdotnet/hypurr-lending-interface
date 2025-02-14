import {
  type IAdapter,
  type NotificationType,
  type SendMessageParams,
} from '../types';
import { Adapter } from './adapter';

export class TelegramAdapter extends Adapter implements IAdapter {
  private chatIDs: { [type in NotificationType]: string } = {
    error: process.env.NEXT_TELEGRAM_WARNINGS_CHAT_ID ?? '',
    'internal-critical': process.env.NEXT_TELEGRAM_WARNINGS_CHAT_ID ?? '',
    'internal-info': process.env.NEXT_TELEGRAM_EVENTS_CHAT_ID ?? '',
    'user-info': process.env.NEXT_TELEGRAM_EVENTS_CHAT_ID ?? '',
  };

  protected emojies = {
    error: ':zap:',
    'internal-critical': ':warning:',
    'internal-info': ':information_source:',
    'user-info': ':information_desk_person:',
  };

  protected boldWrapper = (str: string) => `**${str}**`;

  protected sendMessage = async (
    type: NotificationType,
    message: SendMessageParams
  ) => {
    const { text } = message;
    const chatId = this.chatIDs[type];

    const url = `https://api.telegram.org/bot${process.env.NEXT_TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    return {
      text: await response.text(),
    };
  };
}

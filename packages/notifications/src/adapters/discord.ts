import {
  type IAdapter,
  type NotificationType,
  type SendMessageParams,
} from '../types';
import { Adapter } from './adapter';

const { NEXT_DISCORD_EVENT_WEBHOOK = '', NEXT_DISCORD_WARNINGS_WEBHOOK = '' } =
  process.env;

// TODO: remove ignore once we use this
// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/ban-ts-comment
// @ts-ignore
class DiscordAdapter extends Adapter implements IAdapter {
  private getWebhookUrl = (type: NotificationType): string | undefined => {
    switch (type) {
      case 'error':
      case 'internal-critical':
        return NEXT_DISCORD_WARNINGS_WEBHOOK;
      case 'internal-info':
      case 'user-info':
        return NEXT_DISCORD_EVENT_WEBHOOK;
    }
  };

  protected emojies = {
    error:
      '[![Error](https://cdn3.emoji.gg/emojis/4934-error.png)](https://emoji.gg/emoji/4934-error)',
    'internal-critical':
      '[![warning](https://cdn3.emoji.gg/emojis/2109-warning.png)](https://emoji.gg/emoji/2109-warning)',
    'internal-info':
      '[![info](https://cdn3.emoji.gg/emojis/3228-info.png)](https://emoji.gg/emoji/3228-info)',
    'user-info':
      '[![Mario_Upset](https://cdn3.emoji.gg/emojis/1127-mario-upset.png)](https://emoji.gg/emoji/1127-mario-upset)',
  };

  protected boldWrapper = (str: string) => `**${str}**`;

  protected sendMessage = async (
    type: NotificationType,
    message: SendMessageParams
  ) => {
    const { text } = message;
    const webhookUrl = this.getWebhookUrl(type);
    if (!webhookUrl) {
      throw new Error(`Slack webhook url is not defined!`);
    }
    const response = await fetch(webhookUrl, {
      body: JSON.stringify({ content: text }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    return {
      text: await response.text(),
    };
  };
}

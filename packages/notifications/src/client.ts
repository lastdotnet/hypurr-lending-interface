import {
  // DiscordAdapter,
  SlackAdapter,
  TelegramAdapter,
} from './adapters'
import type { Adapters, ErrorPayload, EventPayload, NotificationChannel, NotificationMessage } from './types'

export class NotificationClient {
  private static instance: NotificationClient = new NotificationClient()
  private adapters: Adapters = {} as Adapters

  private getAdapterByChannel = (channel: NotificationChannel) => {
    switch (channel) {
      // case 'discord':
      //   return new DiscordAdapter();
      case 'telegram':
        return new TelegramAdapter()
      default:
        return new SlackAdapter()
    }
  }

  private getAdapter = (channel: NotificationChannel) => {
    if (!this.adapters[channel]) {
      this.adapters[channel] = this.getAdapterByChannel(channel)
    }

    return this.adapters[channel]
  }

  public static send = async (message: NotificationMessage): Promise<boolean> => {
    const { channel, payload, type } = message

    const adapter = this.instance.getAdapter(channel)

    switch (type) {
      case 'user-info':
        return adapter.sendUserInfo(payload as EventPayload)
      case 'internal-info':
        return adapter.sendInternalInfo(payload as EventPayload)
      case 'internal-critical':
        return adapter.sendCriticalInfo(payload as ErrorPayload)
      case 'error':
        return adapter.sendError(payload as ErrorPayload)
    }
  }
}

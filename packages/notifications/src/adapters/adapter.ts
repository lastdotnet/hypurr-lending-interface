import type {
  ErrorPayload,
  EventPayload,
  IAdapter,
  NotificationType,
  NotificationValues,
  SendMessageParams,
  SendMessageResult,
} from '../types'

export abstract class Adapter implements IAdapter {
  protected abstract sendMessage(type: NotificationType, message: SendMessageParams): Promise<SendMessageResult>
  protected abstract emojies: { [type in NotificationType]: string }
  protected abstract boldWrapper(str: string): string

  private getText = (text: string | undefined): string => (text ? `\n${text}` : '')

  private getEmojiByType = (type: NotificationType) => this.emojies[type]

  private getFormattedValues = (values?: NotificationValues): string =>
    values
      ? Object.entries(values).reduce(
          (formattedValues, [name, value]) => `${formattedValues}\n${this.boldWrapper(name)}: ${value}\n`,
          '',
        )
      : ''

  private getFormattedText = (type: NotificationType, payload: EventPayload): string => {
    const { description = '', text, title, values } = payload
    return `${this.getEmojiByType(type)} ${this.boldWrapper(`${title}:`)} ${description}${this.getText(text)}${this.getFormattedValues(values as unknown as NotificationValues)}`
  }

  public async sendCriticalInfo(payload: EventPayload): Promise<boolean> {
    await this.sendMessage('internal-critical', {
      text: this.getFormattedText('internal-critical', payload),
    })

    return true
  }

  public async sendError(payload: ErrorPayload): Promise<boolean> {
    const { code, text, trace } = payload
    const attachments =
      trace === undefined
        ? []
        : [
            {
              color: 'danger',
              pretext: code ? `\`\`\`${code}\`\`\`` : undefined,
              text: trace,
              title: text,
            },
          ]

    const message = {
      attachments,
      text: this.getFormattedText('error', payload),
    }
    await this.sendMessage('error', message)

    return true
  }

  public async sendInternalInfo(payload: EventPayload): Promise<boolean> {
    await this.sendMessage('internal-info', {
      text: this.getFormattedText('internal-info', payload),
    })

    return true
  }

  public async sendUserInfo(payload: EventPayload): Promise<boolean> {
    await this.sendMessage('user-info', {
      text: this.getFormattedText('user-info', payload),
    })

    return true
  }
}

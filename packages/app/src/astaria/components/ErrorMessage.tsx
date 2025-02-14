import { ScrollArea } from '@/astaria/components/ScrollArea'

const MAX_LENGTH = 150

export const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) {
    return null
  }
  if (message.length > MAX_LENGTH) {
    return <ScrollArea className="h-32">{message}</ScrollArea>
  }
  return message
}

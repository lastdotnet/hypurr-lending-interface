import { Button } from '@/ui/atoms/button/Button'
import { Typography } from '@/ui/atoms/typography/Typography'
import { ErrorLayout } from '@/ui/layouts/ErrorLayout'

export interface ErrorViewProps {
  onReload: () => void
  fullScreen?: boolean
  errorMessage?: string
}

export function ErrorView({ onReload, fullScreen, errorMessage }: ErrorViewProps) {
  const message = errorMessage?.includes('An unknown RPC error occurred')
    ? 'The Hyperliquid RPC might be temporarily unavailable. Please try again later.'
    : 'Something went wrong'
  return (
    <ErrorLayout fullScreen={fullScreen}>
      <Typography variant="h1">Oops</Typography>
      <Typography variant="h3">{message}</Typography>
      <Button onClick={onReload}>Reload</Button>
    </ErrorLayout>
  )
}

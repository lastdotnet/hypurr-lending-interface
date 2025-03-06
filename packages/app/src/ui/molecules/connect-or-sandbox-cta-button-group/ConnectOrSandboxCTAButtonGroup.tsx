import { Button } from '@/ui/atoms/button/Button'
import { cn } from '@/ui/utils/style'

export interface ConnectOrSandboxCTAButtonGroupProps {
  header?: string
  buttonText: string
  action: () => void
  className?: string
}

export function ConnectOrSandboxCTAButtonGroup({
  header,
  action,
  buttonText,
  className,
}: ConnectOrSandboxCTAButtonGroupProps) {
  return (
    <div className={cn('flex w-full flex-col gap-6', className)}>
      <div className="flex flex-col gap-3">
        <h4 className="text-center font-semibold text-base sm:text-xl">{header}</h4>
        <Button onClick={action} rounded="full">
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

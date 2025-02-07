import { useEffect, useCallback, useRef } from 'react'
import { WidgetInstance } from 'friendly-challenge'

function FriendlyCaptcha({
  setCaptchaSolution,
}: {
  setCaptchaSolution: (solution: string) => void
}) {
  const container = useRef<HTMLDivElement>(null)
  const widget = useRef<WidgetInstance | null>(null)

  const doneCallback = useCallback(
    (solution: string) => {
      setCaptchaSolution(solution)
    },
    [setCaptchaSolution],
  )

  useEffect(() => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        startMode: 'none',
        doneCallback,
      })
    }

    return () => {
      if (widget.current !== undefined) widget.current?.reset()
    }
  }, [doneCallback])

  return (
    <div
      ref={container}
      className="frc-captcha dark"
      data-sitekey={process.env.NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITE_KEY}
      data-theme="dark"
    />
  )
}

export default FriendlyCaptcha

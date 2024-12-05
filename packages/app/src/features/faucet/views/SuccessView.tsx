import { paths } from '@/config/paths'
import { LinkButton } from '@/ui/atoms/button/Button'

export function SuccessView() {
  return (
    <div>
      <p className="mb-2">You've received 10 USDC and 10 sUSDe 🎉</p>
      <LinkButton to={paths.myPortfolio}>Go to portfolio</LinkButton>
    </div>
  )
}

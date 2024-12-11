import Lottie from 'lottie-react'
import catSpinnerAnim from './cat-spinner.json'
import { cn } from '@/ui/utils/style'

function CatSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('w-24', className)}>
      <Lottie animationData={catSpinnerAnim} loop={true} />
    </div>
  )
}

export { CatSpinner }

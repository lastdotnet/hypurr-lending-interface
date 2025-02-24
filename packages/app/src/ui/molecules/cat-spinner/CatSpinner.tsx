import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import { cn } from '@/ui/utils/style'
import catSpinnerAnim from './cat-spinner.json'

function CatSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('w-24', className)}>
      <Lottie animationData={catSpinnerAnim} loop={true} />
    </div>
  )
}

export { CatSpinner }

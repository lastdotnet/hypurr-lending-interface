import { Button } from '@/ui/atoms/button/Button'
import { SettingsIcon } from 'lucide-react'

export function SettingsPopOver() {
  return (
    <Button
      className="h-[30px] w-[30px] rounded-full border-white/10 bg-white/10 p-0 text-white/70"
      prefixIcon={<SettingsIcon size={18} />}
    />
  )
}

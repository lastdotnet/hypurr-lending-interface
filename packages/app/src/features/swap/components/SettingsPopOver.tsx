import { Button } from '@/ui/atoms/button/Button'
import { SettingsIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/ui/atoms/dropdown/DropdownMenu'

export function SettingsPopOver() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-[30px] w-[30px] rounded-full border-white/10 bg-white/10 p-0 text-white/70"
          prefixIcon={<SettingsIcon size={18} />}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2 border border-white/20 p-0">
        <div className="px-4 py-2 text-sm">
          <p>Settings</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

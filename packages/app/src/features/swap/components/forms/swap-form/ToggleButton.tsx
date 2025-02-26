import { ArrowUpDown } from 'lucide-react'

export function ToggleButton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <button className="block rounded-lg border border-panel-border bg-[#0c0c0e] p-4 text-prompt-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
        <ArrowUpDown className="h-5 w-5" />
      </button>
    </div>
  )
}

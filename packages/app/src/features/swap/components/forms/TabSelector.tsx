import { cn } from '@/ui/utils/style'
import { Tab } from '../SwapPanel'

interface TabSelectorProps {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

function getTabValues() {
  return Object.values(Tab)
}

export function TabSelector({ activeTab, setActiveTab }: TabSelectorProps) {
  return (
    <div className="flex gap-4">
      {getTabValues().map((tab) => (
        <button
          key={tab}
          className={cn(
            'border-transparent border-b-2 pb-4 text-white/50 transition-colors disabled:pointer-events-none hover:text-white',
            {
              'border-primary text-primary': activeTab === tab,
            },
          )}
          onClick={() => setActiveTab(tab)}
          disabled={activeTab === tab}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

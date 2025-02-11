import { assets } from '@/ui/assets'
import { focusVariants } from './nav-link/NavLink'
import { cn } from '@/ui/utils/style'

const socialLinks = [
  {
    href: 'https://t.me/hypurr_fi',
    icon: <img src={assets.socialLogos.x} alt="X" />,
    label: 'X',
  },
  {
    href: 'https://t.me/hypurr_fi',
    icon: <img src={assets.socialLogos.telegram} alt="Telegram" />,
    label: 'Telegram',
  },

  {
    href: 'https://t.me/hypurr_fi',
    icon: <img src={assets.socialLogos.github} alt="Github" />,
    label: 'Github',
  },
]

const infoLinks = [
  {
    href: 'https://t.me/hypurr_fi',
    label: 'Dev docs',
  },
  {
    href: 'https://t.me/hypurr_fi',
    label: 'Audits',
  },
  {
    href: 'https://t.me/hypurr_fi',
    label: 'Privacy',
  },
]

export function FooterLinks() {
  return (
    <div className="pb-4">
      <div className="mb-4 flex items-center gap-8">
        {socialLinks.map((link) => (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            key={link.label}
            className={cn(focusVariants(), 'opacity-30 transition-opacity hover:opacity-70')}
          >
            {link.icon}
          </a>
        ))}
      </div>
      <div className="flex gap-5">
        {infoLinks.map((link) => (
          <a
            href={link.href}
            key={link.label}
            className={cn(focusVariants(), 'text-sm text-white/30 transition-colors hover:text-white/70')}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}

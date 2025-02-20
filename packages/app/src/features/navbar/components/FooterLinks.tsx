import { assets } from '@/ui/assets'
import { focusVariants } from './nav-link/NavLink'
import { cn } from '@/ui/utils/style'
import { links } from '@/ui/constants/links'
import { Button } from '@/ui/atoms/button/Button'
import { MailIcon } from 'lucide-react'

const socialLinks = [
  {
    href: links.social.x,
    icon: <img src={assets.socialLogos.x} alt="X" />,
  },
  {
    href: links.social.telegram,
    icon: <img src={assets.socialLogos.telegram} alt="Telegram" />,
  },

  {
    href: links.social.github,
    icon: <img src={assets.socialLogos.github} alt="Github" />,
  },
]

const infoLinks = [
  {
    href: links.docs.home,
    label: 'Dev docs',
  },
  // {
  //   href: links.security,
  //   label: 'Security',
  // },
  // {
  //   href: links.privacy,
  //   label: 'Privacy',
  // },
]

export function FooterLinks({ mobileMenuCollapsed }: { mobileMenuCollapsed: boolean }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 pb-4 xl:items-start xl:pt-2',
        mobileMenuCollapsed && 'hidden xl:flex',
      )}
    >
      <div className="flex items-center justify-center gap-5 xl:justify-start xl:gap-8">
        {socialLinks.map((link) => (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            key={link.href}
            className={cn(focusVariants(), 'p-3 opacity-30 transition-opacity xl:p-0 hover:opacity-100')}
          >
            {link.icon}
          </a>
        ))}
      </div>

      <Button variant="ghost" className="flex gap-2 px-3 py-5 text-base xl:h-auto xl:py-2 xl:text-xs">
        <MailIcon className="h-4 w-4" /> Signup for updates
      </Button>

      <div className="flex justify-center gap-4 xl:justify-start xl:gap-2">
        {infoLinks.map((link, i) => (
          <a
            href={link.href}
            key={link.label}
            target="_blank"
            rel="noopener"
            className={cn(
              focusVariants(),
              'rounded-none text-sm text-white/30 transition-colors hover:text-white',
              i !== 0 && 'border-white/10 border-l pl-4 xl:pl-2',
            )}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}

import { assets } from '@/ui/assets'
import { focusVariants } from './nav-link/NavLink'
import { cn } from '@/ui/utils/style'
import { links } from '@/ui/constants/links'

const socialLinks = [
  {
    href: links.social.x,
    icon: <img src={assets.socialLogos.x} alt="X" />,
    label: 'X',
  },
  {
    href: links.social.telegram,
    icon: <img src={assets.socialLogos.telegram} alt="Telegram" />,
    label: 'Telegram',
  },

  {
    href: links.social.github,
    icon: <img src={assets.socialLogos.github} alt="Github" />,
    label: 'Github',
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
    <div className={cn('pb-4 xl:pt-2', mobileMenuCollapsed && 'hidden xl:block')}>
      <div className="mb-4 flex items-center justify-center gap-5 xl:justify-start xl:gap-8">
        {socialLinks.map((link) => (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            key={link.label}
            className={cn(focusVariants(), 'p-3 opacity-30 transition-opacity xl:p-0 hover:opacity-100')}
          >
            {link.icon}
          </a>
        ))}
      </div>
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

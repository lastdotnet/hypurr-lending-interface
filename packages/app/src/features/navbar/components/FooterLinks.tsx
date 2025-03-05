import { assets } from '@/ui/assets'
import { focusVariants } from './nav-link/NavLink'
import { cn } from '@/ui/utils/style'
import { links } from '@/ui/constants/links'
import { NavBarDialogue } from '@/features/newsletter/NavBarDialogue'

const socialLinks = [
  {
    href: links.social.x,
    icon: <assets.socialLogos.x className="h-4 w-4 text-white" />,
  },
  {
    href: links.social.telegram,
    icon: <assets.socialLogos.telegram className="h-5 w-5 text-white" />,
  },
  {
    href: links.social.github,
    icon: <assets.socialLogos.github className="h-5 w-5 text-white" />,
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

      <NavBarDialogue />

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

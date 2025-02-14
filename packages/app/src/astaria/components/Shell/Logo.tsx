'use client'

import { IconDownload } from '@tabler/icons-react'
import Image from 'next/image'

import AstariaLogo from '@assets/logo/logo-black.svg?url'
import AstariaWordmark from '@assets/logo/wordmark-black.svg?url'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/astaria/components/ContentMenu'
import { NavButton } from '@/astaria/components/Shell/NavButton'
import { useToast } from '@/astaria/components/Toast/useToast'
import { ROUTES } from '@/astaria/constants/routes'

const logoSVGString =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1780 1711"><path d="M233.2 925.993h466.744L453.695 1191.04l79.336 73.73 248.255-267.208v713.348l108.257.09V995.75L1383 1350.83l63.18-87.87-468.293-336.967h313.173l1.63-108.266H970.451l399.179-419.056-76.79-76.423-403.297 423.386V47.937l-108.257-.09v699.011L431.061 350.321l-81.112 71.634 349.545 395.772H234.449zm-116.041 0 1.252-108.266H0l.088 108.266zM1372.71 238.406l76.78 76.424 76.19-79.98-76.78-76.424zm156.05-163.818 76.78 76.423 72.68-76.3L1599.81 0zm-106.07 743.139-1.63 108.266h122.8V817.727zm251.16 0v108.266H1780l-.09-108.266z"/></svg>'
const WorkmarkSVGString =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="312 270.49 3409 601.31"><path d="M393.977 595.916h164.067l-86.56 93.147 27.888 25.911 87.265-93.906v250.698l38.054.031V620.431l173.456 124.787 22.208-30.878-164.61-118.424H765.83l.572-38.049H653.131l140.316-147.272-26.99-26.858-141.766 148.794V287.334l-38.054-.032v245.659L463.528 393.603l-28.512 25.175 122.87 139.089h-163.47zm-40.79 0 .44-38.049h-41.623l.031 38.049zm441.344-241.644 26.989 26.858 26.781-28.108-26.99-26.858zm54.853-57.572 26.99 26.858 25.548-26.815-27.563-26.256zM812.1 557.867l-.572 38.049h43.166v-38.049zm88.286 0v38.049h37.313l-.032-38.049zm1271.084-93.621V426.63h-70.01V306.654h-39.45V426.63h-44.37v37.616h44.37v366.258h39.45V464.246zm-858.53-46.525c63.11 0 118.34 24.747 156.79 79.191V426.63h39.45v403.874h-39.45v-72.262c-40.43 62.363-104.53 83.151-156.79 83.151-105.52 0-196.24-80.181-196.24-212.826 0-124.726 78.89-210.846 196.24-210.846m158.77 207.876c0-119.776-87.77-170.26-156.8-170.26-79.87 0-156.79 60.383-156.79 170.26 0 91.07 56.21 178.18 157.78 178.18 100.58 0 155.81-85.13 155.81-178.18m318.15-207.876c47.33 0 86.78 21.777 105.51 65.332l-33.53 17.818c-13.8-31.676-41.41-45.534-70.01-45.534-45.36 0-68.04 34.646-68.04 64.342 0 39.596 31.55 52.464 71 68.302 5.13 2.011 10.22 3.943 15.24 5.849l.01.004.01.003c34.5 13.103 65.9 25.024 88.28 53.538 16.77 20.787 20.71 42.565 20.71 65.332 0 92.06-69.03 128.686-131.16 128.686-67.05 0-122.28-39.596-139.04-106.908l38.46-11.879c13.8 53.454 56.21 81.171 100.58 81.171 51.28 0 89.74-36.626 89.74-89.09 0-45.535-28.6-62.363-89.74-87.11-40.43-16.828-70.01-29.697-87.76-53.454-8.88-11.879-17.75-28.707-17.75-52.464 0-61.373 46.35-103.938 107.49-103.938m670.88 0c63.11 0 118.34 24.747 156.79 79.191V426.63h39.45v403.874h-39.45v-72.262c-40.43 62.363-104.52 83.151-156.79 83.151-105.52 0-196.24-80.181-196.24-212.826 0-124.726 78.89-210.846 196.24-210.846m158.77 207.876c0-119.776-87.77-170.26-156.8-170.26-79.87 0-156.79 60.383-156.79 170.26 0 91.07 56.21 178.18 157.78 178.18 100.58 0 155.81-85.13 155.81-178.18m218.55 204.907h39.44V613.718c0-50.484.99-158.381 81.85-158.381 17.75 0 25.64 4.949 29.59 7.919l19.72-35.636c-14.79-7.919-31.56-9.899-42.41-9.899-43.38 0-73.95 26.727-88.75 61.373V426.63h-39.44zm843.49-333.592c-38.46-54.444-93.68-79.191-156.79-79.191-117.35 0-196.24 86.12-196.24 210.846 0 132.645 90.72 212.826 196.24 212.826 52.26 0 116.36-20.788 156.79-83.151v72.262H3721V426.63h-39.45zm-154.82-41.575c69.03 0 156.8 50.484 156.8 170.26 0 93.05-55.23 178.18-155.81 178.18-101.57 0-157.78-87.11-157.78-178.18 0-109.877 76.91-170.26 156.79-170.26M3131.6 827.685V423.334h41.13v404.351zm0-484.279v-41.121h47.98v41.121z"/></svg>'

export const Logo = () => {
  const { toast } = useToast()
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <NavButton href={ROUTES.HOME}>
          <Image alt="Astaria logo" className="w-24 md:w-28" src={AstariaWordmark} />
        </NavButton>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className="flex items-center gap-2"
          onClick={() => {
            navigator.clipboard.writeText(logoSVGString)
            toast({
              description: 'Logo SVG copied to your clipboard',
              title: 'Logo copied',
            })
          }}
        >
          <Image alt="Astaria logo" className="w-6" src={AstariaLogo} />
          <span>Copy logo as SVG</span>
        </ContextMenuItem>
        <ContextMenuItem
          className="flex items-center gap-2"
          onClick={() => {
            navigator.clipboard.writeText(WorkmarkSVGString)
            toast({
              description: 'Wordmark SVG copied to your clipboard',
              title: 'Wordmark copied',
            })
          }}
        >
          <Image alt="Astaria logo" className="w-6" src={AstariaWordmark} />
          <span>Copy wordmark as SVG</span>
        </ContextMenuItem>
        <ContextMenuItem asChild className="flex items-center gap-2">
          <a href="/assets/astaria-brand-assets.zip">
            <IconDownload className="w-6" />
            <span>Download brand assets</span>
          </a>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

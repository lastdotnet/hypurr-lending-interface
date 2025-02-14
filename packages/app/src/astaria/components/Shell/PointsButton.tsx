'use client'

import { IconMeteor } from '@tabler/icons-react'
import Link from 'next/link'

import { type ButtonProps } from '@/astaria/components/Button'
import { Button } from '@/astaria/components/Button'
import { Connected } from '@/astaria/components/Connected'
import { UserPoints } from '@/astaria/components/UserPoints'
import { ROUTES } from '@/astaria/constants/routes'

export const PointsButton = ({ ...rest }: Omit<ButtonProps, 'children'>) => (
  <Connected
    connectedComponent={
      <Button {...rest} asChild rounded={false}>
        <Link href={ROUTES.POINTS_HISTORY}>
          <div className="flex items-center gap-1">
            <IconMeteor className="h-3.5 w-3.5" />
            <UserPoints short />
          </div>
        </Link>
      </Button>
    }
  />
)

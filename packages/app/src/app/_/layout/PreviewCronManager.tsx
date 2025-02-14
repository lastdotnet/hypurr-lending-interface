'use client'

import { TooltipArrow } from '@/astaria/radix-ui/react-tooltip'
import { IconCheck, IconReload, IconX } from '@/astaria/tabler/icons-react'
import { useMutation } from '@tanstack/react-query'

import clsx from 'clsx'

import { Button } from '@/astaria/components/Button'
import { useToast } from '@/astaria/components/Toast/useToast'
import { Tooltip } from '@/astaria/components/Tooltip'
import { ENV } from '@/astaria/constants/environment'

import vercelJSON from '../../../../vercel.json'

const DELAY = 2000

const PreviewCronManagerInner = () => {
  const { toast } = useToast()

  const { isPending, mutate: fetchCrons } = useMutation({
    mutationFn: async () => {
      try {
        for (const cron of vercelJSON.crons) {
          // eslint-disable-next-line no-console
          console.log('Running cron: ', cron.path)

          await fetch(cron.path)
          await new Promise((resolve) => setTimeout(resolve, DELAY))
        }
      } catch (error) {
        toast({
          description: 'Cron failed to execute, see console for details.',
          icon: <IconX />,
          title: 'Cron jobs failed',
        })

        // eslint-disable-next-line no-console
        console.log(error)
      }

      toast({
        description: `Ran ${vercelJSON.crons.length} cron jobs successfully!`,
        icon: <IconCheck />,
        title: 'Cron jobs executed',
      })

      return true
    },
  })

  return (
    <Tooltip
      content={
        <>
          <div className="text-center text-xs">{isPending ? 'Running cron jobs, please wait…' : 'Run cron jobs'}</div>
          <TooltipArrow />
        </>
      }
      delayDuration={200}
      side="right"
      trigger={
        <Button
          className="fixed bottom-1 left-1 z-40"
          disabled={isPending}
          emphasis="medium"
          onClick={() => fetchCrons()}
          size="icon"
        >
          <IconReload className={clsx({ 'animate-spin': isPending })} stroke={2} />
        </Button>
      }
      triggerAsChild
    />
  )
}

/**
 * This component hits cron endpoints in preview and development environments
 */
export const PreviewCronManager = () => {
  if (ENV.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
    return <PreviewCronManagerInner />
  }

  return null
}

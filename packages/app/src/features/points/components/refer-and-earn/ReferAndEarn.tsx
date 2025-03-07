import { Button } from '@/ui/atoms/button/Button'
import { cn } from '@/ui/utils/style'
import { useEffect, useState } from 'react'
import useCreateReferral from '../../logic/useCreateReferral'

export function CopyLinkButton({ link }: { link: string }) {
  const [isCopied, setIsCopied] = useState(false)

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(link)
      setIsCopied(true)
    } catch (error) {
      console.error('Failed to copy the link: ', error)
    }
  }

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isCopied])

  return isCopied ? (
    <p className="h-10 animate-fade-in content-center text-primary-bg text-sm">Link copied to clipboard!</p>
  ) : (
    <div className="flex flex-row gap-x-2">
      <div
        className={cn(
          'flex h-10 w-full flex-row rounded-sm border bg-input-background py-2 pr-2 pl-4 text-sm opacity-50',
        )}
      >
        {link}
      </div>
      <Button className="w-32 font-bold text-xs" onClick={copyToClipboard}>
        Copy referral link
      </Button>
    </div>
  )
}

export function ReferAndEarn() {
  const [referralCode, setReferralCode] = useState<string>('REFYWR6x')
  const createReferralMutation = useCreateReferral()

  const handleCreateReferral = async () => {
    try {
      const result = await createReferralMutation.mutateAsync({
        referrer_id: 'user-id',
      })

      if (result.code) {
        setReferralCode(result.code)
      }
    } catch (error) {
      console.error('Failed to create referral:', error)
    }
  }

  return (
    <>
      {!createReferralMutation.isSuccess ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-y-2">
            <p className=" text-base">Refer and earn</p>
            <p className="text-white/50 text-xs">
              Copy your unique link below, share it on socials and with friends. Get extra points from their activity!
            </p>
          </div>
          <CopyLinkButton link={`app.hypurr.fi/${referralCode}`} />
        </div>
      ) : (
        <Button
          className="w-full font-bold text-xs"
          onClick={handleCreateReferral}
          disabled={createReferralMutation.isPending}
        >
          {createReferralMutation.isPending ? 'Creating...' : 'Create Referral'}
        </Button>
      )}
    </>
  )
}

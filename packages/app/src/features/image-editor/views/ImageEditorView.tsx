import { useState } from 'react'
import { ImageEditor } from '../components/ImageEditor'
import { Button } from '@/ui/atoms/button/Button'

interface Props {
  points: string
}

export function ImageEditorView({ points }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  function handleImageGenerated(imageDataUrl: string) {
    setImageUrl(imageDataUrl)
  }

  return (
    <div>
      <div className="w-full max-w-4xl">
        <ImageEditor imageUrl="/hypurr-point.png" text={points} onImageGenerated={handleImageGenerated} />
      </div>

      {imageUrl && (
        <div className="flex flex-col items-center gap-5">
          <img src={imageUrl} alt="Generated image" className="max-w-full rounded-lg" />
          <p className="text-white/50 text-xs">
            Referral copy goes here referral copy goes here referral copy goes here lorem ipsum
          </p>
          <Button
            className="w-full font-bold text-xs"
            onClick={() => {
              const link = document.createElement('a')
              link.href = imageUrl
              link.download = 'generated-image.png'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
          >
            Share image
          </Button>
        </div>
      )}
    </div>
  )
}

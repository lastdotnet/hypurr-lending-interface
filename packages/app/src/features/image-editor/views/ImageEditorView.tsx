import { useState } from 'react'
import { ImageEditor } from '../components/ImageEditor'
import { Button } from '@/ui/atoms/button/Button'

type Props = {
  points: string
}

export function ImageEditorView({ points }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleImageGenerated = (imageDataUrl: string) => {
    setImageUrl(imageDataUrl)
  }

  return (
    <div>
      <div className="w-full max-w-4xl">
        <ImageEditor imageUrl="/hypurr-point.png" text={points} onImageGenerated={handleImageGenerated} />
      </div>

      {imageUrl && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <img src={imageUrl} alt="Generated image" className="max-w-full rounded-lg" />
          <Button
            className="w-full"
            onClick={() => {
              const link = document.createElement('a')
              link.href = imageUrl
              link.download = 'generated-image.png'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
          >
            Share Image
          </Button>
        </div>
      )}
    </div>
  )
}

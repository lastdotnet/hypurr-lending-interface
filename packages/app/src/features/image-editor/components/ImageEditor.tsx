import { useRef, useEffect } from 'react'

interface ImageEditorProps {
  imageUrl: string
  text: string
  onImageGenerated: (imageDataUrl: string) => void
}

export function ImageEditor({ imageUrl, text, onImageGenerated }: ImageEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.src = imageUrl
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 0)

      const textY = canvas.height / 1.6

      ctx.font = 'bold 64px Manrope'
      ctx.fillStyle = 'white'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${text}`, 40, textY)

      const mainTextWidth = ctx.measureText(`${text}`).width
      ctx.font = 'bold 32px Manrope'
      const hpX = 40 + mainTextWidth + 10
      ctx.fillText('HP', hpX, textY + 8)

      const imageDataUrl = canvas.toDataURL('image/png')
      onImageGenerated(imageDataUrl)
    }
  }, [imageUrl, text, onImageGenerated])

  return <canvas ref={canvasRef} className="hidden" />
}

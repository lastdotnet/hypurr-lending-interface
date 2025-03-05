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

      // Draw text
      ctx.font = '64px Arial'
      ctx.fillStyle = 'white'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${text} pts`, 40, canvas.height / 1.6)

      const imageDataUrl = canvas.toDataURL('image/png')
      onImageGenerated(imageDataUrl)
    }
  }, [imageUrl, text, onImageGenerated])

  return <canvas ref={canvasRef} className="hidden" />
}

import { ImageEditorView } from '@/features/image-editor/views/ImageEditorView'
import { Panel } from '@/ui/atoms/panel/Panel'

export function ImageSharePanel() {
  return (
    <Panel.Wrapper className="flex flex-1 flex-col items-start gap-2 p-6">
      <ImageEditorView points="1000" />
    </Panel.Wrapper>
  )
}

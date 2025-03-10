import { ImageEditorView } from '@/features/image-editor/views/ImageEditorView'
import { Panel } from '@/ui/atoms/panel/Panel'
import { ReferAndEarn } from '../refer-and-earn/ReferAndEarn'
import { UserDetails } from '../../logic/useGetUserDetails'

interface Props {
  userDetails?: UserDetails
  isLoading?: boolean
}

export function ImageSharePanel({ userDetails }: Props) {
  return (
    <Panel.Wrapper className="flex flex-1 flex-col items-center gap-5 p-6 lg:items-start">
      <ImageEditorView points={userDetails?.points?.total_points.toString() || '0'} />
      <ReferAndEarn />
    </Panel.Wrapper>
  )
}

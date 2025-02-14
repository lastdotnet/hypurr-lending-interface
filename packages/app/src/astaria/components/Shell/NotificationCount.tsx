import { SkeletonNumber } from '@/astaria/components/SkeletonNumber'

type NotificationCountProps = {
  isSkeleton: boolean
  notificationCount: number
}

export const NotificationCount = ({ isSkeleton, notificationCount }: NotificationCountProps) =>
  isSkeleton ? <SkeletonNumber /> : notificationCount

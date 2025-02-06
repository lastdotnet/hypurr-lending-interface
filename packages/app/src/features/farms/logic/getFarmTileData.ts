import { paths } from '@/config/paths'
import { Farm } from '@/domain/farms/types'
import { FarmTileProps } from '../components/farm-tile/FarmTile'

export interface GetFarmTileDataParams {
  farm: Farm
  chainId: number
}

export function getFarmTileProps({ farm, chainId }: GetFarmTileDataParams): FarmTileProps {
  return {
    apy: farm.apy,
    detailsLink: paths.farmDetails.replace(':chainId', chainId.toString()).replace(':address', farm.address),
    entryAssetsGroup: farm.entryAssetsGroup,
    rewardToken: farm.rewardToken,
    stakingToken: farm.stakingToken,
    staked: farm.staked,
    isPointsFarm: farm.rewardType === 'points',
  }
}

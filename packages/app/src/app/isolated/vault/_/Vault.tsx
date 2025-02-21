import { HasVaults } from '@/app/isolated/vault/_/HasVaults'
import { NoVaults } from '@/app/isolated/vault/_/NoVaults'

export const Vault = () => (
  <>
    <NoVaults />
    <HasVaults />
  </>
)

import { assert } from '@/utils/assert'

export function clientEnv(key: string): string {
  const value = process.env[key]
  assert(value, `${key} env not defined`)

  return value
}

clientEnv.boolean = (key: string): boolean => {
  const value = process.env[key]
  return value === '1'
}

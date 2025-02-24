const SALT_LENGTH = 32

export const generateSalt = () => {
  const buffer = new Uint8Array(SALT_LENGTH)
  return crypto.getRandomValues(buffer)
}

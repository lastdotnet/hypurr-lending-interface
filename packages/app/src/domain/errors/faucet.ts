export class FaucetError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'FaucetError'
  }
}

export class FaucetTimeoutError extends FaucetError {
  constructor(message?: string) {
    super(message)
    this.name = 'FaucetTimeoutError'
  }
}

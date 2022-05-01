export default class InvalidException extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    this.status = 400

    Error.captureStackTrace(this, this.constructor)
  }
}

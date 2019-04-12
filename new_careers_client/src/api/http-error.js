export default class HttpError extends Error {
  constructor(resp) {
    super(resp.statusText);
    this.response = resp;
    this.status = resp.status;
  }
}

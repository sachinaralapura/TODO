export class User {
  constructor(
    public email: string,
    public password: string,
    public userName?: string
  ) {}
}

export interface AuthResponse {
  token: string;
  _id: string;
  email: string;
}

export class CurrentUser {
  constructor(
    public email: string,
    public userId: string,
    private _token: string
  ) {}
  get token() {
    return this._token;
  }
}

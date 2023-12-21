export class User {
  private _id: number;
  private _username: string;
  private _password: string;

  constructor(id: number, username: string, password: string) {
    this._id = id;
    this._username = username;
    this._password = password;
  }

  get id() {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get username() {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password() {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  toObject() {
    return {
      id: this._id,
      username: this._username,
    };
  }

  static fromObject(userObject: {
    id: number;
    username: string;
    password: string;
  }) {
    return new User(userObject.id, userObject.username, userObject.password);
  }
}

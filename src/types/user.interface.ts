export interface User {
  token: string;
}

export interface UserToken {
  name: string;
  email: string;
  image: string;
  accessToken: string;
}

export interface UserSession extends UserToken {}

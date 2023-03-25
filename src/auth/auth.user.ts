export interface GithubAuthUser {
  id: string;
  username: string;
}

export interface DecodedAuthUser {
  sub: string;
  username: string;
}

export type User = {
  isAuth: boolean;
  id: number;
  accessToken: string;
  exp: number | null;
};

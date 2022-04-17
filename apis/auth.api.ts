import { wrapFetch, apiRoute } from 'utils/config/api.config';

export type SignUpParamsType = {
  email: string;
  password: string;
};

export type SignUpDataType = {
  idToken: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
};

export const signUp = async ({ email, password }: SignUpParamsType) => {
  const data = await wrapFetch<SignUpDataType>(apiRoute.auth.signUp, 'POST', {
    email,
    password,
  });

  return data;
};

export type SignInParamsType = SignUpParamsType;

export type SignInDataType = {
  idToken: string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
  registered: boolean;
};

export const signIn = async ({ email, password }: SignInParamsType) => {
  const data = await wrapFetch<SignInDataType>(apiRoute.auth.signIn, 'POST', {
    email,
    password,
  });

  return data;
};

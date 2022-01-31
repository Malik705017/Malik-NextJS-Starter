import { wrapFetch, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from './api.config';

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
  const data = await wrapFetch<SignUpDataType>(SIGN_UP_ROUTE, 'POST', {
    email,
    password,
    returnSecureToken: true,
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
  const data = await wrapFetch<SignInDataType>(SIGN_IN_ROUTE, 'POST', {
    email,
    password,
    returnSecureToken: true,
  });

  return data;
};

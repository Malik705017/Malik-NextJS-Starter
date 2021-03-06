import { wrapFetch, apiRoute } from 'utils/config/api.config';

export type SignUpParamsType = {
  email: string;
  password: string;
};

export type SignUpDataType = {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
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
  expiresIn: string;
  localId: string;
  registered: boolean;
  userName: string;
};

export const signIn = async ({ email, password }: SignInParamsType) => {
  const data = await wrapFetch<SignInDataType>(apiRoute.auth.signIn, 'POST', {
    email,
    password,
  });

  return typeof data === 'string' ? data : { ...data, userName: email.split('@')[0] };
};

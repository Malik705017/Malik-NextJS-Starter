/* google firebase api config */
export const DOMAIN = process.env.AUTH_ENDPOINT;
export const APIKEY = process.env.AUTH_APIKEY;

/* google firebase api route */
export const googleApiRoute = {
  accounts: {
    signUp: `${DOMAIN}/accounts:signUp?key=${APIKEY}`,
    signIn: `${DOMAIN}/accounts:signInWithPassword?key=${APIKEY}`,
  },
};

/* nextjs api route */
export const apiRoute = {
  auth: {
    signUp: '/auth/signUp',
    signIn: '/auth/signIn',
  },
};

type FetchMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

type DefaultBody = {
  [key: string]: any;
};

/* customized fetch function */
export const wrapFetch: <Data>(
  route: string,
  method: FetchMethod,
  body?: DefaultBody
) => Promise<Data | string> = async (route, method, body) => {
  try {
    const response = await fetch(`/api${route}`, {
      method: method,
      ...(method === 'POST' && { body: JSON.stringify(body) }),
      ...(method === 'POST' && { headers: { 'Content-Type': 'application/json' } }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else return 'something went wrong';
  }
};

const APIKEY = process.env.NEXT_PUBLIC_AUTH_APIKEY;
const DOMAIN = process.env.NEXT_PUBLIC_AUTH_ENDPOINT;

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
    const response = await fetch(`${DOMAIN}/${route}?key=${APIKEY}`, {
      method: method,
      ...(method === 'POST' && { body: JSON.stringify(body) }),
      ...(method === 'POST' && { headers: { 'Content-Type': 'application/json' } }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error.message);
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else return 'something went wrong';
  }
};

/* api route */
export const SIGN_UP_ROUTE = 'accounts:signUp';
export const SIGN_IN_ROUTE = 'accounts:signInWithPassword';

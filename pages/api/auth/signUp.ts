// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { googleApiRoute } from 'utils/config/api.config';

/* POST api/auth/signUp */
const signUp = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;
    const response = await fetch(googleApiRoute.accounts.signUp, {
      method: 'POST',
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error.message);
    }

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: 'something went wrong' });
  }
};

export default signUp;

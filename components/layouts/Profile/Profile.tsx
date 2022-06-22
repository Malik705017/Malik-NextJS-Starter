import { FC, useEffect } from 'react';

import { useAuth } from 'models/auth';
import { useUIEffect } from 'models/uiEffect';

// import styles from './Profile.module.scss';

const Profile: FC = () => {
  const [
    {
      user: { name },
      authStatus: { isSignIn },
    },
  ] = useAuth();
  const [, { changeUIEffect }] = useUIEffect();

  useEffect(() => {
    if (!isSignIn) {
      changeUIEffect({ uiKey: 'modal', value: true });
    }
  }, [isSignIn]);

  return <>{isSignIn ? <p>Welcome {name}</p> : <p>You need to sign in first</p>}</>;
};

export default Profile;

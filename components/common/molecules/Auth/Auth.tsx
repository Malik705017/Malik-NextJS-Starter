import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../../../models/auth';
import { useModal } from '../../../../models/modal';
import { appRoute } from '../../../../utils/config/appRoute.config';

import styles from './Auth.module.scss';

type AuthProps = {};

type AuthState = 'signUp' | 'signIn';

const Auth: FC<AuthProps> = () => {
  const [{ email, password, isLoggedIn }, { signUp, signIn, changeInput, logOut }] = useAuth();
  const [{ isOpen }, { closeModal }] = useModal();
  const [authState, setAuthState] = useState<AuthState>('signUp');
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn && isOpen) {
      closeModal();
      /* change to profile page */
      router.push(appRoute.profile);
    }
  }, [isLoggedIn, isOpen]);

  return (
    <div className={styles.auth}>
      <button
        onClick={() => {
          changeInput({ type: 'email', value: '' });
          changeInput({ type: 'password', value: '' });
          setAuthState((prevState) => {
            if (prevState === 'signUp') return 'signIn';
            return 'signUp';
          });
        }}
      >
        change to {authState === 'signUp' ? 'signIn' : 'signUp'}
      </button>
      <input
        value={email}
        placeholder="email"
        onChange={(e) => changeInput({ type: 'email', value: e.target.value })}
      />
      <input
        value={password}
        placeholder="password"
        onChange={(e) => changeInput({ type: 'password', value: e.target.value })}
      />
      {authState === 'signUp' && <button onClick={signUp}>Sign Up</button>}
      {authState === 'signIn' && <button onClick={signIn}>Sign In</button>}
    </div>
  );
};

export default Auth;

import { FC, useState } from 'react';

import { useAuth } from '../../../../models/auth';

import styles from './Auth.module.scss';

type AuthProps = {};

type AuthState = 'signUp' | 'signIn';

const Auth: FC<AuthProps> = () => {
  const [{ email, password }, { signUp, signIn, changeInput }] = useAuth();
  const [authState, setAuthState] = useState<AuthState>('signUp');

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

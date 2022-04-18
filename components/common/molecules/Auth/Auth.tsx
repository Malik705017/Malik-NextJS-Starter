import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from 'models/auth';
import { useModal } from 'models/modal';
import { appRoute } from 'utils/config/appRoute.config';

import Button from 'components/common/atoms/Button';
import Input from 'components/common/atoms/Input';

import styles from './Auth.module.scss';

type AuthProps = {};

type AuthState = 'signUp' | 'signIn';

const Auth: FC<AuthProps> = () => {
  const [{ email, password, isLoggedIn }, { signUp, signIn, changeInput }] = useAuth();
  const [{ isOpen }, { closeModal }] = useModal();
  const [authState, setAuthState] = useState<AuthState>('signIn');
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
      <h2>{"Malik's NextJS Starter"}</h2>
      <Input
        className={styles.input}
        value={email}
        placeholder="email"
        onChange={(e) => changeInput({ type: 'email', value: e.target.value })}
      />
      <Input
        className={styles.input}
        value={password}
        type="password"
        placeholder="password"
        onChange={(e) => changeInput({ type: 'password', value: e.target.value })}
      />

      {authState === 'signUp' && (
        <Button className={styles.signButton} onClick={signUp}>
          註冊
        </Button>
      )}
      {authState === 'signIn' && (
        <Button className={styles.signButton} onClick={signIn}>
          登入
        </Button>
      )}
      <div className={styles.switch}>
        {authState === 'signIn' && <p className={styles.switchQuestion}>還沒有帳號嗎?</p>}
        {authState === 'signUp' && <p className={styles.switchQuestion}>已經註冊了嗎?</p>}
        <p
          className={styles.switchAction}
          onClick={() => {
            changeInput({ type: 'email', value: '' });
            changeInput({ type: 'password', value: '' });
            setAuthState((prevState) => {
              if (prevState === 'signUp') return 'signIn';
              return 'signUp';
            });
          }}
        >
          我要{authState === 'signUp' ? '登入' : '註冊'}
        </p>
      </div>
    </div>
  );
};

export default Auth;

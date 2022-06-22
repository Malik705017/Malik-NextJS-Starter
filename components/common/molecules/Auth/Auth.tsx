import { FC, useState, useEffect } from 'react';

import { useAuth } from 'models/auth';
import { useUIEffect } from 'models/uiEffect';
import { ThirdParty } from 'firebaseConfig/firebaseAuth';

import Button from 'components/common/atoms/Button';
import Input from 'components/common/atoms/Input';

import styles from './Auth.module.scss';
import { status } from 'utils/status';
import Icon from 'components/common/atoms/Icon';

type AuthProps = {};

type AuthState = 'signUp' | 'signIn';

const checkIsValid = (email: string, password: string) => {
  if (!email.includes('@') || password.length < 6) return false;
  return true;
};

const Auth: FC<AuthProps> = () => {
  const [
    {
      authInput: { emailInput, passwordInput },
      authStatus: { isSignIn, isSignUp, fetchStatus },
    },
    { signUp, signIn, signInWithThirdParty, changeInput },
  ] = useAuth();
  const [{ modal }, { changeUIEffect }] = useUIEffect();
  const [authState, setAuthState] = useState<AuthState>('signIn');

  // 註冊成功後即轉為可登入狀態
  useEffect(() => {
    if (isSignUp) {
      setAuthState('signIn');
    }
  }, [isSignUp]);

  // 登入成功後即跳到個人頁面並關閉此 Modal
  useEffect(() => {
    if (isSignIn && modal.isOpen) {
      changeUIEffect({ uiKey: 'modal', value: false });
    }
  }, [isSignIn, modal.isOpen]);

  return (
    <div className={styles.auth}>
      <h2>{"Malik's NextJS Starter"}</h2>
      {fetchStatus === status.loading ? (
        <Icon src={'/icons/loading.icon.gif'} alt="loading" width={120} height={120} />
      ) : (
        <>
          <Input
            className={styles.input}
            value={emailInput}
            placeholder="email"
            onChange={(e) => changeInput({ type: 'emailInput', value: e.target.value })}
          />
          <Input
            className={styles.input}
            value={passwordInput}
            type="password"
            placeholder="password"
            onChange={(e) => changeInput({ type: 'passwordInput', value: e.target.value })}
          />
          {authState === 'signUp' && (
            <Button className={styles.signButton} onClick={signUp}>
              註冊
            </Button>
          )}
          {authState === 'signIn' && (
            <Button className={styles.signButton} onClick={signIn} disabled={!checkIsValid(emailInput, passwordInput)}>
              登入
            </Button>
          )}
        </>
      )}
      <div className={styles.options}>
        {isSignUp ? (
          <p>註冊成功！ 可立即登入</p>
        ) : (
          <>
            <div className={styles.switch}>
              {authState === 'signIn' && <p className={styles.switchQuestion}>還沒有帳號嗎?</p>}
              {authState === 'signUp' && <p className={styles.switchQuestion}>已經註冊了嗎?</p>}
              <p
                className={styles.switchAction}
                onClick={() => {
                  changeInput({ type: 'emailInput', value: '' });
                  changeInput({ type: 'passwordInput', value: '' });
                  setAuthState((prevState) => {
                    if (prevState === 'signUp') return 'signIn';
                    return 'signUp';
                  });
                }}
              >
                我要{authState === 'signUp' ? '登入' : '註冊'}
              </p>
            </div>
            <hr className={styles.line} />
            <div className={styles.signIn}>
              <p>或使用以下第三方登入方式</p>
              <div className={styles.signInIcons}>
                <Icon
                  className={styles.signInIcon}
                  src="/images/common/google.logo.png"
                  onClick={() => signInWithThirdParty(ThirdParty.google)}
                />
                <Icon
                  className={styles.signInIcon}
                  src="/images/common/github.logo.png"
                  onClick={() => signInWithThirdParty(ThirdParty.github)}
                />
                <Icon
                  className={styles.signInIcon}
                  src="/images/common/facebook.logo.png"
                  onClick={() => signInWithThirdParty(ThirdParty.facebook)}
                />
                {/* <Icon
                  className={styles.signInIcon}
                  src="/images/common/twitter.logo.png"
                  onClick={() => signInWithThirdParty(ThirdParty.twitter)}
                /> */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;

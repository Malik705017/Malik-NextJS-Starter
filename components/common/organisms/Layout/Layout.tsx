import { FC, useEffect } from 'react';
import classnames from 'classnames';

import { useAuth } from 'models/auth';
import { useUIEffect } from 'models/uiEffect';
import { calcRemainingTime } from 'utils/calc';

import Header from 'components/common/molecules/Header';
import Footer from 'components/common/molecules/Footer';
import Modal from 'components/common/molecules/Modal';
import Auth from 'components/common/molecules/Auth';
import Chatroom from 'components/common/organisms/Chatroom';

import styles from './Layout.module.scss';

const Layout: FC = ({ children }) => {
  const [
    {
      authStatus: { isSignIn },
    },
    { checkIsSignIn, logOut },
  ] = useAuth();
  const [{ modal, dropDown }, { changeUIEffect }] = useUIEffect();

  useEffect(() => {
    if (!isSignIn) {
      checkIsSignIn();
    } else {
      /* set up auto login */
      const expiredTime = localStorage.getItem('expiredTime');
      if (expiredTime) {
        const remainingTime = calcRemainingTime(parseInt(expiredTime));
        const timer = setTimeout(() => {
          logOut();
        }, remainingTime);

        return () => clearTimeout(timer);
      }
    }
  }, [isSignIn]);

  return (
    <>
      <div
        className={classnames(styles.layout)}
        onClick={(e) => {
          if (dropDown.isOpen) {
            changeUIEffect({ uiKey: 'dropDown', value: false });
          }
          e.stopPropagation();
        }}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
      {modal.isOpen && (
        <Modal className={styles.modal}>
          <Auth />
        </Modal>
      )}
      {isSignIn && <Chatroom />}
    </>
  );
};

export default Layout;

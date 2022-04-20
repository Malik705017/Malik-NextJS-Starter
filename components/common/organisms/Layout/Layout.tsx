import { FC, useEffect } from 'react';
import classnames from 'classnames';

import { useAuth } from 'models/auth';
import { useDropDown } from 'models/dropDown';
import { calcRemainingTime } from 'utils/auth';

import Header from 'components/common/molecules/Header';
import Footer from 'components/common/molecules/Footer';

import styles from './Layout.module.scss';

const Layout: FC = ({ children }) => {
  const [{ isLoggedIn }, { checkIsLoggedIn, logOut }] = useAuth();
  const [{ isOpen }, { closeDropDown }] = useDropDown();

  useEffect(() => {
    if (!isLoggedIn) {
      checkIsLoggedIn();
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
  }, [isLoggedIn]);

  return (
    <div
      className={classnames(styles.layout)}
      onClick={(e) => {
        console.log('clickLayout');
        if (isOpen) {
          closeDropDown();
        }
        e.stopPropagation();
      }}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

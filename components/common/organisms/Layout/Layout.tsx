import { FC, useEffect } from 'react';
import classnames from 'classnames';

import { useScroll } from 'models/scroll';
import { useAuth } from 'models/auth';
import { calcRemainingTime } from 'utils/auth';

import Header from 'components/common/molecules/Header';
import Footer from 'components/common/molecules/Footer';

import styles from './Layout.module.scss';

const Layout: FC = ({ children }) => {
  const [{ canScroll }] = useScroll();
  const [{ isLoggedIn }, { checkIsLoggedIn, logOut }] = useAuth();

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
    <div className={classnames(styles.layout, !canScroll && styles.locked)}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

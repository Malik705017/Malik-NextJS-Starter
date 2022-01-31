import { FC } from 'react';
import classnames from 'classnames';

import { useScroll } from '../../../../models/scroll';

import Header from '../../molecules/Header';
import Footer from '../../molecules/Footer';

import styles from './Layout.module.scss';

const Layout: FC = ({ children }) => {
  const [{ canScroll }] = useScroll();

  return (
    <div className={classnames(styles.layout, !canScroll && styles.locked)}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

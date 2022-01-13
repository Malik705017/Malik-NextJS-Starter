import { FC } from 'react';

import Header from '../../molecules/Header';
import Footer from '../../molecules/Footer';

import styles from './Layout.module.scss';

const Layout: FC = ({ children }) => (
  <div className={styles.layout}>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;

import { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import styles from './NavBar.module.scss';

type NavDataType = {
  link: string;
  name: string;
};

type NavBarProps = {
  className?: string;
  isMobile?: boolean;
  data: NavDataType[];
};

const NavBar: FC<NavBarProps> = ({ className = '', isMobile = false, data = [] }) => {
  return (
    <nav className={classnames(className, isMobile ? styles.mobile : styles.laptop)}>
      {data.map(({ link, name }) => (
        <Link key={name} href={link} passHref>
          <span>{name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;

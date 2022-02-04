import { FC } from 'react';
import { useRouter } from 'next/router';

import { useModal } from '../../../../models/modal';
import { useAuth } from '../../../../models/auth';
import { appRoute } from '../../../../utils/config/appRoute.config';

import Icon from '../../atoms/Icon';

import styles from './Header.module.scss';

const Header: FC = () => {
  const [, { openModal }] = useModal();
  const [{ isLoggedIn }] = useAuth();
  const router = useRouter();

  return (
    <div className={styles.header}>
      <h1
        className={styles.title}
        onClick={() => {
          router.push(appRoute.home);
        }}
      >
        Elsword 組團網
      </h1>
      {isLoggedIn && <p>Welcome</p>}
      {!isLoggedIn && (
        <Icon
          className={styles.icon}
          src="/icons/user-white.icon.png"
          alt="userIcon"
          width={36}
          height={36}
          onClick={() => openModal()}
        />
      )}
    </div>
  );
};

export default Header;

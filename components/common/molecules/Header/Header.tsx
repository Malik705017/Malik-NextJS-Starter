import { FC } from 'react';

import { useModal } from '../../../../models/modal';

import Icon from '../../atoms/Icon';

import styles from './Header.module.scss';

const Header: FC = () => {
  const [, { openModal }] = useModal();

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Elsword 組團網</h1>
      <Icon
        className={styles.icon}
        src="/icons/user-white.icon.png"
        alt="userIcon"
        width={36}
        height={36}
        onClick={() => openModal()}
      />
    </div>
  );
};

export default Header;

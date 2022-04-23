import { FC, useEffect } from 'react';

import { useAuth } from 'models/auth';
import { useUIEffect } from 'models/uiEffect';

import Auth from 'components/common/molecules/Auth';
import Modal from 'components/common/molecules/Modal';

import styles from './Profile.module.scss';

const Profile: FC = () => {
  const [{ userName, isSignIn }] = useAuth();
  const [{ modal }, { changeUIEffect }] = useUIEffect();

  useEffect(() => {
    if (!isSignIn) {
      changeUIEffect({ uiKey: 'modal', value: true });
    }
  }, [isSignIn]);

  return (
    <>
      {isSignIn ? <p>Welcome {userName}</p> : <p>You need to sign in first</p>}
      {modal.isOpen && (
        <Modal className={styles.modal}>
          <Auth />
        </Modal>
      )}
    </>
  );
};

export default Profile;

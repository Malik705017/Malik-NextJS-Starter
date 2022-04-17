import { FC, useEffect } from 'react';

import { useAuth } from 'models/auth';
import { useModal } from 'models/modal';

import Auth from 'components/common/molecules/Auth';
import Modal from 'components/common/molecules/Modal';

const Profile: FC = () => {
  const [{ isLoggedIn }] = useAuth();
  const [{ isOpen }, { openModal }] = useModal();

  useEffect(() => {
    if (!isLoggedIn) {
      openModal();
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? <p>Welcome to your profile</p> : <p>You need to sign in first</p>}
      {isOpen && (
        <Modal>
          <Auth />
        </Modal>
      )}
    </>
  );
};

export default Profile;

import { FC } from 'react';

import { useModal } from '../../../models/modal';

import Head from '../../common/atoms/Head';
import Modal from '../../common/molecules/Modal';

import styles from './Home.module.scss';

const Home: FC = () => {
  const [{ isOpen: isModalOpen }, { openModal }] = useModal();

  return (
    <>
      <Head title="home" description={'home'} />
      <div className={styles.home}>
        <button onClick={() => openModal()}>Click!</button>
      </div>
      {isModalOpen && <Modal>This is a Modal</Modal>}
    </>
  );
};

export default Home;

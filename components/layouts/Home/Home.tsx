import { FC, useEffect } from 'react';
import Image from 'next/image';

import { useModal } from '../../../models/modal';
import { useScroll } from '../../../models/scroll';

import Head from '../../common/atoms/Head';
import Button from '../../common/atoms/Button';
import Modal from '../../common/molecules/Modal';
import Auth from '../../common/molecules/Auth';
import Carousel from '../../common/organisms/Carousel';

import styles from './Home.module.scss';

const imgList = ['/images/home_banner_3.png', '/images/home_banner_2.png', '/images/home_banner_1.png'];

const Home: FC = () => {
  const [{ isOpen: isModalOpen }] = useModal();
  const [{ canScroll }, { enableScroll, disableScroll }] = useScroll();

  const scrollToY = () => {
    if (window) {
      window.scrollTo({ top: window.innerHeight - 60, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    disableScroll();
  }, []);

  useEffect(() => {
    if (canScroll) {
      scrollToY();
    }
  }, [canScroll]);

  return (
    <div className={styles.home}>
      <Head title="home" description={'home'} />
      <Carousel
        childNodes={imgList.map((src, index) => (
          <Image key={`${src}_${index}`} src={src} alt={`banner_${index}`} layout="fill" />
        ))}
        className={styles.banner}
      />
      <div className={styles.slogan}>
        <h1>FIND YOUR TEAMMATE</h1>
        <h1 className={styles.fast}>FAST</h1>
        <Button
          content="馬上開始"
          reverse
          onClick={() => {
            enableScroll();
            if (canScroll) {
              scrollToY();
            }
          }}
        />
      </div>
      <div className={styles.content} />
      {isModalOpen && (
        <Modal>
          <Auth />
        </Modal>
      )}
    </div>
  );
};

export default Home;

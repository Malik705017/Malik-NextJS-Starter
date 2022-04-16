import { FC, useEffect } from 'react';
import Image from 'next/image';

import { useModal } from '../../../models/modal';
import { useScroll } from '../../../models/scroll';

import Head from '../../common/atoms/Head';
import Button from '../../common/atoms/Button';
import Modal from '../../common/molecules/Modal';
import Auth from '../../common/molecules/Auth';
import SectionWrapper from '../../common/molecules/SectionWrapper';
import Carousel from '../../common/organisms/Carousel';

import styles from './Home.module.scss';

const imgList = ['/images/home/banner_3.jpg', '/images/home/banner_2.jpg', '/images/home/banner_1.jpg'];

const Home: FC = () => {
  const [{ isOpen: isModalOpen }] = useModal();
  const [{ canScroll }, { enableScroll, disableScroll }] = useScroll();

  const scrollToY = () => {
    if (window) {
      window.scrollBy({ top: window.innerHeight - 60, behavior: 'smooth' });
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
    <>
      <Head title="Malik's NextJS Starter" description={'Make your project better'} />
      <div className={styles.banner}>
        <Carousel
          className={styles.carousel}
          childNodes={imgList.map((src, index) => (
            <Image key={`${src}_${index}`} src={src} alt={`banner_${index}`} layout="fill" />
          ))}
        />
        {/*標語，z-index = 2 */}
        <SectionWrapper className={styles.slogan}>
          <h1>BUILD YOUR WEBSITE</h1>
          <h1>
            <span>SUPER</span> FAST
          </h1>
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
        </SectionWrapper>
        {/*背景遮罩，z-index = 1 */}
        <SectionWrapper className={styles.mask} />
      </div>
      <SectionWrapper isFullPage></SectionWrapper>
      {isModalOpen && (
        <Modal>
          <Auth />
        </Modal>
      )}
    </>
  );
};

export default Home;

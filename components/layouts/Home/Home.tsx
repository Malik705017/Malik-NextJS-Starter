import { FC } from 'react';
import Image from 'next/image';

import { useModal } from 'models/modal';

import Head from 'components/common/atoms/Head';
import Button from 'components/common/atoms/Button';
import Icon from 'components/common/atoms/Icon';
import Modal from 'components/common/molecules/Modal';
import Auth from 'components/common/molecules/Auth';
import SectionWrapper from 'components/common/molecules/SectionWrapper';
import Carousel from 'components/common/organisms/Carousel';

import styles from './Home.module.scss';

const imgList = ['/images/home/banner_2.jpg', '/images/home/banner_3.jpg', '/images/home/banner_1.jpg'];

const Home: FC = () => {
  const [{ isOpen: isModalOpen }] = useModal();

  const scrollToY = () => {
    if (window) {
      window.scrollBy({ top: window.innerHeight - 60, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head
        title="Malik's NextJS Starter"
        description={'Make your project eaiser to start'}
        og_image={'/images/common/og-image.jpg'}
      />
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
            <span className={styles.blue}>SUPER</span> FAST
          </h1>
          <Button onClick={() => scrollToY()}>GET STARTED</Button>
        </SectionWrapper>
        {/*背景遮罩，z-index = 1 */}
        <SectionWrapper className={styles.mask} />
      </div>
      <SectionWrapper isFullPage className={styles.featureSection}>
        <h1>Features</h1>
        <h2>The project is based on NextJS starter, but do more and make it better to use</h2>
        <div className={styles.content}>
          <div className={styles.featureCard}>
            <h3>Well-designed Structure</h3>
            <Icon className={styles.featureIcon} src="/icons/rocket.icon.gif" alt="redux" width={140} height={140} />
            <Button>Learn More</Button>
          </div>
          <div className={styles.featureCard}>
            <h3>Reliable Dev Tools Be Used</h3>
            <Icon className={styles.featureIcon} src="/icons/physics.icon.gif" alt="redux" width={140} height={140} />
            <Button>Learn More</Button>
          </div>
          <div className={styles.featureCard}>
            <h3>Redux Best Practice</h3>
            <Icon
              className={styles.featureIcon}
              src="/icons/cloud-network.icon.gif"
              alt="redux"
              width={140}
              height={140}
            />
            <Button>Learn More</Button>
          </div>
        </div>
      </SectionWrapper>
      {isModalOpen && (
        <Modal>
          <Auth />
        </Modal>
      )}
    </>
  );
};

export default Home;

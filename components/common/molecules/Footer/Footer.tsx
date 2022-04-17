import { FC } from 'react';

import Icon from 'components/common/atoms/Icon';

import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.icons}>
        <a href="https://github.com/Malik705017" target="_blank" rel="noopener noreferrer">
          <Icon alt="github" src={'/icons/github.icon.png'} />
        </a>
        <a href="https://www.facebook.com/Malik11217/" target="_blank" rel="noopener noreferrer">
          <Icon alt="facebook" src={'/icons/facebook.icon.svg'} />
        </a>
        <a href="https://www.linkedin.com/in/malik-chang-89440a1b6/" target="_blank" rel="noopener noreferrer">
          <Icon alt="linkedin" src={'/icons/linkedin.icon.png'} />
        </a>
      </div>
      <p>Copyright © 2022 - Malik NextJS Starter</p>
    </footer>
  );
};

export default Footer;

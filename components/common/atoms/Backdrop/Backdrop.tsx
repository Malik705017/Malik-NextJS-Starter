import { FC } from 'react';

import styles from './Backdrop.module.scss';

type BackdropProps = {
  onClick: () => void;
};

const Backdrop: FC<BackdropProps> = ({ onClick }) => {
  return <div className={styles.backdrop} onClick={onClick} />;
};

export default Backdrop;

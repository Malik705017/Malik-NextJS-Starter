import { FC, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

type ButtonProps = {
  content?: ReactNode;
  className?: string;
  reverse?: boolean;
  onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ className = '', content = '', reverse = false, onClick = () => {} }) => {
  return (
    <button
      className={classnames(!reverse ? styles.buttonOriginal : styles.buttonReverse, className)}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;

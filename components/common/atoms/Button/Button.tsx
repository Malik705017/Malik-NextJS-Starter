import { FC } from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

type ButtonProps = {
  content: string;
  className?: string;
  reverse?: boolean;
  onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ className = '', content = '', reverse = false, onClick = () => {} }) => {
  return (
    <button
      className={classnames(!reverse && styles.buttonOriginal, reverse && styles.buttonReverse, className)}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;

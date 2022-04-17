import { FC, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

export enum ButtonSize {
  small = 'small',
  default = 'default',
  large = 'large',
}

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  reverse?: boolean;
  onClick?: () => void;
  size?: ButtonSize;
};

const Button: FC<ButtonProps> = ({
  className = '',
  children,
  reverse = false,
  onClick = () => {},
  size = 'default',
}) => {
  return (
    <button
      className={classnames(!reverse ? styles.buttonOriginal : styles.buttonReverse, styles[size], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

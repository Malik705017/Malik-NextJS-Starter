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
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  className = '',
  children,
  reverse = false,
  onClick = () => {},
  size = 'default',
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={classnames(!reverse ? styles.buttonOriginal : styles.buttonReverse, styles[size], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

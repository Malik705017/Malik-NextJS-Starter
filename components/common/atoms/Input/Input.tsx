import { FC, HTMLInputTypeAttribute, ChangeEventHandler } from 'react';
import classnames from 'classnames';

import styles from './Input.module.scss';

type InputProps = {
  className?: string;
  type?: HTMLInputTypeAttribute;
  value?: string | number;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

const Input: FC<InputProps> = ({ className = '', type = 'text', value = '', placeholder = '', onChange }) => {
  return (
    <input
      className={classnames(styles.input, className)}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;

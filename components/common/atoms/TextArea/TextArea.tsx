import type { FC, ChangeEventHandler } from 'react';
import classnames from 'classnames';

import styles from './TextArea.module.scss';

type TextAreaProps = {
  className?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
};

const TextArea: FC<TextAreaProps> = ({ className = '', value = '', placeholder = '', onChange }) => {
  return (
    <textarea
      className={classnames(styles.textArea, className)}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default TextArea;

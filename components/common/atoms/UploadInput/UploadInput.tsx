import { useRef, FC, cloneElement, ReactElement, ChangeEventHandler } from 'react';
import classnames from 'classnames';

import styles from './UploadInput.module.scss';

type UploadInputProps = {
  className?: string;
  children: ReactElement;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
};

const UploadInput: FC<UploadInputProps> = ({ className, children, onChangeHandler }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClickUpload = () => {
    if (inputRef.current) inputRef.current.click();
  };

  return (
    <div className={classnames(styles.uploadInput, className)}>
      <label className={styles.label} htmlFor="image-uplodad">
        請選擇圖片
      </label>
      <input
        className={styles.input}
        ref={inputRef}
        type="file"
        onChange={onChangeHandler}
        accept=".jpg, .png, .jpeg"
        id="image-uplodad"
      />
      {cloneElement(children, {
        onClick: handleOnClickUpload,
      })}
    </div>
  );
};

export default UploadInput;

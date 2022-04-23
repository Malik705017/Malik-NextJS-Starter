import { FC } from 'react';
import classnames from 'classnames';

import { useUIEffect } from 'models/uiEffect';

import Portal from 'components/common/atoms/Portal';
import Backdrop from 'components/common/atoms/Backdrop';
import Icon from 'components/common/atoms/Icon';

import styles from './Modal.module.scss';

type ModalProps = {
  className?: string;
};

const Modal: FC<ModalProps> = ({ children: ModalContent, className }) => {
  const [, { changeUIEffect }] = useUIEffect();
  return (
    <>
      <Portal>
        <Backdrop onClick={() => changeUIEffect({ uiKey: 'modal', value: false })} />
      </Portal>
      <Portal>
        <div className={classnames(styles.modal, className)}>
          <Icon
            className={styles.icon}
            src="/icons/close.icon.png"
            alt="closeIcon"
            onClick={() => changeUIEffect({ uiKey: 'modal', value: false })}
          />
          {ModalContent}
        </div>
      </Portal>
    </>
  );
};

export default Modal;

import { FC } from 'react';
import classnames from 'classnames';
import Image from 'next/image';

import styles from './Icon.module.scss';

type IconProps = {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
};

const Icon: FC<IconProps> = ({
  src = '',
  alt = 'icon',
  className = '',
  width = 24,
  height = 24,
  onClick = () => {},
}) => {
  return (
    <div className={classnames(styles.icon, className)} onClick={onClick} role="button">
      <Image src={src} alt={alt} width={width} height={height} layout="fixed" />
    </div>
  );
};

export default Icon;

import { FC } from 'react';
import classnames from 'classnames';

import styles from './Label.module.scss';

type LabelProps = {
  className?: string;
  content: string;
};

const Label: FC<LabelProps> = ({ className = '', content }) => {
  return <div className={classnames(styles.label, className)}>{content}</div>;
};

export default Label;

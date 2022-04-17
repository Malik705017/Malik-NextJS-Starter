import { FC } from 'react';
import classnames from 'classnames';

import styles from './Example.module.scss';

type ExampleProps = {
  className?: string;
};

const Example: FC<ExampleProps> = ({ className = '' }) => {
  return <div className={classnames(styles.example, className)} />;
};

export default Example;

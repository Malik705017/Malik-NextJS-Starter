import { FC } from 'react';

import styles from './Example.module.scss';

type ExampleProps = {};

const Example: FC<ExampleProps> = () => {
  return <div className={styles.example} />;
};

export default Example;

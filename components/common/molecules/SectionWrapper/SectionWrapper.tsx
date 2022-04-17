import { FC, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './SectionWrapper.module.scss';

type SectionWrapperProps = {
  className?: string;
  isFullPage?: boolean;
  children?: ReactNode;
};

const SectionWrapper: FC<SectionWrapperProps> = ({ children, className = '', isFullPage = false }) => {
  const wrapperClassName = classnames(className, styles.sectionWrapper, isFullPage && styles.fullpage);

  return <section className={wrapperClassName}>{children}</section>;
};

export default SectionWrapper;

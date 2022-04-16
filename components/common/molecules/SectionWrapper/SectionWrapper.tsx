import { FC, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './SectionWrapper.module.scss';

type SectionWrapperProps = {
  className?: string;
  backgroundColor?: string;
  isFullPage?: boolean;
  children?: ReactNode;
};

const SectionWrapper: FC<SectionWrapperProps> = ({
  children,
  className = '',
  backgroundColor = '',
  isFullPage = false,
}) => {
  const wrapperClassName = classnames(className, styles.sectionWrapper, isFullPage && styles.fullpage);

  return backgroundColor ? (
    <section className={wrapperClassName} style={{ backgroundColor }}>
      {children}
    </section>
  ) : (
    <section className={wrapperClassName}>{children}</section>
  );
};

export default SectionWrapper;

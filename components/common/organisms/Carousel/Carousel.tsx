import { FC, useState, useEffect, ReactChild } from 'react';
import classnames from 'classnames';

import styles from './Carousel.module.scss';

type CarouselProps = {
  time?: number;
  childNodes: ReactChild[];
  className?: string;
};

const Carousel: FC<CarouselProps> = ({ time = 5000, childNodes, className = '' }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const len = childNodes.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prevIndex) => {
        if (prevIndex === len - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, time);

    return () => {
      clearInterval(timer);
    };
  }, [time, len]);

  return (
    <div className={classnames(styles.carousel, className)}>
      <ul>
        {childNodes.map((node, index) => (
          <li key={`_${index}`} className={classnames(styles.slide, activeSlideIndex === index && styles.activeSlide)}>
            {node}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;

import { FC, useMemo, useEffect, useState, useRef, ReactChild } from 'react';
import classnames from 'classnames';

import Button from 'components/common/atoms/Button';

import styles from './Slider.module.scss';

type SliderProps = {
  childNodes: ReactChild[];
  className?: string;
  hidden?: boolean;
};

const slidesConstructor = (childNodes: ReactChild[], slideWidth: number) => {
  const centerIndex = Math.floor(childNodes.length / 2);
  return childNodes.map((_, index) => ({
    left: (index - centerIndex) * slideWidth,
  }));
};

const Slider: FC<SliderProps> = ({ childNodes, className = '', hidden = false }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [slideWidth, setSlideWidth] = useState<number>(1000);
  const [slides, setSlides] = useState(slidesConstructor(childNodes, 1000));
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const centerIndex = useMemo(() => Math.floor(childNodes.length / 2), [childNodes]);
  const maxLeft = useMemo(() => (childNodes.length - 1 - centerIndex) * slideWidth, [centerIndex, slideWidth]);
  const minLeft = useMemo(() => (0 - centerIndex) * slideWidth, [centerIndex, slideWidth]);

  const zIndexes = slides.map((slide) => {
    if ((slide.left === maxLeft && direction === 'next') || (slide.left === minLeft && direction === 'prev'))
      return { zIndex: '0' };
    return { zIndex: '1' };
  });

  useEffect(() => {
    const handleWidth = () => {
      if (divRef.current) {
        const { width } = divRef.current.getBoundingClientRect();
        if (window.innerWidth >= 1440 && slideWidth !== width) {
          setSlideWidth(width);
          setSlides(slidesConstructor(childNodes, width));
        } else if (window.innerWidth >= 768 && slideWidth !== width) {
          setSlideWidth(width);
          setSlides(slidesConstructor(childNodes, width));
        } else if (slideWidth !== width) {
          setSlideWidth(width);
          setSlides(slidesConstructor(childNodes, width));
        }
      }
    };

    if (divRef.current) {
      handleWidth();
      window.addEventListener('resize', handleWidth);
    }

    return () => window.removeEventListener('resize', handleWidth);
  }, [divRef.current]);

  return (
    <div
      style={{ ...(hidden && { overflow: 'hidden' }) }}
      className={classnames(styles.sliderContainer, className)}
      ref={divRef}
    >
      <ul className={styles.slider}>
        {childNodes.map((child, index) => {
          return (
            <li key={`_${index}`} style={{ ...slides[index], ...zIndexes[index] }}>
              <div>{child}</div>
            </li>
          );
        })}
      </ul>
      <Button
        className={styles.prev}
        onClick={() => {
          if (direction === 'next') setDirection('prev');
          setSlides((prevSlides) => {
            let newSlides = [...prevSlides];
            const firstSlide = { ...newSlides[0] };
            newSlides.splice(0, 1);
            newSlides = [...newSlides, firstSlide];
            return newSlides;
          });
        }}
      >
        Prev
      </Button>
      <Button
        className={styles.next}
        onClick={() => {
          if (direction === 'prev') setDirection('next');
          setSlides((prevSlides) => {
            let newSlides = [...prevSlides];
            const lastSlide = { ...newSlides[newSlides.length - 1] };
            newSlides.splice(newSlides.length - 1, 1);
            newSlides = [lastSlide, ...newSlides];
            return newSlides;
          });
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default Slider;

import dynamic from 'next/dynamic';

const Slider = dynamic(() => import('./Slider'), {
  ssr: false,
});

export default Slider;

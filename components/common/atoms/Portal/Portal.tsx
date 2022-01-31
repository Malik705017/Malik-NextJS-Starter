import { FC, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const Portal: FC = ({ children }) => {
  const elementRef = useRef(document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(elementRef.current);
    console.log('APPEND');

    /* 當引用 Portal 的 Component 被 unmounted 時，也將此 Portal 移除 */
    return () => {
      document.body.removeChild(elementRef.current);
      console.log('UNMOUNT');
    };
  }, [elementRef.current]);

  return ReactDOM.createPortal(children, elementRef.current);
};

export default Portal;

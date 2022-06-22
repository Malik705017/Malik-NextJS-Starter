import dynamic from 'next/dynamic';

const Chatroom = dynamic(() => import('./Chatroom'), { ssr: false });

export default Chatroom;

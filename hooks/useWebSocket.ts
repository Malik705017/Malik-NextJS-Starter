import { useEffect } from 'react';
import { useChat } from 'models/chat';
import { useAuth } from 'models/auth';
import { MessageFromClient, MessageToClient, ChatBox } from 'types/chat';

const sendMessage = (ws: WebSocket, data: MessageFromClient) => ws.send(JSON.stringify(data));

export const useWebSocket = () => {
  const [
    {
      user: { name, id },
      authStatus: { isSignIn },
    },
  ] = useAuth();
  const [, { storeChatBox, initializeChatState, setWebSocket }] = useChat();

  useEffect(() => {
    if (isSignIn) {
      const ws = new WebSocket(
        // process.env.NEXT_PUBLIC_WEB_SOCKET_ENDPOINT?.replace('https', 'wss') ||
        'ws://localhost:8000'
      );
      setWebSocket(ws);

      // 告訴 backend 我上線了
      ws.onopen = () => {
        console.log('Server connected.');
        sendMessage(ws, { header: { sender: { id, name } }, payload: { type: 'OPENCHAT' } });
      };

      ws.onmessage = (event) => {
        const message: MessageToClient = JSON.parse(event.data);

        switch (message.type) {
          case 'OPENCHAT': {
            const chatBoxes: ChatBox[] = [...message.payload];

            initializeChatState(chatBoxes);

            break;
          }
          case 'MESSAGE': {
            const chatbox: ChatBox = message.payload[0];

            storeChatBox(chatbox);

            break;
          }
        }
      };
    }

    return () => setWebSocket(undefined);
  }, [isSignIn]);

  return { sendMessage };
};

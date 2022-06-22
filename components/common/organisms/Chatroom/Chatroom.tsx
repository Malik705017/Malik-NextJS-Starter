import { FC, useEffect, useState } from 'react';
import classnames from 'classnames';

import { useWebSocket } from 'hooks/useWebSocket';
import { useAuth } from 'models/auth';
import { useChat } from 'models/chat';

import styles from './Chatroom.module.scss';
import Button from 'components/common/atoms/Button';
import Icon from 'components/common/atoms/Icon';
import Input from 'components/common/atoms/Input';

type ChatroomProps = {
  className?: string;
};

const Chatroom: FC<ChatroomProps> = ({ className = '' }) => {
  const [
    {
      user: { name, id },
    },
  ] = useAuth();
  const [{ ws, curConnector, dataByIds, availableConnectors }, { getAvailableConnectors, setCurConnector }] = useChat();
  const { sendMessage } = useWebSocket();

  const [isOpen, setIsOpen] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    getAvailableConnectors();
  }, []);

  // 當前聯絡人改變時，打開聊天室窗
  useEffect(() => {
    if (curConnector) {
      setIsChatting(true);
    }
  }, [curConnector]);

  return isOpen ? (
    <div className={classnames(styles.chatroom, className)}>
      <header className={styles.headerOpen}>
        {isChatting && (
          <>
            <p onClick={() => setIsChatting(false)}>BACK</p>
            <h1>{curConnector?.name}</h1>
          </>
        )}
        <Icon
          src={'/icons/close.icon.png'}
          onClick={() => {
            setIsOpen(false);
            setIsChatting(false);
          }}
        />
      </header>
      {!isChatting ? (
        <div className={styles.select}>
          {availableConnectors.map((connector) => (
            <p
              key={connector.id}
              onClick={() => {
                if (!curConnector || connector.id !== curConnector.id) setCurConnector(connector);
                else setIsChatting(true);
              }}
            >
              {connector.name}
            </p>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.chatbox}>
            {Object.keys(dataByIds).length > 0 && curConnector ? (
              dataByIds[curConnector.id].messages.map(({ senderId, content }) => (
                <div
                  key={`${senderId}-${content}`}
                  className={classnames(styles.message, senderId === id && styles.myMessage)}
                >
                  <div className={styles.content}>{content}</div>
                </div>
              ))
            ) : (
              <div> start to chat !</div>
            )}
          </div>
          <div className={styles.sendbox}>
            <Input className={styles.input} value={input} onChange={(e) => setInput(e.target.value)} />
            <Button
              className={styles.button}
              onClick={() => {
                if (ws && curConnector) {
                  sendMessage(ws, {
                    header: {
                      sender: { id, name },
                      receiver: curConnector,
                    },
                    payload: {
                      type: 'MESSAGE',
                      content: input,
                    },
                  });
                  setInput('');
                }
              }}
            >
              Send
            </Button>
          </div>
        </>
      )}
    </div>
  ) : (
    <div
      className={styles.headerClose}
      onClick={() => {
        setIsOpen(true);
      }}
    ></div>
  );
};

export default Chatroom;

// 單一使用者基本資料
export type User = {
  id: string;
  name: string;
};

// 單一聊天訊息資料
export type ChatBoxMessage = {
  senderId: string;
  content: string;
};

// 後端回傳給前端的單一聊天室資料形式
export type ChatBox = {
  connector: User; // 是跟誰聊天
  messages: ChatBoxMessage[]; // 所有聊天訊息資料
};

// 前後端傳輸訊息種類
type MessageType = 'OPENCHAT' | 'MESSAGE';

// 從前端傳輸的訊息形式
export type MessageFromClient = {
  header: {
    sender: User;
    receiver?: User;
  };
  payload: {
    type: MessageType;
    content?: string;
  };
};

// 從後端傳輸的訊息形式
export type MessageToClient = {
  type: MessageType;
  payload: ChatBox[];
};

// 存在 firestore 的 user document 資料形式
export type UserSchema = {
  id: string;
  name: string;
  connectors: User[];
};

// 存在 firestore 的 chatbox document 資料形式
export type ChatBoxSchema = {
  users: User[];
  messages: ChatBoxMessage[];
};

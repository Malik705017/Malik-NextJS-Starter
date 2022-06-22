import { createSlice, createAsyncThunk, ActionCreatorsMapObject, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from 'firebaseConfig/firebaseStore';
import { useRedux, Selector, DefaultActionMap } from 'hooks/useRedux';
import { RootState } from 'models/store';
import { ChatBox, ChatBoxMessage, User } from 'types/chat';

interface ChatState {
  ws: WebSocket | undefined;
  dataByIds: {
    [connectorId: string]: {
      messages: ChatBoxMessage[];
    };
  };
  connectors: User[];
  availableConnectors: User[];
  curConnector: User | null;
}

const initialState: ChatState = {
  ws: undefined,
  dataByIds: {},
  connectors: [],
  availableConnectors: [],
  curConnector: null,
};

const getAvailableConnectors = createAsyncThunk<User[], void, { state: RootState }>(
  'chat/getAvailableConnectors',
  async (_, thunkAPI) => {
    const {
      auth: {
        user: { id },
      },
    } = thunkAPI.getState();

    const data = await getUsers();

    const availableConnectors = data.map(({ name, id }) => ({ name, id }));

    return availableConnectors.filter((user) => user.id !== id);
  }
);

const thunks = {
  getAvailableConnectors,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setWebSocket(state: ChatState, action: PayloadAction<WebSocket | undefined>) {
      state.ws = action.payload;
    },
    initializeChatState(state: ChatState, action: PayloadAction<ChatBox[]>) {
      action.payload.forEach(({ connector, messages }) => {
        state.connectors.push(connector);
        state.dataByIds = {
          ...state.dataByIds,
          [connector.id]: {
            messages: [...messages],
          },
        };
      });
    },
    storeChatBox(state: ChatState, action: PayloadAction<ChatBox>) {
      const { connector, messages } = action.payload;
      if (!state.connectors.filter(({ id }) => id === connector.id)) {
        state.connectors.push(connector);
      }
      state.dataByIds = {
        ...state.dataByIds,
        [connector.id]: {
          messages: [...messages],
        },
      };
    },
    setCurConnector(state: ChatState, action: PayloadAction<User>) {
      state.curConnector = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAvailableConnectors.fulfilled, (state, action) => {
      state.availableConnectors = action.payload;
    });
  },
});

type SliceActionMap = typeof chatSlice.actions;
type ThunksActionMap = typeof thunks;
interface ActionMap extends SliceActionMap, ThunksActionMap, DefaultActionMap {}

const chatStateSelector: Selector<ChatState> = (state: RootState) => state.chat;

/* ActionCreatorsMapObject: Object whose values are action creator functions. */
export const chatActionCreators: ActionCreatorsMapObject = { ...chatSlice.actions, ...thunks };

export const useChat = () => useRedux<ChatState, ActionMap>(chatStateSelector, chatActionCreators);

export default chatSlice.reducer;

import { getStorage } from 'firebase/storage';
import firebaseApp from 'firebaseConfig/firebaseApp';

export const storage = getStorage(firebaseApp);

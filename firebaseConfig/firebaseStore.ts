import firebaseApp from 'firebaseConfig/firebaseApp';
import { getFirestore, collection, setDoc, getDoc, getDocs, doc } from 'firebase/firestore';
import { UserSchema } from 'types/chat';

const db = getFirestore(firebaseApp);
const users = collection(db, 'Users');

const getUser = async (uid: string) => {
  const snapshot = await getDoc(doc(users, uid));
  return snapshot.data();
};

export const getUsers = async () => {
  const usersSnapshot = await getDocs(users);
  return usersSnapshot.docs.map((doc) => doc.data());
};

export const createUser = async (uid: string, userName: string) => {
  const data = await getUser(uid);

  // 如果資料庫還沒有這個 user 的資料，就幫他創一個
  if (!data) {
    const user: UserSchema = {
      id: uid,
      name: userName,
      connectors: [],
    };

    await setDoc(doc(users, uid), user);
  }
};

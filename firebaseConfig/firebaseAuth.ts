import firebaseApp from 'firebaseConfig/firebaseApp';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

export const auth = getAuth(firebaseApp);

export enum ThirdParty {
  google = 'google',
  facebook = 'facebook',
  github = 'github',
  twitter = 'twitter',
}

const ThirdPartyProvider = (thirdParty: ThirdParty) => {
  switch (thirdParty) {
    case ThirdParty.github:
      return new GithubAuthProvider();
    case ThirdParty.facebook:
      return new FacebookAuthProvider();
    case ThirdParty.twitter:
      return new TwitterAuthProvider();
    default:
      return new GoogleAuthProvider();
  }
};

export const signWithThirdParty = async (thirdParty: ThirdParty) => {
  const provider = ThirdPartyProvider(thirdParty);

  const result = await signInWithPopup(auth, provider);

  if (!result) return 'sign in falied';

  // This is the signed-in user
  const user = result.user;
  return user;
};

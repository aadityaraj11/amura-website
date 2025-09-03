// src/services/firebaseAuth.ts
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

export const firebaseLogin = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const token = await user.getIdToken(); // Firebase token for backend
  return { user, token };
};

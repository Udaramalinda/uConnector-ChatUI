// import '../configs/envConfigs';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: '',
  authDomain: 'uconnector-d50c6.firebaseapp.com',
  projectId: 'uconnector-d50c6',
  storageBucket: 'uconnector-d50c6.appspot.com',
  messagingSenderId: '873222365437',
  appId: '1:873222365437:web:1b0ff9b7213e4667451e94',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

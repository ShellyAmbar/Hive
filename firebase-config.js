// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore} from 'firebase/firestore';
import {getStorage, ref} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDbWWkkWBdX7qbukZUIb9qDgsh4V-EizpQ',
  authDomain: 'hive-c997e.firebaseapp.com',
  projectId: 'hive-c997e',
  storageBucket: 'hive-c997e.appspot.com',
  messagingSenderId: '495400713932',
  appId: '1:495400713932:web:fa0a15e3256254561f4c69',
  measurementId: 'G-34N341FPMN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {db, storage, ref};

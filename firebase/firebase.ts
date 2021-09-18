import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_DB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_DB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_DB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_DB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_DB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_DB_APP_ID,
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = app.auth();
const db = app.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAjnv-CQOJ-Rw6WodpATpFmGXiiL9n16YU",
  authDomain: "homieostasis-playground.firebaseapp.com",
  projectId: "homieostasis-playground",
  storageBucket: "homieostasis-playground.firebasestorage.app",
  messagingSenderId: "1071789662705",
  appId: "1:1071789662705:web:96726f8c508f8aa6f9e450"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut as fbSignOut } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { doc, getDoc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

export async function ensureUserProfile(user) {
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const data = {
      email: user.email,
      displayName: user.displayName || user.email.split('@')[0],
      points: 0,
      createdAt: serverTimestamp(),
    };
    await setDoc(ref, data);
    return { ...data, createdAt: new Date() };
  }
  return snap.data();
}

export function requireAuth() {
  return new Promise(resolve => {
    const unsub = onAuthStateChanged(auth, async user => {
      unsub();
      if (!user) {
        window.location.replace('login.html');
      } else {
        try {
          const profile = await ensureUserProfile(user);
          resolve({ user, profile });
        } catch (err) {
          // Firestore unavailable — show the page with defaults so it doesn't blank out
          console.warn('Firestore profile error:', err);
          resolve({
            user,
            profile: {
              displayName: user.displayName || user.email?.split('@')[0],
              points: 0,
            }
          });
        }
      }
    });
  });
}

export function signOutAndRedirect() {
  return fbSignOut(auth).then(() => {
    window.location.replace('login.html');
  });
}

export { auth };

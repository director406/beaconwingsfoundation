import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../firebase';

function persistUser(userData) {
  localStorage.setItem('iiwc_currentUser', JSON.stringify(userData));
  window.dispatchEvent(new Event('storage'));
}

function clearUser() {
  localStorage.removeItem('iiwc_currentUser');
  localStorage.removeItem('iiwc_access_token');
  localStorage.removeItem('iiwc_refresh_token');
  window.dispatchEvent(new Event('storage'));
}

const FIREBASE_ERRORS = {
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/invalid-email':        'Invalid email address.',
  'auth/weak-password':        'Password must be at least 6 characters.',
  'auth/invalid-credential':   'Invalid email or password.',
  'auth/user-not-found':       'No account found with this email.',
  'auth/wrong-password':       'Incorrect password.',
  'auth/too-many-requests':    'Too many attempts. Please try again later.',
  'auth/configuration-not-found': 'Firebase Authentication is not enabled. Please enable Email/Password sign-in in the Firebase Console.',
};

export const registerUser = async ({ name, email, phone, role, password }) => {
  if (!isFirebaseConfigured) {
    return { success: false, message: 'Firebase is not configured. Add VITE_FIREBASE_* vars to .env.local and restart.' };
  }
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });

    const userData = { id: cred.user.uid, name, email, phone: phone || '', role: role || 'Volunteer' };
    persistUser(userData);

    // Background: save profile to Firestore without blocking the redirect
    if (db) {
      setDoc(doc(db, 'users', cred.user.uid), {
        name, email, phone: phone || '', role: role || 'Volunteer',
        createdAt: new Date().toISOString(),
      }).catch(() => {});
    }

    return { success: true, message: 'Account created successfully!', user: userData };
  } catch (err) {
    return { success: false, message: FIREBASE_ERRORS[err.code] || err.message };
  }
};

export const loginUser = async (email, password) => {
  if (!isFirebaseConfigured) {
    return { success: false, message: 'Firebase is not configured. Add VITE_FIREBASE_* vars to .env.local and restart.' };
  }
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    // Save immediately with Auth data so navigate fires without waiting for Firestore
    const userData = {
      id:    cred.user.uid,
      name:  cred.user.displayName || email,
      email: cred.user.email,
      phone: '',
      role:  'Volunteer',
    };
    persistUser(userData);

    // Background: enrich profile (role, phone) from Firestore without blocking
    if (db) {
      getDoc(doc(db, 'users', cred.user.uid))
        .then((snap) => {
          if (snap.exists()) {
            const p = snap.data();
            persistUser({ ...userData, name: p.name || userData.name, phone: p.phone || '', role: p.role || 'Volunteer' });
          }
        })
        .catch(() => {});
    }

    return { success: true, message: 'Login successful!', user: userData };
  } catch (err) {
    return { success: false, message: FIREBASE_ERRORS[err.code] || 'Login failed. Please try again.' };
  }
};

export const logoutUser = async () => {
  if (isFirebaseConfigured && auth) {
    try { await signOut(auth); } catch {}
  }
  clearUser();
};

export const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem('iiwc_currentUser');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => Boolean(getCurrentUser());

export const getAllUsers = () => [];

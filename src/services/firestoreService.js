import {
  collection, addDoc, getDocs, query, orderBy,
  serverTimestamp, where, doc, updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

function requireDb() {
  if (!db) throw new Error('Firebase is not configured. Add VITE_FIREBASE_* vars to .env.local');
}

// Compress image to ~600px wide, quality 0.6 — keeps it well under Firestore's 1MB doc limit
async function compressImage(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const MAX = 600;
      const scale = img.width > MAX ? MAX / img.width : 1;
      const canvas = document.createElement('canvas');
      canvas.width  = Math.round(img.width  * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.6));
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

export const saveSubscriber = async (email) => {
  requireDb();
  return addDoc(collection(db, 'subscribers'), {
    email,
    subscribedAt: serverTimestamp(),
  });
};

export const saveVolunteerApplication = async (data) => {
  requireDb();
  return addDoc(collection(db, 'volunteers'), {
    ...data,
    status:      'pending',
    submittedAt: serverTimestamp(),
  });
};

export const saveContactMessage = async (data) => {
  requireDb();
  return addDoc(collection(db, 'contact'), {
    ...data,
    isRead:      false,
    submittedAt: serverTimestamp(),
  });
};

// checkInData: { userId, userName, activity, location, beneficiaries, hours, notes, photo (dataUrl) }
export const saveCheckIn = async (checkInData) => {
  requireDb();
  const { userId, userName, activity, location, beneficiaries, hours, notes, photo } = checkInData;

  // Compress and store image directly in Firestore (no Storage bucket needed)
  const photoData = photo ? await compressImage(photo) : null;

  return addDoc(collection(db, 'checkins'), {
    userId,
    userName:      userName || '',
    activity:      activity || '',
    location:      location || '',
    beneficiaries: Number(beneficiaries) || 0,
    hours:         Number(hours)         || 0,
    notes:         notes || '',
    photo:         photoData,
    timestamp:     new Date().toISOString(),
    checkedInAt:   serverTimestamp(),
  });
};

// Fetch only this user's check-ins (for badge & personal stats)
export const getCheckIns = async (userId) => {
  requireDb();
  const q    = query(collection(db, 'checkins'), where('userId', '==', userId));
  const snap = await getDocs(q);
  const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return docs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// Fetch every volunteer's check-ins for the public feed, city stats, leaderboard
export const getAllCheckIns = async () => {
  requireDb();
  const snap = await getDocs(collection(db, 'checkins'));
  const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return docs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const getAllVolunteers = async () => {
  requireDb();
  const snap = await getDocs(query(collection(db, 'volunteers'), orderBy('submittedAt', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const updateVolunteerStatus = async (id, status) => {
  requireDb();
  await updateDoc(doc(db, 'volunteers', id), { status });
};

export const getAllContacts = async () => {
  requireDb();
  const snap = await getDocs(query(collection(db, 'contact'), orderBy('submittedAt', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const markContactRead = async (id) => {
  requireDb();
  await updateDoc(doc(db, 'contact', id), { isRead: true });
};
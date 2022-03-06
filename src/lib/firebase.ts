import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBekHlkqR5KwKLl0vH_5CpwnkradmOt91Y',
	authDomain: 'haja-project.firebaseapp.com',
	databaseURL: 'https://haja-project-default-rtdb.firebaseio.com',
	projectId: 'haja-project',
	storageBucket: 'haja-project.appspot.com',
	messagingSenderId: '965643333791',
	appId: '1:965643333791:web:a799189abe33aa2c9972aa',
	measurementId: 'G-N04NR104NT'
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();

const db = getFirestore(app);

export const getDocument = async ({ source, isTeam = false, type, id }) => {
	return await getDoc(doc(db, `${isTeam ? 'teams' : 'users'}/${source}/${type}/${id}`));
};

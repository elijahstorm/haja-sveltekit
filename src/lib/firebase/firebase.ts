import { initializeApp } from "firebase/app"
// import { getAnalytics } from 'firebase/analytics';
import {
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	type UserCredential
} from "firebase/auth"
import { doc, getDoc, getFirestore } from "firebase/firestore"
import session from "./session"

const firebaseConfig = {
	apiKey: "AIzaSyBekHlkqR5KwKLl0vH_5CpwnkradmOt91Y",
	authDomain: "haja-project.firebaseapp.com",
	databaseURL: "https://haja-project-default-rtdb.firebaseio.com",
	projectId: "haja-project",
	storageBucket: "haja-project.appspot.com",
	messagingSenderId: "965643333791",
	appId: "1:965643333791:web:a799189abe33aa2c9972aa",
	measurementId: "G-N04NR104NT"
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

const auth = getAuth()

const loginPipe = async (pipe) => {
	let error: string, user: UserCredential

	try {
		user = await pipe()
		getAuth()
	} catch (e) {
		error = e
	}

	return {
		user,
		error
	}
}

export const loginWithGoogle = async () => {
	return loginPipe(() => {
		signInWithPopup(auth, new GoogleAuthProvider())
	})
}
export const loginWithInfo = async (email: string, password: string) => {
	return loginPipe(() => {
		signInWithEmailAndPassword(auth, email, password)
	})
}

export const signOut = () => {
	auth.signOut()
}

const db = getFirestore(app)

export const getDocument = async ({ source, isTeam = false, type, id }) => {
	return await getDoc(doc(db, `${isTeam ? "teams" : "users"}/${source}/${type}/${id}`))
}

onAuthStateChanged(auth, (user) => {
	session.set({
		user
	})
})

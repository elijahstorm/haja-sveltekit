import { initializeApp } from "firebase/app"
// import { getAnalytics, isSupported } from "firebase/analytics"
import {
	addDoc,
	collection,
	doc,
	DocumentReference,
	DocumentSnapshot,
	getDoc,
	getDocs,
	getFirestore,
	limit,
	query,
	QuerySnapshot,
	serverTimestamp,
	setDoc,
	where,
	type DocumentData,
	type WhereFilterOp
} from "firebase/firestore"
import {
	createUserWithEmailAndPassword,
	FacebookAuthProvider,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	updatePassword,
	type UserCredential
} from "firebase/auth"
import session from "./session"
import type { AllContentTypes, ContentConfig } from "$lib/content/Content"

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	databaseURL: import.meta.env.VITE_DATABASE_URL,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
// const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null))

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

export const awaitMyId: () => Promise<string> = () => {
	return new Promise<string>((resolveOuter) => {
		const existing = myId()

		if (existing != null) {
			resolveOuter(existing)
			return
		}

		session.subscribe(async ({ user, ready }) => {
			if (!ready) return

			resolveOuter(user?.uid ?? "")
		})
	})
}
export const myId = (): string | null => {
	return auth.currentUser?.uid
}
export const loginWithGoogle = async () => {
	return loginPipe(() => {
		signInWithPopup(auth, new GoogleAuthProvider())
	})
}
export const loginWithFacebook = async () => {
	return loginPipe(() => {
		signInWithPopup(auth, new FacebookAuthProvider())
	})
}
export const loginWithInfo = async (email: string, password: string) => {
	return loginPipe(() => {
		signInWithEmailAndPassword(auth, email, password)
	})
}
export const newUser = async (email: string, password: string) => {
	return loginPipe(async () => {
		await createUserWithEmailAndPassword(auth, email, password)
		sendEmailVerification(auth.currentUser)
	})
}
export const changePassword = async (password: string, requestLink?: string) => {
	return loginPipe(async () => {
		await updatePassword(auth.currentUser, password)
	})
}
export const lostPassword = async (email: string) => {
	return loginPipe(async () => {
		await sendPasswordResetEmail(auth, email)
	})
}

export const signOut = () => {
	auth.signOut()
}

onAuthStateChanged(auth, (user) => {
	session.set({
		user,
		ready: true
	})
})

const requestLimit = 50,
	requestTimeout = 36000000 // 10 minutes in milliseconds

export const getDocument: (data: {
	id: string
	source?: string
	isTeam?: boolean
	type?: string
}) => Promise<DocumentSnapshot<DocumentData>> = ({
	source = null,
	isTeam = false,
	type = null,
	id
}) => {
	let api = isTeam ? "teams" : "users"

	if (source != null && type != null && id != null) {
		api += `/${source}/${type}`
	}

	api += `/${id}`

	return getDoc(doc(db, api))
}

export const uploadDocument: (data: {
	content: AllContentTypes
	source?: string
	type?: string
	isTeam?: boolean
	timestamp?: string
}) => Promise<DocumentReference<DocumentData>> = ({
	content,
	source = null,
	type = null,
	isTeam = false,
	timestamp = "date"
}) => {
	let api = isTeam ? "teams" : "users"

	if (source != null && type != null) {
		api += `/${source}/${type}`
	}

	delete content.id
	delete content.contentType
	content[timestamp] = serverTimestamp()

	return addDoc(collection(db, api), content)
}

export const updateDocument: (data: {
	id: string
	content: AllContentTypes
	source?: string
	type?: string
	isTeam?: boolean
	timestamp?: string
}) => Promise<void> = ({
	id,
	content,
	source = null,
	type = null,
	isTeam = false,
	timestamp = "date"
}) => {
	let api = isTeam ? "teams" : "users"

	if (source != null && type != null) {
		api += `/${source}/${type}`
	}

	api += `/${id}`

	delete content.id
	delete content.contentType
	content[timestamp] = serverTimestamp()

	return setDoc(doc(db, api), content, { merge: true })
}

export const storeQuery: (data: {
	source?: string
	isTeam?: boolean
	type?: string
	amount?: number
	queries: {
		type: string
		compare: WhereFilterOp
		value: any
	}[]
}) => Promise<QuerySnapshot<DocumentData>> = ({
	source = null,
	isTeam = false,
	type = null,
	amount = 50,
	queries
}) => {
	const queryList = queries.map((query) => {
		return where(query.type, query.compare, query.value)
	})

	let api = isTeam ? "teams" : "users"

	if (source != null && type != null) {
		api += `/${source}/${type}`
	}

	return getDocs(query(collection(db, api), ...queryList, limit(amount)))
}

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
	orderBy,
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
import type { AllContentTypes, SendContentConfig } from "$lib/content/Content"
import { ErrorMessaging } from "./errors"

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

const loginPipe: (pipe: () => Promise<void>) => Promise<{ error?: string }> = async (pipe) => {
	return await new Promise((resolve) => {
		pipe()
			.then(() => {
				resolve({})
			})
			.catch((e) => {
				resolve({
					error: ErrorMessaging(e.code)
				})
			})
	})
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
export const loginWithGoogle = () => {
	return loginPipe(async () => {
		await signInWithPopup(auth, new GoogleAuthProvider())
	})
}
export const loginWithFacebook = () => {
	return loginPipe(async () => {
		await signInWithPopup(auth, new FacebookAuthProvider())
	})
}
export const loginWithInfo = (email: string, password: string) => {
	return loginPipe(async () => {
		await signInWithEmailAndPassword(auth, email, password)
	})
}
export const newUser = (email: string, password: string) => {
	return loginPipe(async () => {
		await createUserWithEmailAndPassword(auth, email, password)
		await sendEmailVerification(auth.currentUser)
	})
}
export const changePassword = (password: string, requestLink?: string) => {
	return loginPipe(async () => {
		await updatePassword(auth.currentUser, password)
	})
}
export const lostPassword = (email: string) => {
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
	content: SendContentConfig
	source?: string
	type?: string
	isTeam?: boolean
	timestamp?: string
}) => Promise<DocumentReference<DocumentData>> = ({
	content,
	source = null,
	type = null,
	isTeam = false,
	timestamp = "created"
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
	content: SendContentConfig
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
	timestamp = "edited"
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
	timestamp?: string
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
	timestamp = "date",
	queries
}) => {
	const queryList = queries.map((query) => {
		return where(query.type, query.compare, query.value)
	})

	let api = isTeam ? "teams" : "users"

	if (source != null && type != null) {
		api += `/${source}/${type}`
	}

	return getDocs(
		query(collection(db, api), ...queryList, orderBy(timestamp, "desc"), limit(amount))
	)
}

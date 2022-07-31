import "./firebase"
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
	updatePassword
} from "firebase/auth"
import session from "./session"
import { ErrorMessaging } from "./errors"

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

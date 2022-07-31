import "./firebase"
import {
	getFirestore,
	addDoc,
	collection,
	doc,
	DocumentReference,
	DocumentSnapshot,
	getDoc,
	getDocs,
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
import type { SendContentConfig } from "$lib/content/Content"
import { firebaseApp } from "./firebase"
import { pipe } from "$lib/utils"
import { recentRequests } from "./stores"

const db = getFirestore(firebaseApp)

const requestLimit = 100,
	requestTimeout = 36000000 // 10 minutes in milliseconds

type StoreLocation = {
	id?: string
	source?: string
	isTeam?: boolean
	type?: string
}

const api: (data: StoreLocation) => () => string = ({
	source = null,
	isTeam = false,
	type = null,
	id = null
}) => {
	let api = isTeam ? "teams" : "users"

	if (source != null && type != null) {
		api += `/${source}/${type}`
	}

	if (id != null) {
		api += `/${id}`
	}

	return () => api
}

const connect = (store) => (api: string) => store(db, api)

const clense = (content, timestamp) => (location) => {
	delete content.id
	delete content.contentType
	content[timestamp] = serverTimestamp()

	return {
		location,
		content
	}
}

const upload =
	(protocol, options = null) =>
	(data) =>
		protocol(data.location, data.content, options)

export const getDocument: (data: StoreLocation) => Promise<DocumentSnapshot<DocumentData>> = ({
	source = null,
	isTeam = false,
	type = null,
	id
}) => pipe(api({ source, isTeam, type, id }), connect(doc), getDoc)

export const uploadDocument: (
	data: StoreLocation & {
		content: SendContentConfig
		timestamp?: string
	}
) => Promise<DocumentReference<DocumentData>> = ({
	content,
	source = null,
	type = null,
	isTeam = false,
	timestamp = "created"
}) =>
	pipe(
		api({ source, type, isTeam }),
		connect(collection),
		clense(content, timestamp),
		upload(addDoc)
	)

export const updateDocument: (
	data: StoreLocation & {
		content: SendContentConfig
		timestamp?: string
	}
) => Promise<void> = ({
	id,
	content,
	source = null,
	type = null,
	isTeam = false,
	timestamp = "edited"
}) =>
	pipe(
		api({ source, type, isTeam, id }),
		connect(doc),
		clense(content, timestamp),
		upload(setDoc, { merge: true })
	)

export const storeQuery: (
	data: StoreLocation & {
		amount?: number
		timestamp?: string
		queries: {
			type: string
			compare: WhereFilterOp
			value: any
		}[]
	}
) => Promise<QuerySnapshot<DocumentData>> = ({
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

	return pipe(
		api({ source, isTeam, type }),
		connect(collection),
		(v) => query(v, ...queryList, orderBy(timestamp, "desc"), limit(amount)),
		getDocs
	)
}

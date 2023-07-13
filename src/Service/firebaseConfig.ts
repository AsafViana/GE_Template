// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { sendPasswordResetEmail, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect, sendEmailVerification, signInAnonymously } from 'firebase/auth'
import { getDatabase, set, ref, onValue, get, child, update, remove } from 'firebase/database'
import { collection, addDoc, getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { getStorage, ref as refStorage, uploadBytes, getDownloadURL } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyApJgNnb9-1fT8mcY9byyBxAbO7xva9lRY',
	authDomain: 'gerenciamento-de-estoque-9f83d.firebaseapp.com',
	databaseURL: 'https://gerenciamento-de-estoque-9f83d-default-rtdb.firebaseio.com',
	projectId: 'gerenciamento-de-estoque-9f83d',
	storageBucket: 'gerenciamento-de-estoque-9f83d.appspot.com',
	messagingSenderId: '325691930674',
	appId: '1:325691930674:web:bbe75c95caed2760d0a42b',
	measurementId: 'G-KMY4XNFT2T',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const database = getDatabase(app)
const firestore = getFirestore(app)
const dbRef = ref(database)
const storage = getStorage(app)

export {
	auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	provider,
	signInWithPopup,
	signInWithRedirect,
	firestore,
	collection,
	addDoc,
	sendEmailVerification,
	doc,
	setDoc,
	sendPasswordResetEmail,
	database,
	ref,
	set,
	onValue,
	dbRef,
	get,
	child,
	update,
	remove,
	signInAnonymously,
	getDoc,
	storage,
	refStorage,
	uploadBytes,
	getDownloadURL
}

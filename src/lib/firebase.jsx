// lib/firebase.js
import { initializeApp, getApps } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDqzxKQROqzjNZCCfd-tbxpd33KrYHY8Rw',
  authDomain: 'my-portfolio-820d4.firebaseapp.com',
  databaseURL: 'https://my-portfolio-820d4-default-rtdb.firebaseio.com',
  projectId: 'my-portfolio-820d4',
  storageBucket: 'my-portfolio-820d4.firebasestorage.app',
  messagingSenderId: '961021877241',
  appId: '1:961021877241:web:43205c2d9368bd424bbb28',
  measurementId: 'G-FCVEDZCPS1',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

//  Firestore
const db = getFirestore(app)

//  Auth
const auth = getAuth(app)

//  Exports
export { app, db, auth, collection, getDocs, query, orderBy }

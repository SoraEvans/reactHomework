import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBL4DxnrBwcebu80TdqVS3RWNQt9VOz8hA",
    authDomain: "homework-6269b.firebaseapp.com",
    databaseURL: "https://homework-6269b-default-rtdb.firebaseio.com",
    projectId: "homework-6269b",
    storageBucket: "homework-6269b.appspot.com",
    messagingSenderId: "917246926472",
    appId: "1:917246926472:web:0c5242759dee9524f7093d"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const database = getDatabase(app)

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBwkj6lvWaZzDNNi2RLZ-vsa9RnEKCpy2U",
    authDomain: "project1-fa8d6.firebaseapp.com",
    projectId: "project1-fa8d6",
    storageBucket: "project1-fa8d6.firebasestorage.app",
    messagingSenderId: "134542618452",
    appId: "1:134542618452:web:86d28f04b8f59fa34de2c1",
    measurementId: "G-QVMPQFJ727"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

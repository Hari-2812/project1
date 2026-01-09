import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../firebase"

const provider = new GoogleAuthProvider()

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider)
  const user = result.user

  // Get Firebase ID Token
  const token = await user.getIdToken()
  return token
}

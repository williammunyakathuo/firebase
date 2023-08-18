import { auth, googleAuth } from "../config/firebase";
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = async()=>{
        try {
            await createUserWithEmailAndPassword( auth, email, password)
        } catch (error) {
            console.log(error)
        }
      
    }
    

    const signInWithGoogle = async () =>{
        try {
            await signInWithPopup(auth, googleAuth)
        } catch (error) {
            console.log(error)
        }
    }

    const LogOut = async ()=>{
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }
     
   
   
    return ( 
        <div className="auth">
            <input type="text" 
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" 
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}>Sign in with google</button>

            <button onClick={LogOut}> LogOut</button>
        </div>

        
     );
}
 
export default Auth;
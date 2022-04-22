import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';


function SignIn() {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup(); //destructure of the response
        // console.log(user); 
        const userDocRef = await createUserDocumentFromAuth(user); // Check if there is exisitng records and to create database doc
    }

  return (
    <div>
    <h1>Sign-in</h1>
    <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  )
}

export default SignIn;

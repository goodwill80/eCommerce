// STEP 1 (IMPORT NEC MODULES)
import { initializeApp } from 'firebase/app'
// Authentication
// All these modules are imported from firebase auth
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword } 
from 'firebase/auth';
// Database
// All these modules are imported from firebase store
import {
    getFirestore,
    doc, //getting an instance of the doc
    getDoc, //get to read the doc
    setDoc // change the data
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCfhQjJCiQyx9CT-OeZunBHKI_C5uBFYCk",
    authDomain: "online-shop-f70ba.firebaseapp.com",
    projectId: "online-shop-f70ba",
    storageBucket: "online-shop-f70ba.appspot.com",
    messagingSenderId: "985328494361",
    appId: "1:985328494361:web:90794ba79fdc5b5ecf4788"
  };
  
  const firebaseapp = initializeApp(firebaseConfig);

  // STEP 2 (SET UP GOOGLE AUTH)
  //Google requirement for provider
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: 'select_account'
  });

  // Instantiate the authentication
  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


  // STEP 3 (CREATE DATABASE DOC WITH THE AUTH RESPONSE FROM GOOGLE)
  // a. Instantiate fire store database
  export const db = getFirestore(); // get database
  // b. createdatabase
  export const createUserDocumentFromAuth = async (userAuth, additionalInformation) =>{ // userAuth is the response from google auth signinwithpopup
      if(!userAuth) return;
    // Create an instance of document with the uid 
      // Arguments -  doc(nameOfFirebase - above 'db', NameWeGiveToCollection-we provide, uniqueID-choose ourself)
      const userDocRef = doc(db, 'users', userAuth.uid); //instance of doc generated from google auth
    //   console.log(userDocRef);
      // Access and read the user info from the auth instance of userDocRef
      const userSnapshot = await getDoc(userDocRef);
    //   console.log(userSnapshot);
    //   console.log(userSnapshot.exists()); //check if the user data exist
      if(!userSnapshot.exists()) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();
          try {
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation })
          } catch (error) {
              console.log(error.message)
          }
      }
      return userDocRef;
  }

  // if user data exist 
  // Yes - return userDocRef
  // if user data does not exist
  // Then use setDoc to create the data in db


  // Step 4 after you set up the sign up form for new users
  export const createAuthUserWithEmailAndPassword = async(email, password)=>{
    if(!email || !password) return;
    return createUserWithEmailAndPassword(auth, email, password);
  }
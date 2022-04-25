import { initializeApp } from 'firebase/app'

// FIREBASE AUTHENTICATION MODULES
// All these modules are imported from firebase auth
import { 
    getAuth, // auth method from firebase 
    signInWithRedirect, 
    signInWithPopup, // route to 3rd parties sign in i.e. Google, faceback
    GoogleAuthProvider, //get user access token from google
    createUserWithEmailAndPassword, // create user access token from sign up info
    signInWithEmailAndPassword, // use existing use info to sign in
    signOut, // use for signing out a user
    onAuthStateChanged // return back a listener
} from 'firebase/auth';

// FIREBASE DATABASE MODULES
// All these modules are imported from firebase store
import {
    getFirestore, //initialize firestore
    doc, //getting an instance of the doc
    getDoc, //get to read the doc
    setDoc // change the data
} from 'firebase/firestore'

// COPY and PASTSE from FIREBASE SETUP
const firebaseConfig = {
    apiKey: "AIzaSyCfhQjJCiQyx9CT-OeZunBHKI_C5uBFYCk",
    authDomain: "online-shop-f70ba.firebaseapp.com",
    projectId: "online-shop-f70ba",
    storageBucket: "online-shop-f70ba.appspot.com",
    messagingSenderId: "985328494361",
    appId: "1:985328494361:web:90794ba79fdc5b5ecf4788"
  };
  
  // Initialize main confiq
  const firebaseapp = initializeApp(firebaseConfig);

  //PROVIDERS (i.e. GOOGLE, FACEBOOK)
  //Google requirement for provider
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: 'select_account'
  });
  //Initialize auth for sign in with 3rd parties provider
  export const auth = getAuth();

  // THREE METHODS BELOW ( to SIGN UP with GOOGLE or EMAIL, and to sign in with exising profile )

  // 1. Instantiate Google authentication and get back USER OBJECT
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  // 2. Instantial New User sign-up and get back USER OBJECT
  export const createAuthUserWithEmailAndPassword = async(email, password)=>{
    if(!email || !password) return;
    return createUserWithEmailAndPassword(auth, email, password);
  }

   // 3. Sign in with existing users' email and password
   export const signInAuthUserWithEmailAndPassword = async(email, password)=>{
    if(!email || !password) return;
    return signInWithEmailAndPassword(auth, email, password);
  }

    // 4. SIGN - OUT METHOD
    export const signOutUser = async ()=> await signOut( auth );

    // 5. Set up an open observer Listener - this passes a callback as main parameter 
    // it will then return the same callback as the 2nd paramenter of the onAuthstateChanged, 
    // next to auth state
    // Therefore, it provides a listener to whenever there is an auth state change
    export const onAuthStateChangedListener = (callback)=> onAuthStateChanged(auth, callback);


  // Instantiate fire store database - 
  export const db = getFirestore(); // get database
  
  // Creation of a new document in DataBase - Need to pass in USER OBJECT 
  export const createUserDocumentFromAuth = async (userAuth, additionalInformation) =>{ // userAuth is the response from google auth signinwithpopup
      if(!userAuth) return;
    // Create an instance of document with the uid 
      // Arguments -  doc(nameOfFirebase - above 'db', NameWeGiveToCollection, 
      // uniqueID-choose by ourself)
      const userDocRef = doc(db, 'users', userAuth.uid); //instance of doc generated from google auth
    //   console.log(userDocRef);
      // Access and read the user info from the auth instance of userDocRef
      const userSnapshot = await getDoc(userDocRef);
    //   console.log(userSnapshot);
    //   Check if user document already exist in db. If no, create new, if yes, return back
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





 
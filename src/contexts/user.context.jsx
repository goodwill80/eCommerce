import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
const UserContext = createContext();

function UserContextProvider (props) {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser }
    // our open listener to alert whenever there is a change in user auth
    // hence, whenever sign-in, it will return a user obj, sign-out, it will return null
    // this will allow us to centralise our sign-out methods in sign-in, sign-out and navigation in 1 place
    useEffect(()=>{
        const unsubcribe = onAuthStateChangedListener((user)=>{
            console.log(user);
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user); // cover both user sign-in and sign-out scenario
        });
        return unsubcribe;
    }, [])

  return (
    <UserContext.Provider value={value}>
        { props.children }
    </UserContext.Provider>
  )
}
export { UserContext, UserContextProvider }

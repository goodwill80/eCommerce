import { useState } from 'react';
import { createUserDocumentFromAuth, 
        signInWithGooglePopup,
        signInAuthUserWithEmailAndPassword
    } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';

function SignInForm() {
    const defaultForm = {
        email: '',
        password: ''
    }
    const [form, setForm] = useState(defaultForm);
    const { email, password } = form;
    const resetForm = ()=> setForm(defaultForm);

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup(); //destructure of the response from google
        await createUserDocumentFromAuth(user); // Check if there is exisitng records and to create database doc
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            resetForm(); 
        } catch (error) {
           switch(error.code) {
               case 'auth/wrong-password':
                   alert('incorrect password for email')
                   break;
               case 'auth/user-not-found':
                   alert('no user associated with this email')
                   break;
                default:
                    console.log(error);
           }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    return (
         <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
             
                  <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                    Google sign in
                    </Button>
                    </div>
            </form>
        </div>
    )
}

export default SignInForm;

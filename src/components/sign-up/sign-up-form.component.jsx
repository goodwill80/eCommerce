import { async } from '@firebase/util';
import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from '../button/button.component';

function SignUpForm() {
    const defaultForm = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [form, setForm] = useState(defaultForm);
    const { displayName, email, password, confirmPassword } = form;
    const resetForm = ()=> setForm(defaultForm);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Confirm password differs from orginal input")
        }
        try {
            // add to user auth in firebase - only email and password is added
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            // add to firestore db of all details plus display name
            await createUserDocumentFromAuth(user, { displayName });
            resetForm(); 
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert("Cannot create user. Email is already registered in our records");
                resetForm();
            }
            console.log(`Error found: ${error}`);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    return (
         <div className="sign-up-container">
                <h2>Don't have an account?</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                />
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
                  <FormInput
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                />
               <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default SignUpForm;

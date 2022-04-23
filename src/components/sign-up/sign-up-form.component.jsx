import { async } from '@firebase/util';
import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

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
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
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
        <div>
            <div>
                <h1>Sign up with your email and password</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Display Name</label>
                <input type="text" name="displayName" value={displayName} onChange={handleChange} required />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={handleChange} required />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={handleChange} required />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUpForm;

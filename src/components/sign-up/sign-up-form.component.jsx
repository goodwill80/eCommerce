import { useState } from 'react';

function SignUpForm () {

    const defaultForm = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [form, setForm] = useState(defaultForm);
    const { displayName, email, password, confirmPassword } = form;

    const handleSubmit = (e)=>{
        e.preventDefault();
    }

    const handleChange = (e)=> {
        const { name, value } = e.target;
        setForm({...form, [name]: value});
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

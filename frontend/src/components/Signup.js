import React, { useState } from 'react';
import { signup } from '../api';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(formData);
        alert('User created');
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" onChange={handleChange} placeholder="Username" required />
                <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
                <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;

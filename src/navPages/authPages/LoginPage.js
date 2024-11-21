// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { useAuth } from '../../Context/AuthContext';
import {login} from '../../api/auth';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {Clogin} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Clear any previous error

        try {
            const [userId, isAdmin] = await login(email, password); // Call the login function
            Clogin(userId, isAdmin); // Save user ID in context
            navigate('/'); // Or navigate to a default page if the last page was /signup

        } catch (err) {
            setError(err.message); // Display error message
        }

    };

    return (
        <div className={styles.loginContainer}>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        type="email"
                        id="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        type="password"
                        id="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.loginButton}>Log In</button>
            </form>
        </div>
    );
}

export default LoginPage;

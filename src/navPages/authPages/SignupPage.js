// SignupPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css'; // Using the same styles as LoginPage
import { signup } from '../../api/auth'; // Import your signup function

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null); // Clear any previous error

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await signup(email, password, username); // Call the signup function
            navigate('/login'); // Redirect to login page after successful signup
        } catch (err) {
            setError(err.message); // Display error message
        }
    };

    return (
        <div className={styles.loginContainer}>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleSignup} className={styles.loginForm}>
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
                    <label htmlFor="username" className={styles.label}>Username</label>
                    <input
                        type="text"
                        id="username"
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className={styles.input}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.loginButton}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignupPage;

import { useNavigate } from 'react-router-dom';
import styles from './LoginRedirect.module.css';

function LoginRedirect({ redirectPath = "/login", signUpPath = "/signup" }) {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate(redirectPath);
    };

    const handleSignUpRedirect = () => {
        navigate(signUpPath);
    };


    return (
        <>
            <h3 className={styles.title}>Access Restricted</h3>
            <p className={styles.description}>
                Please log in or sign up to view this content.
            </p>
            <div className={styles.buttonContainer}>
                <button className={styles.loginButton} onClick={handleLoginRedirect}>Log In</button>
                <button className={styles.signUpButton} onClick={handleSignUpRedirect}>Sign Up</button>
            </div>
        </>
    );
}

export default LoginRedirect;

import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useAuth } from '../../Context/AuthContext';

export default function NavBar() {
    const { id, logout, admin } = useAuth();
    const navigate = useNavigate();

    function login() {
        navigate('/login');
    }

    function signUp() {
        navigate('/signup');
    }

    const NavItem = ({ name, to }) => {
        return (
            <NavLink
                to={to}
                className={({ isActive }) =>
                    isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                }
            >
                <h3>{name}</h3>
            </NavLink>
        );
    };

    return (
        <div className={styles.NavBar}>
            <div className={styles.logo}><h1>Formula Bingo</h1></div>
            <div className={styles.nav}>
                <NavItem name="Home" to="/" />
                <NavItem name="Cards" to="/cards" />
                <NavItem name="Leaderboard" to="/leaderboard" />
                {admin && <NavItem name="Bricks" to="/bricks"/>}
                {id && <NavItem name="Profile" to="/profile" />}
                {id ? (
                    <button className={styles.button} onClick={logout}>Log out</button>
                ) : (
                    <div className={styles.authButtons}>
                        <button className={styles.button} onClick={login}>Log in</button>
                        <button className={styles.button} onClick={signUp}>Sign up</button>
                    </div>
                )}
            </div>
        </div>
    );
}

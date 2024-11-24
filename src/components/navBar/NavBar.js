import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserCircle, faTrophy, faCogs, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
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

    const NavItem = ({ name = "", icon = null, to }) => {
        return (
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `${styles.navItem} 
    ${isActive ? styles.active : ''} 
    ${icon && isActive ? styles.mobileActive : ''}`
                }

            >
                <h3>{name}</h3>
                {icon && <FontAwesomeIcon icon={icon} size={"xl"}/>}
            </NavLink>
        );
    };

    return (
        <div className={styles.NavBar}>
            <div className={styles.logo}><h1>Grand Prix Bingo</h1></div>
            <div className={`${styles.nav} Desktop`}>
                <NavItem name="Home" to="/"/>
                <NavItem name="Cards" to="/cards"/>
                <NavItem name="Leaderboard" to="/leaderboard"/>
                {admin && <NavItem name="Admin" to="/admin/bricks"/>}
                {id && <NavItem name="Profile" to="/profile"/>}
                {id ? (
                    <button className={styles.button} onClick={logout}>Log out</button>
                ) : (
                    <div className={styles.authButtons}>
                        <button className={styles.button} onClick={login}>Log in</button>
                        <button className={styles.button} onClick={signUp}>Sign up</button>
                    </div>
                )}
            </div>
            <div className={`${styles.MobileNav} Mobile`}>
                <NavItem icon={faHome} to="/"/>
                <NavItem icon={faLayerGroup} to="/cards"/>
                <NavItem icon={faTrophy} to="/leaderboard"/>
                {admin && <NavItem icon={faCogs} to="/admin/bricks"/>}
                {id && <NavItem icon={faUserCircle} to="/profile"/>}

            </div>


        </div>
    );
}

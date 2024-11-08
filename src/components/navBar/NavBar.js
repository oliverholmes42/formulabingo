import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';

export default function NavBar() {
    const {id, logout} = useAuth();
    const navigate = useNavigate();

    function login(){
        navigate('/login');
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
                <NavItem name="Profile" to="/profile" />
                {id?<button className={styles.button} onClick={logout}>Log out</button> : <button className={styles.button} onClick={()=>login(1)}>Log in</button>}
                
            </div>
        </div>
    );
}

import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import styles from './AdminPage.module.css'
import {useAuth} from "../../Context/AuthContext";

export default function AdminPage({props}){
    const {id, admin} = useAuth()
    const NavItem = ({to, title}) => {
        return(
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `${styles.navItem} 
    ${isActive ? styles.active : ''}`
                }
            >
                <h2>{title}</h2>
            </NavLink>

        )
    }
    const navigate = useNavigate()
    useEffect(() => {
        if(!id||!admin){
            navigate("/login");
        }

    }, [admin, id, navigate]);
    return(
        <>
            {id==1 && <div className={styles.navBar}>

                <NavItem to={"/admin/bricks"} title={"Bricks"}/>
                <NavItem to={"/admin/users"} title={"Users"}/>

            </div>}

            <Outlet/>
        </>
    )
}

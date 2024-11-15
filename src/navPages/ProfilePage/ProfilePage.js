import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./ProfilePage.module.css";
import {useAuth} from "../../Context/AuthContext";
import {Read, Update} from "../../api/User";
import Modal from "../../components/Modal/Modal";
import EditProfile from "../../components/EditProfile/EditProfile";
import {changePassword} from "../../api/auth"; // Import the CSS module

export default function Profile() {
    const { id } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (!id) {
            navigate("/login");
        } else {
            const fetchData = async () => {
                const response = await Read(id);
                setUserData(response);
            };
            fetchData();
        }
    }, [id]);

    const submit = async (data) => {
        try {
            await Update(id, data); // Update user via API
            setEdit(false); // Exit edit mode
            setUserData(data); // Update local state with server response
        } catch (error) {
            alert(`Error updating profile: ${error.message}`);
        }
    };

    const changePass = async (oldPassword, newPassword) => {
        try {
            await changePassword(id, oldPassword, newPassword);
        }catch (Error){
            console.log(Error)
        }
    }


    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <div className={styles.profileDetails}>
                    <h1 className={styles.username}>{userData.username || "Username"}</h1>
                    <p className={styles.email}>{userData.email || "email@example.com"}</p>
                    <p className={styles.bio}>
                        {userData.bio || "This user hasn’t written a bio yet."}
                    </p>
                </div>
                <button className={styles.editButton} onClick={()=>setEdit(true)}>Edit Profile</button>
            </div>
            <div className={styles.statsSection}>
                <h2>Statistics</h2>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <h3>Total Points</h3>
                        <p>{userData.total_points || 0}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Bingo Cards</h3>
                        <p>{userData.card_count || 0}</p>
                    </div>
                </div>
            </div>
            {edit &&
                <Modal closeModal={()=>setEdit(false)}>
                    <EditProfile user={userData} onSave={submit} onChangePassword={changePass}/>
                </Modal>}
        </div>
    );
}
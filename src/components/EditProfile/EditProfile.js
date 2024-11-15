import { useState } from "react";
import styles from "./EditProfile.module.css"; // Import CSS module

export default function EditProfile({ user, onSave, onChangePassword }) {
    const [userData, setUserData] = useState(user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isChangingPassword, setIsChangingPassword] = useState(false); // Track mode
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (isChangingPassword) {
            setPasswordData((prev) => ({ ...prev, [name]: value }));
        } else {
            setUserData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        try {
            await onSave(userData);
        } catch (err) {
            setError("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        setLoading(true);
        setError(null);

        try {
            await onChangePassword(passwordData.oldPassword, passwordData.newPassword); // Call password change API
            setIsChangingPassword(false); // Go back to profile edit mode
        } catch (err) {
            console.log(err)
            setError("Failed to change password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!isChangingPassword ? (
                <>
                    <h1 className={styles.header}>Edit Profile</h1>
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="username" className={styles.label}>
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={userData.username || ""}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email || ""}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="bio" className={styles.label}>
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={userData.bio || ""}
                                onChange={handleChange}
                                rows="4"
                                className={styles.textarea}
                            />
                            <button
                                type="button"
                                onClick={() => setIsChangingPassword(true)} // Switch to password change mode
                                className={styles.secondaryButton}
                            >
                                Change Password
                            </button>
                        </div>

                        {error && <p className={styles.error}>{error}</p>}

                        <button
                            type="button"
                            onClick={handleSave}
                            className={styles.button}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>

                    </form>
                </>
            ) : (
                <>
                    <button
                        type="button"
                        onClick={() => setIsChangingPassword(false)} // Go back to profile edit mode
                        className={styles.secondaryButton}
                        style={{marginRight: "auto"}}
                    >
                        Back
                    </button>
                    <h1 className={styles.header}>Change Password</h1>
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="oldPassword" className={styles.label}>
                                Current Password
                            </label>
                            <input
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                value={passwordData.oldPassword}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="newPassword" className={styles.label}>
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>
                        {error && <p className={styles.error}>{error}</p>}
                        <button
                            type="button"
                            onClick={handleChangePassword}
                            className={styles.button}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Change Password"}
                        </button>
                    </form>
                </>
            )}
        </>
    );
}

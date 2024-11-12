import { useNavigate } from 'react-router-dom';
import styles from "./Modal.module.css";

export default function Modal({ children, closeModal }) {
    const navigate = useNavigate();
    
    // Set default closeModal to navigate back if not provided
    const handleClose = closeModal || (() => navigate(-1));

    return (
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={handleClose}>✕</button>
                {children}
            </div>
        </div>
    );
}

import styles from './LeaderBoard.module.css';

export function Leaderboard({ data, title, setCard }) {
    const { topThree, currentUser } = data;

    // Helper function to determine rank style
    const getRankClass = (rank) => {
        if (rank === 1) return styles.rankGold;
        if (rank === 2) return styles.rankSilver;
        if (rank === 3) return styles.rankBronze;
        return styles.rankDefault;
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.table}>
                {topThree.map((user) => (
                    <div
                        key={user.id}
                        className={`${styles.row} ${user.id === currentUser?.id ? styles.currentUser : ''}`}
                        onClick={() => setCard(user.card_id)}
                    >
                        <div className={`${styles.rank} ${getRankClass(user.rank)}`}>
                            #{user.rank}
                        </div>
                        <div className={styles.content}>
                            <div className={styles.name}>{user.user_name}</div>
                            <div className={styles.horizontalInfo}>
                                <span>Card ID: {user.card_id}</span>
                                <span className={styles.points}>{user.total_points} pts</span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Display ellipsis and current user below if they’re not in the top 3 */}
                {!topThree.some(user => user.id === currentUser?.id) && currentUser && (
                    <>
                        <div className={styles.ellipsis}>...</div>
                        <div
                            className={`${styles.row} ${styles.currentUser}`}
                            onClick={() => setCard(currentUser.card_id)}
                        >
                            <div className={`${styles.rank} ${getRankClass(currentUser.rank)}`}>
                                #{currentUser.rank}
                            </div>
                            <div className={styles.content}>
                                <div className={styles.name}>{currentUser.user_name}</div>
                                <div className={styles.horizontalInfo}>
                                    <span>Card ID: {currentUser.card_id}</span>
                                    <span className={styles.points}>{currentUser.total_points} pts</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

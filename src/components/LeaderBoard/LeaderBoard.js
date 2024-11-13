import styles from './LeaderBoard.module.css';

export function Leaderboard({ data, title }) {
    const { topThree, currentUser } = data;

    // Check if the current user is in the top 3 (if currentUser exists)
    const isCurrentUserInTopThree = currentUser 
        ? topThree.some(user => user.id === currentUser.id)
        : false;

    // Helper function to determine rank style
    const getRankClass = (rank) => {
        if (rank === 1) return styles.rankGold;
        if (rank === 2) return styles.rankSilver;
        if (rank === 3) return styles.rankBronze;
        return styles.rankDefault; // Default color for other ranks
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            
            <div className={styles.table}>
                {/* Display top 3 users, applying a border if the user is the current user */}
                {topThree.map((user) => (
                    <div 
                        key={user.id} 
                        className={`${styles.row} hoverable ${isCurrentUserInTopThree && user.id === currentUser?.id ? styles.currentUser : ''}`}
                        style={{
                            border: isCurrentUserInTopThree && user.id === currentUser?.id 
                                ? '2px solid var(--red)' // Highlight border if current user is in the top 3
                                : 'none',
                        }}
                    >
                        <span className={`${styles.rank} ${getRankClass(user.rank)}`}>
                            {user.rank}
                        </span>
                        <span className={styles.name}>{user.user_name}</span>
                        <span className={styles.points}>{user.total_points} pts</span>
                    </div>
                ))}

                {/* Display ellipsis and current user below if they’re not in the top 3 and currentUser exists */}
                {!isCurrentUserInTopThree && currentUser && (
                    <>
                        <div className={styles.ellipsis}>...</div>
                        <div 
                            className={`${styles.row} ${styles.currentUser} hoverable`}
                            style={{
                                border: '2px solid var(--red)' // Border for current user if outside top 3
                            }}
                        >
                            <span className={`${styles.rank} ${getRankClass(currentUser.rank)}`}>
                                {currentUser.rank}
                            </span>
                            <span className={styles.name}>{currentUser.user_name}</span>
                            <span className={styles.points}>{currentUser.total_points} pts</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

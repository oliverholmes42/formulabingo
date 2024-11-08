import styles from './LeaderBoard.module.css';

export function Leaderboard({ data, title }) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.table}>
                {data.map((user, index) => (
                    <div key={user.id} className={`${styles.row} hoverable`}>
                        <span className={styles.rank}>{index + 1}</span>
                        <span className={styles.name}>{user.name}</span>
                        <span className={styles.points}>{user.points} pts</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

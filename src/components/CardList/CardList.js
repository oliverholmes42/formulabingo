import styles from "./CardList.module.css";

export default function CardList({ cards, fetchCard, create }) {
    return (
        <div className={styles.cardList}>
            <h2 style={{ textAlign: "center", padding: "10px" }}>Your Bingo Cards</h2>
            {cards.length > 0 ? (
                cards.map((item) => (
                    <div
                        key={item.card_id}
                        className={`hoverable ${styles.cardItem}`}
                        onClick={() => fetchCard(item.card_id)}
                    >
                        <p><strong>Card #{item.card_id}</strong></p>
                        <p>Created: {new Date(item.created_at).toLocaleDateString()}</p>
                        <p><strong>Points: {item.points}</strong></p>
                    </div>
                ))
            ) : (
                <div className={styles.emptyState}>
                    <p>No cards found.</p>
                    <button onClick={create} className={styles.createButton}>Create a Bingo Card</button>
                </div>
            )}
        </div>
    );
}

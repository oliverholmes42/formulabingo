import styles from "./CardList.module.css";

export default function CardList({ cards, fetchCard }) {
    return (
        <div className={styles.cardList}>
            <h2 style={{textAlign: "center", padding: "10px"}}>Your Bingo Cards</h2>
            {cards.map((item) => (
                <div
                    key={item.card_id}
                    className={`hoverable ${styles.cardItem}`}
                    onClick={() => fetchCard(item.card_id)}
                >
                    <p><strong>Card #{item.card_id}</strong></p>
                    <p>Created: {new Date(item.created_at).toLocaleDateString()}</p>
                    <p><strong>Points: {item.points}</strong></p>
                </div>
            ))}
        </div>
    );
}

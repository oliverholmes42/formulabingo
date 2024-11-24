import { useState } from "react";
import styles from "./BingoCard.module.css";
import Modal from "../Modal/Modal";
import { Update } from "../../api/Bricks";
import {UpdateBrickCard} from "../../api/BingoCard";
import {useAuth} from "../../Context/AuthContext";

export function RenderBingoCard({card, setExpanded = null}) {
    const {card_id, points, bricks} = card;
    return <>
        <div className={styles.header}>
            <h2>Bingo Card #{card_id}</h2>
            <p style={{marginBottom: "20px"}}>Score: {points} pts</p>
        </div>
        <div className={styles.bingoCard}>
            {bricks.map((cell) => (
                <BingoCell key={cell.brick_id} cell={cell} onClick={() => {
                    setExpanded && setExpanded(cell)
                }}/>
            ))}
        </div>
    </>;
}

export default function BingoCard({ selectedCard }) {
    const [expanded, setExpanded] = useState(null);
    const {id} = useAuth()

    const closeModal = () => setExpanded(null);

    return (
        <div className={styles.cardContainer}>
            <RenderBingoCard card={selectedCard} setExpanded={setExpanded}/>
            {expanded && (
                <Modal closeModal={closeModal}>
                    <ExpandedCell cell={expanded} id={id} card={selectedCard.card_id}/>
                </Modal>
            )}
        </div>
    );
}

const flagCell = async (updatedItem) => {
    const item = {
        brick_id: updatedItem.brick_id,
        flagged: 1,
    };
    const result = await Update(item);
    if (result.status !== "success") {
        alert("Failed to save changes.");
    }
};

function BingoCell({ cell, onClick }) {
    const cellClass = `
        ${styles.cell} 
        ${cell.status ? styles["status-true"] : ""} 
        ${cell.boost_level === 2 ? styles["boost-2"] : cell.boost_level === 3 ? styles["boost-3"] : ""}
    `;

    return (
        <div className={cellClass} style={{ gridArea: `auto / auto / span 1 / span 1` }} onClick={onClick}>
            {cell.title}
        </div>
    );
}

function ExpandedCell({ cell, id, card }) {
    const [data, setData] = useState(cell);

    const boost = async () => {
        try{
            const response = await UpdateBrickCard(id, card, {...data, boost_level:2});
        }
        catch(error) {
            console.log(error);
        }


    }
    return (
        <div style={{width: "100%"}}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
                <h3 className={styles.title}>{data.title}</h3>
                <button style={{ fontSize: "12px", padding: "5px" }} onClick={() => flagCell(data)}>
                    Flag
                </button>
            </div>

            <p className={styles.description} style={{ whiteSpace: "pre-wrap" }}>
                {data.description}
            </p>

            <div className={styles.status}>
                <span className={`${styles.statusLabel} ${data.status ? styles.claimed : styles.locked}`}>
                    {data.status ? "Claimed" : "Locked"}
                </span>
                {data.boost_level > 1 ? (
                    <span className={`${styles.boost} ${data.boost_level === 2 ? styles.silver : styles.gold}`}>
                        Boost: {data.boost_level}x
                    </span>
                ): (
                    <span className={`${styles.boost} hoverable`} onClick={boost}>Boost</span>
                )}
            </div>
        </div>
    );
}

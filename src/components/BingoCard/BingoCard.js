import { useEffect, useState, useMemo } from "react";
import styles from "./BingoCard.module.css";
import Modal from "../Modal/Modal";

export default function BingoCard({ selectedCard }) {
    const { card_id, bricks, points } = selectedCard;
    const [rows, setRows] = useState([]);
    const [expanded, setExpanded] = useState(null);

    const closeModal = () => setExpanded(null);

    // Prepare rows from bricks
    useEffect(() => {
        const result = [];
        for (let i = 0; i < bricks.length; i += 5) {
            result.push(bricks.slice(i, i + 5));
        }
        setRows(result);
    }, [bricks]);

    return (
        <>
            <div className={styles.bingoCard}>
                <h2 className={styles.Header}>Bingo Card #{card_id}</h2>
                {rows.map((row, rowIndex) => (
                    <BingoRow key={`row-${rowIndex}`} row={row} onCellClick={setExpanded} />
                ))}
                {expanded && (
                    <Modal closeModal={closeModal}>
                        <ExpandedCell cell={expanded} />
                    </Modal>
                )}
            </div>
            <div className={styles.PointTally}>
                <h2>Score: {points} pts</h2>
            </div>
        </>
    );
}

function BingoRow({ row, onCellClick }) {
    return (
        <div className={styles.row}>
            {row.map((cell) => (
                <BingoCell key={cell.brick_id} cell={cell} onClick={() => onCellClick(cell)} />
            ))}
        </div>
    );
}

function BingoCell({ cell, onClick }) {
    const cellClass = `
        hoverable
        ${styles.cell} 
        ${cell.status ? styles["status-true"] : ""} 
        ${cell.boost_level === 2 ? styles["boost-2"] : cell.boost_level === 3 ? styles["boost-3"] : ""}
    `;

    return (
        <div className={cellClass} onClick={onClick}>
            {cell.title}
        </div>
    );
}

function ExpandedCell({ cell }) {
    return (
        <div>
            <h3 className={styles.title}>{cell.title}</h3>
            <p className={styles.description}>{cell.description}</p>
            <div className={styles.status}>
                <span className={`${styles.statusLabel} ${cell.status ? styles.claimed : styles.locked}`}>
                    {cell.status ? "Claimed" : "Locked"}
                </span>
                {cell.boost_level > 1 && (
                    <span className={`${styles.boost} ${cell.boost_level === 2 ? styles.silver : styles.gold}`}>
                        Boost: {cell.boost_level}x
                    </span>
                )}
            </div>
        </div>
    );
}

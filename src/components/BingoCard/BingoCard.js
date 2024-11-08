import { useEffect, useState, useMemo } from "react";
import styles from "./BingoCard.module.css";
import Modal from "../Modal/Modal";

export default function BingoCard({ data }) {
    const [rows, setRows] = useState([]);
    const [expanded, setExpanded] = useState(null);

    const closeModal = () => setExpanded(null);

    // Prepare rows from data
    useEffect(() => {
        const result = [];
        for (let i = 0; i < data.length; i += 5) {
            result.push(data.slice(i, i + 5));
        }
        setRows(result);
    }, [data]);

    // Calculate points based on cell completion and bingos
    const points = useMemo(() => calculatePoints(rows), [rows]);

    return (
        <>
            <div className={styles.bingoCard}>
                <h2 className={styles.Header}>Bingo Card</h2>
                {rows.map((row, rowIndex) => (
                    <BingoRow key={rowIndex} row={row} onCellClick={setExpanded} />
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
                <BingoCell key={cell.id} cell={cell} onClick={() => onCellClick(cell)} />
            ))}
        </div>
    );
}

function BingoCell({ cell, onClick }) {
    const cellClass = `
        hoverable
        ${styles.cell} 
        ${cell.status ? styles["status-true"] : ""} 
        ${cell.boost === 2 ? styles["boost-2"] : cell.boost === 3 ? styles["boost-3"] : ""}
    `;

    return (
        <div className={cellClass} onClick={onClick}>
            {cell.title}
        </div>
    );
}

function ExpandedCell({ cell }) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{cell.title}</h3>
            <p className={styles.description}>{cell.description}</p>
            <div className={styles.status}>
                <span className={`${styles.statusLabel} ${cell.status ? styles.claimed : styles.locked}`}>
                    {cell.status ? "Claimed" : "Locked"}
                </span>
                {cell.boost > 1 && (
                    <span className={`${styles.boost} ${cell.boost === 2 ? styles.silver : styles.gold}`}>
                        Boost: {cell.boost}x
                    </span>
                )}
            </div>
        </div>
    );
}

// Helper function to calculate points
function calculatePoints(rows) {
    const basePoints = 25;
    const bingoBonus = 75;
    let totalPoints = 0;

    const completedRows = rows.map(row => row.every(cell => cell.status));
    const completedColumns = Array(5)
        .fill(true)
        .map((_, colIndex) => rows.every(row => row[colIndex].status));

    const completedDiagonal1 = rows.every((row, idx) => row[idx].status);
    const completedDiagonal2 = rows.every((row, idx) => row[4 - idx].status);

    rows.forEach(row => {
        row.forEach(cell => {
            if (cell.status) {
                const cellPoints = basePoints * (cell.boost || 1);
                totalPoints += cellPoints;
            }
        });
    });

    const bingoCount =
        completedRows.filter(Boolean).length +
        completedColumns.filter(Boolean).length +
        (completedDiagonal1 ? 1 : 0) +
        (completedDiagonal2 ? 1 : 0);

    totalPoints += bingoCount * bingoBonus;

    return totalPoints;
}

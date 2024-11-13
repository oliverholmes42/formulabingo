import { useEffect, useState } from "react";
import { Leaderboard } from "../components/LeaderBoard/LeaderBoard";
import { useAuth } from "../Context/AuthContext";
import {LeaderBoard as fetchLeaderBoardData, Read} from "../api/BingoCard";
import BingoCard from "../components/BingoCard/BingoCard";


export default function LeaderboardPage() {
    const [leaderboardData, setLeaderBoardData] = useState(null); // Initialize as null to avoid issues before data loads
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardData, setCardData] = useState(null);
    const { id } = useAuth();

    useEffect(() => {
        if(selectedCard) {
            const fetchCard = async () => {
                const reponse = await Read(selectedCard);
                setCardData(reponse);

            }
            fetchCard();
        }
    }, [selectedCard]);

    useEffect(() => {
        const userid = id ?? -1;
        const fetchData = async () => {
            const response = await fetchLeaderBoardData(userid);
            setLeaderBoardData(response);
        };
        fetchData();
    }, [id]);


    return (
        <>
            <div style={containerStyle}>
                {leaderboardData && <Leaderboard data={leaderboardData} title="Worldwide" setCard={setSelectedCard}/>}
            </div>
            {cardData && <BingoCard selectedCard={cardData}/> }
        </>
    );
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
    width: '100%',
    boxSizing: 'border-box',
    flexWrap: 'wrap',
};

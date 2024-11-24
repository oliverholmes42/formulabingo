import { useEffect, useState } from "react";
import { Leaderboard } from "../components/LeaderBoard/LeaderBoard";
import { useAuth } from "../Context/AuthContext";
import {LeaderBoard as fetchLeaderBoardData, Read} from "../api/BingoCard";
import {Helmet} from "react-helmet-async";
import Modal from "../components/Modal/Modal";
import {RenderBingoCard} from "../components/BingoCard/BingoCard";


export default function LeaderboardPage() {
    const [leaderboardData, setLeaderBoardData] = useState(null); // Initialize as null to avoid issues before data loads

    const [cardData, setCardData] = useState(null);
    const { id } = useAuth();

    /*useEffect(() => {
        if(selectedCard) {
            const fetchCard = async () => {
                const reponse = await Read(selectedCard);
                setCardData(reponse);

            }
            fetchCard();
        }
    }, [selectedCard]);*/

    useEffect(() => {
        const userid = id ?? -1;
        const fetchData = async () => {
            const response = await fetchLeaderBoardData(userid);
            setLeaderBoardData(response);
        };
        fetchData();
    }, [id]);


    const fetchBricks = async (id) => {
        try{
            const reponse = await Read(id);
            setCardData(reponse)

        }catch(err){

        }
    }


    return (
        <>
            <Helmet>
                <title>Leaderboard - GrandPrixBingo</title>
                <meta
                    name="description"
                    content="Check the GrandPrixBingo leaderboard and see how you rank among other F1 fans."
                />
                <meta
                    name="keywords"
                    content="F1 leaderboard, GrandPrixBingo, rankings, Formula 1"
                />
                <link rel="canonical" href="https://GrandPrixBingo.com/leaderboard" />
            </Helmet>
            <div style={containerStyle}>
                {leaderboardData && <Leaderboard data={leaderboardData} title="Worldwide" setCard={fetchBricks}/>}
            </div>
            {cardData && <Modal closeModal={()=>setCardData(null)}><RenderBingoCard card={cardData}/> </Modal>}
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

import { useEffect, useState } from "react";
import { Leaderboard } from "../components/LeaderBoard/LeaderBoard";
import { useAuth } from "../Context/AuthContext";
import { LeaderBoard as fetchLeaderBoardData } from "../api/BingoCard"; // Renamed to avoid conflict

export default function LeaderboardPage() {
    const [leaderboardData, setLeaderBoardData] = useState(null); // Initialize as null to avoid issues before data loads
    const { id } = useAuth();

    useEffect(() => {
        const userid = id ?? -1;
        const fetchData = async () => {
            const response = await fetchLeaderBoardData(userid);
            setLeaderBoardData(response);
        };
        fetchData();
    }, [id]);

    return (
        <div style={containerStyle}>
            {leaderboardData && <Leaderboard data={leaderboardData} title="Worldwide" />}
        </div>
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

import { Leaderboard } from "../components/LeaderBoard/LeaderBoard";

export default function LeaderboardPage() {
    const leaderboardData = [
        { id: 1, name: "Max Verstappen", points: 1200 },
        { id: 2, name: "Lewis Hamilton", points: 1100 },
        { id: 3, name: "Charles Leclerc", points: 900 },
    ];
    
    return (
        <div style={containerStyle}>
            <Leaderboard data={leaderboardData} title="Worldwide" />
            <Leaderboard data={leaderboardData} title="Country" />
            <Leaderboard data={leaderboardData} title="League" />
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
    flexWrap: 'wrap', // Allows items to wrap onto the next line
};


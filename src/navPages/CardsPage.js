import BingoCard from "../components/BingoCard/BingoCard";

export default function(){

    const cardData = [
        { "id": 1, "title": "Pit Stop Under 3 Seconds", "description": "One of the pit crews completes a pit stop in less than three seconds, showcasing their efficiency and teamwork under pressure.", "status": true, "boost": 2 },
        { "id": 2, "title": "Safety Car Deployed", "description": "The safety car is brought onto the track due to an incident, neutralizing the race and reducing the cars' speed until the hazard is cleared.", "status": false, "boost": 1 },
        { "id": 3, "title": "Fastest Lap", "description": "A driver sets the fastest lap time of the race, highlighting their skill and speed on a specific lap.", "status": false, "boost": 1 },
        { "id": 4, "title": "Overtake on Turn 1", "description": "A driver successfully overtakes another competitor on the first turn, showing aggressive but calculated driving at the start.", "status": true, "boost": 1 },
        { "id": 5, "title": "Driver Wins from Pole Position", "description": "The driver who started in pole position maintains their lead throughout the race and secures the victory.", "status": false, "boost": 1 },
        { "id": 6, "title": "Team Radio Complaint", "description": "A driver is heard on team radio, voicing frustration or concern about another driver or race conditions.", "status": false, "boost": 1 },
        { "id": 7, "title": "Red Flag", "description": "The race is stopped temporarily due to a severe incident or dangerous conditions, requiring a complete halt to competition.", "status": false, "boost": 1 },
        { "id": 8, "title": "DNF (Did Not Finish)", "description": "A driver is forced to retire from the race, unable to complete due to technical issues or an accident.", "status": false, "boost": 1 },
        { "id": 9, "title": "Track Limits Warning", "description": "A driver receives an official warning for exceeding the track limits, possibly gaining an unfair advantage.", "status": false, "boost": 1 },
        { "id": 10, "title": "Race Restart", "description": "The race is restarted following a red flag or safety car, allowing drivers to regroup and continue.", "status": false, "boost": 1 },
        { "id": 11, "title": "Double Overtake", "description": "In an impressive display, a driver overtakes two cars in a single maneuver, showcasing exceptional racecraft.", "status": false, "boost": 1 },
        { "id": 12, "title": "Pit Lane Speeding Penalty", "description": "A driver is penalized for exceeding the speed limit in the pit lane, risking the safety of crew members.", "status": false, "boost": 1 },
        { "id": 13, "title": "Fastest Sector Time", "description": "A driver records the fastest time in a specific sector of the track, demonstrating mastery over that section.", "status": false, "boost": 1 },
        { "id": 14, "title": "Wheel-to-Wheel Racing", "description": "Two cars go wheel-to-wheel through a corner, fighting for position without conceding ground.", "status": true, "boost": 1 },
        { "id": 15, "title": "DRS Overtake", "description": "A driver activates the DRS (Drag Reduction System) to gain an advantage and successfully overtakes a competitor.", "status": false, "boost": 1 },
        { "id": 16, "title": "Verstappen Radio", "description": "Max Verstappen is heard on the team radio, offering insight or expressing his opinion on the race.", "status": false, "boost": 1 },
        { "id": 17, "title": "Lead Change", "description": "The lead position changes hands at least once during the race, adding excitement and unpredictability.", "status": false, "boost": 1 },
        { "id": 18, "title": "Final Lap Battle", "description": "Two drivers engage in a close battle for position on the final lap, pushing their cars to the limit.", "status": false, "boost": 1 },
        { "id": 19, "title": "Penalty for Unsafe Release", "description": "A team is penalized for releasing their car unsafely from the pit lane, endangering other drivers.", "status": false, "boost": 1 },
        { "id": 20, "title": "Collision", "description": "Two cars collide on the track, potentially affecting their race and requiring repairs.", "status": false, "boost": 1 },
        { "id": 21, "title": "Race Start Delay", "description": "The start of the race is delayed due to weather, technical issues, or other unforeseen circumstances.", "status": false, "boost": 1 },
        { "id": 22, "title": "Defensive Driving", "description": "A driver aggressively defends their position, making it difficult for others to overtake.", "status": false, "boost": 1 },
        { "id": 23, "title": "Driver Swaps Helmets", "description": "A driver wears a special helmet design for this race, often as a tribute or for promotional purposes.", "status": false, "boost": 1 },
        { "id": 24, "title": "Engine Failure", "description": "A car suffers an engine failure, forcing the driver to retire from the race.", "status": false, "boost": 1 },
        { "id": 25, "title": "Podium Ceremony Mishap", "description": "An unusual incident occurs during the podium ceremony, adding an unexpected twist to the celebrations.", "status": false, "boost": 3 }
      ]
      
    return(
        <>
            <BingoCard data={cardData}/>
        </>
    )
}
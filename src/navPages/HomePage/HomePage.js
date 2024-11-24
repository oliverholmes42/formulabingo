import { useEffect, useState } from "react"
import { Latest } from "../../api/Bricks"

import styles from './HomePage.module.css';
import {Helmet} from "react-helmet-async";

function LatestEvents({ events }) {
    return (
        <>
            <Helmet>
                <title>GrandPrixBingo - F1 Bingo Service</title>
                <meta
                    name="description"
                    content="Explore the latest events and learn about GrandPrixBingo, the ultimate F1 bingo app where you can compete, track, and compare with friends."
                />
                <meta
                    name="keywords"
                    content="F1, Formula 1, bingo, F1 events, racing, leaderboard"
                />
                <link rel="canonical" href="https://GrandPrixBingo.com/" />
            </Helmet>
            <h2 className={styles.eventsHeader}>Latest Events</h2>
            <div className={styles.eventsContainer}>
                {events.map(event => (
                    <div key={event.brick_id} className={styles.eventCard}>
                        <div className={styles.eventHeader}>
                            <h4 className={styles.eventTitle}>{event.title}</h4>
                            <span className={`${styles.eventStatus} ${event.status ? styles.statusActive : styles.statusInactive}`}>
                                {event.status ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <p className={styles.eventDescription}>{event.description}</p>
                        <div className={styles.eventFooter}>
                            <span className={styles.eventPoints}>{event.points} pts</span>
                            <span className={styles.eventTime}>{new Date(event.time).toLocaleString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}


export default function(){
    const [events, setEvents] = useState([])

    useEffect(()=>{
        const fetchEvents = async () =>{
            const response = await Latest();
            setEvents(response);
        }

        fetchEvents();
    },[])
    return(<>
            <LatestEvents events={events}/>
        </>
    )
}

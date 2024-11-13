import { useEffect, useState } from "react"
import { Latest } from "../../api/Bricks"

import styles from './HomePage.module.css';

function LatestEvents({ events }) {
    return (
        <div>
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
        </div>
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

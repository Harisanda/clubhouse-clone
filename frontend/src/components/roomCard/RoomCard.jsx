import React from 'react'
import { useHistory } from 'react-router-dom';
import styles from './roomCard.module.css';


const RoomCard = ({room}) => {
  const history = useHistory();
  return (
    <div className={styles.card} 
      onClick={() => {
        history.push(`/room/${room.id}`)
      }}
    >
      <h3 className={styles.topic}>{room.topic}</h3>
      <div className={`${styles.speakers} ${room.speakers.length === 1 ? styles.singleSpeaker : ''}`}>
        <div className={styles.avatars}>
            {room.speakers.map((speaker) => (
                <img key={speaker.id} src={speaker.avatar} alt='speaker-avatar' />
            ))}
        </div>
        <div className={styles.names}>
            {room.speakers.map((speaker) => (
                <div className={styles.nameWrapper}>
                    <span>{speaker.name}</span>
                    <img key={speaker.id} src="/images/chat-bubble.png" alt="chat"/>
                </div>
            ))}
        </div>
      </div>
      <div className={styles.peopleCount}>
        <span>{room.totalPeople}</span>
        <img src="/images/user-icon.png" alt="user-icon" />
      </div>
    </div>
  )
}

export default RoomCard

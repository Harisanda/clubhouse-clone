import React from 'react'
import RoomCard from '../../components/roomCard/RoomCard';
import styles from './room.module.css';

const rooms = [
  {
    id:1,
    topic: 'developpement web',
    speakers: [
      {
        id: 1,
        name: 'koto',
        avatar: '/images/monkey-avatar.png',
      },
      {
        id: 2,
        name: 'koto2',
        avatar: '/images/monkey-avatar.png',
      },   
    ],
    totalPeople: 40,
  },
  {
    id:2,
    topic: 'php',
    speakers: [
      {
        id: 1,
        name: 'koto',
        avatar: '/images/monkey-avatar.png',
      },
      {
        id: 2,
        name: 'koto2',
        avatar: '/images/monkey-avatar.png',
      },   
    ],
    totalPeople: 40,
  },
  {
    id:3,
    topic: 'react',
    speakers: [
      {
        id: 1,
        name: 'koto',
        avatar: '/images/monkey-avatar.png',
      },
      {
        id: 2,
        name: 'koto2',
        avatar: '/images/monkey-avatar.png',
      },   
    ],
    totalPeople: 40,
  },
  {
    id:4,
    topic: 'marketing digital',
    speakers: [
      {
        id: 1,
        name:'koto',
        avatar: '/images/monkey-avatar.png',
      },
      {
        id: 2,
        name: 'koto2',
        avatar: '/images/monkey-avatar.png',
      },   
    ],
    totalPeople: 40,
  },
  {
    id:1,
    topic: 'java',
    speakers: [
      {
        id: 1,
        name: 'koto',
        avatar: '/images/monkey-avatar.png',
      },
      {
        id: 2,
        name: 'koto2',
        avatar: '/images/monkey-avatar.png',
      },   
    ],
    totalPeople: 40,
  },
]


const Rooms = () => {
  return (
    <>
      <div className='container'>
        <div className={styles.roomHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>Tous les rooms</span>
            <div className={styles.searchBox}>
              <img src='/images/search-icon.png' alt='search'/>
              <input type='text' className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.right}>
            <button className={styles.startRoom}>
              <img src='/images/add-room-icon.png' alt='start' />
              <span>Start</span>
            </button>
          </div>
        </div>
        <div className={styles.roomlist}>
          {rooms.map((room) =>(
            <RoomCard key={room.id} room={room}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default Rooms

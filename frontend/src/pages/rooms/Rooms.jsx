import React, { useEffect, useState } from 'react'
import RoomCard from '../../components/roomCard/RoomCard';
import AddRoom from '../../components/roomModal/AddRoom';
import styles from './room.module.css';
import { getAllRooms } from '../../http';


const Rooms = () => {

  const [showModal,setShowModal] = useState(false);
  const [rooms,setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const {data} = await getAllRooms();
      setRooms(data);
    };
    fetchRooms();
  },[])

  function openModal () {
    setShowModal(true);
  }

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
            <button className={styles.startRoom} onClick={openModal}>
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
      {showModal && <AddRoom onClose={() => setShowModal(false) }/>}
    </>
  )
}

export default Rooms

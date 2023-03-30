import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import styles from './addRoom.module.css';
import TextInput from '../shared/textInput/TextInput';
import { createRoom as create} from '../../http';

const AddRoom = ({onClose}) => {

    const history = useHistory();

    const [roomType,setRoomType] = useState('open');
    const [topic,setTopic] = useState('');
    
    async function createRooms () {
        //appel au server
        try{
            if (!topic) return ;
            const {data} = await create({topic,roomType});
            history.push(`/room/${data.id}`);
            console.log(data);
        } catch (err) {
            console.log(err.message);
        }
    }
    console.log(roomType);
  return (
    <div className={styles.modalMask}>
        <div className={styles.modalBody}>
            <button className={styles.buttonClose} onClick={onClose}>
                <img src='/images/close.png' alt='close' />
            </button>
            <div className={styles.modalHeader}>
                <h3 className={styles.heading}>Entrer un Topic pour la discution</h3>
                <TextInput fullwidth="true" onChange={(e) => setTopic(e.target.value)}/>
                <h3 className={styles.subHeading}>Room Type</h3>
                <div className={styles.roomTypes}>
                    <div 
                        className={`${styles.typeBox} ${roomType === 'open' ? styles.active : ''}`}
                        onClick={() => setRoomType('open')}    
                    >
                        <img src="/images/globe.png" alt="globe" />
                        <span>Open</span>
                    </div>
                    <div 
                        className={`${styles.typeBox} ${roomType === 'social' ? styles.active : ''}`} 
                        onClick={() => setRoomType('social')}
                    >
                        <img src="/images/social.png" alt="social" />
                        <span>Social</span>
                    </div>
                    <div 
                        className={`${styles.typeBox} ${roomType === 'private' ? styles.active : ''}`}
                        onClick={() => setRoomType('private')}    
                    >
                        <img src="/images/lock.png" alt="lock" />
                        <span>Private</span>
                    </div>
                </div>
            </div>
            <div className={styles.footerModal}>
                <h4>Commencer un live pour tout le monde</h4>
                <button className={styles.footerButton} onClick={createRooms}>
                    <img src="/images/celebration.png" alt="celebration" />
                    <span>Let's go</span> 
                </button>
            </div>
        </div>
    </div>
  )
}

export default AddRoom
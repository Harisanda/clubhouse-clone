import React ,{useState} from 'react';
import styles from './requestCard.module.css';
import { acceptRequest , addSpeaker } from '../../http';

const RequestCard = ({demande}) => {
    const [request,setRequest] = useState(null);
    let status = demande.status;

    const handleAccept = async () => {
        const id = demande._id;
        status = 'accepted';
        const {data} = await acceptRequest(id,{status});
        console.log(data);
        const roomId = data.rooms;
        const sender = data.sender;
        if (data.status === "accepted") {
            const {data} = await addSpeaker(roomId,{sender}); 
            console.log(data);
        }
    };
    
    const handleDecline = async () => {
        const id = demande._id;
        status = 'declined';
        const {data} = await acceptRequest(id,{status});
        console.log(data); 
    };
  return (
    <div className={styles.demande}>
        <h3 className={styles.demandeSender}>{demande.sender}</h3>
        <button onClick={handleDecline} className={styles.demandeBtn}>
            <img src="/images/cancel.png" alt="dennied" />
        </button>
        <button onClick={handleAccept} className={styles.demandeBtn}>
            <img src="/images/accept.png" alt="accept" />
        </button>
    </div>
  )
}

export default RequestCard

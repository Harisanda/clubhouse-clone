import React, { useEffect, useState } from 'react'
import styles from './notif.module.css';
import { getAllRequests } from '../../http';
import RequestCard from '../requestCard/RequestCard';

const Notif = ({ onClose }) => {
    const [demandes, setDemandes] = useState([]);

    useEffect(() => {
        const fetchDemande = async () => {
            const { data } = await getAllRequests();
            // console.log('demande',data);
            setDemandes(data);
        }
        fetchDemande();
    }, []);

    return (
        <div className={styles.notifMask}>
            <div className={styles.notifBody}>
                <button className={styles.buttonClose} onClick={onClose}>
                    <img src='/images/close.png' alt='close' />
                </button>
                <div className={styles.notifHeader}>
                    <h3 className={styles.heading}>Listes des clients qui veut admis en participants</h3>
                    <div className={styles.requestList}>
                        {demandes.map((demande) => (
                            <RequestCard key={demande._id} demande={demande}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notif

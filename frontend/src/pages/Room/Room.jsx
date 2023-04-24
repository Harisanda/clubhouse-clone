import { useWebRTC } from "../../hooks/useWebRTC";
import {useHistory, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import styles from './room.module.css';
import { useEffect, useState } from "react";
import { getRoom, sendRequest } from "../../http";
import { addListener } from "../../http";
import Notif from "../../components/notifications/Notif";

const Room = () => {
    const history = useHistory();
    const [room,setRoom] = useState(null);
    const [isMute,setMute] = useState(true);
    const [showNotif,setShowNotif] = useState(false);
    // const [toOnStage,setToOnStage] = useState(false);
    const {id: roomId} = useParams();
    const user = useSelector((state) => state.auth.user);
    const {clients,provideRef,handleMute} = useWebRTC(roomId,user);

    const handleManualLeave = () => {
        history.push('/rooms');
    }

    useEffect(() => {
        handleMute(isMute,user.id);
    },[isMute]);

    useEffect(() => {
        const fetchRoom = async () => {
            const {data} = await getRoom(roomId);
            console.log(data);
            setRoom((prev) => data);
        };

        fetchRoom();
    },[roomId]);

    //stockage dans la bd si un user rejoint la salle
    useEffect(() => {
        const addParticipants = async () => {
            try{
                const {data} = await addListener(roomId);
                console.log(data);
            } catch(err){
                console.log(err.message);
            }
        };

        addParticipants();
    },[roomId]);

    const handleMuteClick = (clientId) => {
        if(clientId !== user.id) return ;
        setMute((isMute) => !isMute);
    }

    const demandetoOnStage = async () => {
        try{
            const owner = room.ownerId;
            const rooms = roomId;
            console.log(rooms);
            const {data} = await sendRequest({rooms,owner});
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    //mbola atao ny createur ihany no manana accès amin'ny notif
    const openNotif = () => {
        setShowNotif(true);
    }

    return (
        <div>
            <div className="container">
                <button className={styles.goBack} onClick={handleManualLeave}>
                    <img src="/images/arrow-left.png" alt="back" />
                    <span>Tout les clients présent dans le live</span>
                </button>
            </div>
            <div className={styles.clientsWrap}>
                <div className={styles.header}>
                    <h2 className={styles.topic}>{room?.topic}</h2>
                    <div className={styles.actions}>
                        <button onClick={openNotif} className={styles.actionBtn}>
                            <img src="/images/cloche.png" alt="palm-icon" />
                        </button>
                        <button onClick={demandetoOnStage} className={styles.actionBtn}>
                            <img src="/images/palm.png" alt="palm-icon" />
                        </button>
                        <button onClick={handleManualLeave} className={styles.actionBtn}>
                            <img src="/images/win.png" alt="win-icon" />
                            <span>Leave quitely</span>
                        </button>
                    </div>
                </div>
                {/* image createur  line startup */}
                <div>
                    <h3>Le créateur</h3>
                    <div className={styles.userAvatar}>
                        <h1>{room?.ownerId}</h1>
                        {
                            <img src={room?.ownerId?.avatar} alt="creator-avatar" />
                        }
                    </div>
                </div>
                <div>
                    <h3>Les intervenants</h3>
                    <div className={styles.clientList}>
                        { 
                            clients.map((client) =>{
                                console.log(client.name)
                                console.log(room?.speakers.includes(client.id));
                                return(
                                room?.speakers.includes(client.id) ? (
                                   
                                    <div className={styles.client} key={client.id}>
                                        <div className={styles.userHead}>
                                            <audio ref={(instance) =>provideRef(instance,client.id)} autoPlay></audio>
                                            <img className={styles.userAvatar} src={client.avatar} alt="avatar" />
                                            <button onClick={() => handleMuteClick(client.id)} className={styles.micBtn}>
                                                {
                                                    client.muted ? (
                                                        <img src="/images/mic-mute.png" alt="mic-mute-icon" />
                                                    ) : (
                                                        <img src="/images/mic.png" alt="mic-icon" />
                                                    )
                                                }
                                            </button>
                                        </div>
                                        <h4>{client.name}</h4>
                                    </div>
                                ): null)
                            })
                        }
                    </div>
                </div>
                <div>
                    <h3>Autres participants dans la salle</h3>
                    <div className={styles.clientList}>
                        {
                            clients.map((client) =>{
                                return (
                                    <div className={styles.client} key={client.id}>
                                        <div className={styles.userHead}>
                                            <audio ref={(instance) =>provideRef(instance,client.id)} autoPlay></audio>
                                            <img className={styles.userAvatar} src={client.avatar} alt="avatar" />
                                        </div>
                                        <h4>{client.name}</h4>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {
                showNotif && <Notif onClose={() => setShowNotif(false)} />
            }
        </div>
    )
}

export default Room
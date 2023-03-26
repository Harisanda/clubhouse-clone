import React , {useEffect, useState} from 'react'
import styles from './stepAvatar.module.css';
import Card from '../../../components/shared/card/Card'
import Button from '../../../components/shared/button/Button'
import {useSelector,useDispatch} from 'react-redux'
import {setAvatar} from '../../../store/activateSlice'
import {activate} from '../../../http'
import { setAuth } from '../../../store/authSlice';
import Loader from '../../../components/shared/loader/Loader';

const StepAvatar = ({onNext}) => {
  const dispatch = useDispatch();
  const {name,avatar} = useSelector((state) => state.activate);
  const [image,setImage] = useState('images/monkey-avatar.png');
  const [loading,setLoading] = useState(false);
  const [unMounted,setUnMounted] = useState(false);

  async function submit () {
    if (!name || !avatar) return;
    try{
      setLoading(true);
      console.log(avatar);
      const {data} = await activate({name,avatar});

      if (data.auth){
        if(unMounted) {
          dispatch(setAuth(data));
        }
      }

    } catch (err){
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function captureImage (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      console.log(reader.result);
      setImage(reader.result);
      dispatch(setAvatar(reader.result))
    }
    // console.log(e);
  }

  useEffect(() => {
    return () => {
      setUnMounted(true);
    }
  },[])

  if (loading) return <Loader message="Activation en cours ..." />
  return (
    <>
      <div className={styles.cardwrapper}>
        <Card title={`Bienvenu sur House ${name}`} icon="monkey-emoji">
          <p className={styles.subHeading}> Avatar</p>
          <div className={styles.avatarWrapper}>
            <img className={styles.avatarImage} src={image} alt="avatar" />
          </div>
          <div>
            <input id="avatarInput" type='file' className={styles.avatarInput} onChange={captureImage}/>
            <label htmlFor="avatarInput" className={styles.avatarLabel}>Choisir un autre avatar</label>
          </div>
          <div className={styles.actionButton}>
            <Button text="Next" onClick={submit}/>
          </div>
        </Card>
      </div>
    </>
  )
}

export default StepAvatar

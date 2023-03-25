import React, { useState } from 'react'
import Card from '../../../components/shared/card/Card';
import Button from '../../../components/shared/button/Button';
import TextInput from '../../../components/shared/textInput/TextInput';
import styles from './stepotp.module.css';
import { verifyOtp } from '../../../http';
import { useSelector } from 'react-redux';
import {setAuth} from '../../../store/authSlice';
import { useDispatch } from 'react-redux';


const StepOtp = () => {
  const [otp,setOtp] = useState('');
  const dispatch = useDispatch();
  const {phone,hash} = useSelector((state) => state.auth.otp);

  const submit = async () => {
    try{
      const {data} = await verifyOtp({otp,phone,hash});
      console.log(data);
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={styles.cardwrapper}>
        <Card title="Entrer le code que nous avons envoyer" icon="lock-emoji">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)}/>
          <div>
            <div className={styles.actionButton}>
                <Button text="Next" onClick={submit}/>
            </div>
            <p className={styles.paragraph}>
                L'enter de votre  signifie que vous acceptez nos service et notre règle . Merci !
            </p>
          </div>
        </Card>
      </div>
    </>
  )
}

export default StepOtp

import React, { useState } from 'react'
import Card from '../../../../components/shared/card/Card'
import Button from '../../../../components/shared/button/Button'
import TextInput from '../../../../components/shared/textInput/TextInput'
import styles from '../stepPhoneEmail.module.css';
import { sendOtp } from '../../../../http/index';
import { useDispatch } from 'react-redux';
import { setOtp } from '../../../../store/authSlice';

const Phone = ({onNext}) => {
    const [phoneNumber,setPhoneNumber] = useState('');
    const dispatch = useDispatch();

    const submit = async () => {
        //server request
        const {data} = await sendOtp({phone: phoneNumber});
        console.log(data);
        dispatch(setOtp({phone: data.phone, hash: data.hash}));
        
        onNext();
    }

  return (
    <Card title="Entrer le numero de telephone" icon="phone">
        <TextInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
        <div>
            <div className={styles.actionButton}>
                <Button text="Next" onClick={submit}/>
            </div>
            <p className={styles.paragraph}>
                L'enter de votre  signifie que vous acceptez nos service et notre règle . Merci !
            </p>
        </div>

    </Card>
  )
}

export default Phone

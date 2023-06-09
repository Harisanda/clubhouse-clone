import React,{useState} from 'react'
import Phone from './phone/Phone';
import Email from './email/Email';
import styles from './stepPhoneEmail.module.css';

const phoneEmailMap = {
  phone: Phone, 
  email: Email,
}

const StepPhoneEmail = ({onNext}) => {
  const [type,setType] = useState("phone");
  const Component = phoneEmailMap[type];

  return (
    <>
      <div className={styles.cardwrapper}>
        <div>
          <div className={styles.buttonwrap}>
            <button 
              className={`${styles.button} ${type === 'phone' ? styles.active : ''}` } 
              onClick={() => setType('phone')}>
              <img src="/images/phone-white.png" alt="phone" />
            </button>
            <button className={`${styles.button} ${type === 'email' ? styles.active : ''}`} onClick={() => setType('email')}>
            <img src="/images/mail-white.png" alt="email" />

            </button>
          </div>
          <Component onNext={onNext}/> 
        </div>
      </div>
    </>
  );
}

export default StepPhoneEmail

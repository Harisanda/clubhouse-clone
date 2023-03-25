import React, { useState } from 'react'
import Card from '../../../../components/shared/card/Card'
import Button from '../../../../components/shared/button/Button'
import TextInput from '../../../../components/shared/textInput/TextInput'
import styles from '../stepPhoneEmail.module.css';


const Email = ({onNext}) => {
    const [email,setEmail] = useState('');
  return (
    <Card title="Entrer votre adresse email" icon="email-emoji">
        <TextInput value={email} onChange={(e) => setEmail(e.target.value)}/>
        <div>
            <div className={styles.actionButton}>
                <Button text="Next" onClick={onNext}/>
            </div>
            <p className={styles.paragraph}>
                L'enter de votre  signifie que vous acceptez nos service et notre règle . Merci !
            </p>
        </div>

    </Card>
  )
}

export default Email

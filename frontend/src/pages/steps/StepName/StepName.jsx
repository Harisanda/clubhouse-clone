import React, { useState } from 'react'
import styles from './stepName.module.css';
import Card from '../../../components/shared/card/Card'
import Button from '../../../components/shared/button/Button'
import TextInput from '../../../components/shared/textInput/TextInput'
import {useDispatch, useSelector} from 'react-redux'
import { setName } from '../../../store/activateSlice';

const StepName = ({onNext}) => {
  const {name} = useSelector((state) => state.activate)
  const dispatch = useDispatch()
  const  [fullname,setFullname] = useState(name);
  function nextStep () {
    if(!fullname) {
      return;
    } 

    dispatch(setName(fullname));
    onNext();
  }
  return (
    <>
      <div className={styles.cardwrapper}>
        <Card title="Entrer votre nom" icon="goggle-emoji">
          <TextInput value={fullname} onChange={(e) => setFullname(e.target.value)}/>
          <div>
            <p className={styles.paragraph}>
                  L'utilisteur doit utiliser son vrai nom. Merci !
            </p>
            <div className={styles.actionButton}>
                <Button text="Next" onClick={nextStep}/>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default StepName

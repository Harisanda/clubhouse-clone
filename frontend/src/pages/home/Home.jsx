import React from 'react'
import styles from './Home.module.css';
import { Link , useHistory } from 'react-router-dom';
import Card from '../../components/shared/card/Card';
import Button from '../../components/shared/button/Button';

const Home = () => {
  const signInlink = {
    color: "#0077ff",
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: "10px"
  }

  const history = useHistory();

  function startRegister() {
    history.push('/authenticate');
  }

  return (
   <div className={styles.wrapper}>
    <Card title="Bienvenu sur My House !" icon="logo">
      <p className={styles.text}>
        Salut ! ceci est une application de clonnage de 
        clubhouse........................
      </p>
      <div>
        <Button onClick={startRegister} text="Go"/>
      </div>
      <div className={styles.signin}>
        <span className={styles.hasInvite}>Have an invite text?</span>
        {/* <Link style={signInlink} to="/login" >Sign In</Link> */}
      </div>
    </Card>
   </div>
  )
}

export default Home

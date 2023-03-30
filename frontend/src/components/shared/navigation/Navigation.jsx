import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'
import { logoutUser } from '../../../http'
import { setAuth } from '../../../store/authSlice'
import { useDispatch,useSelector } from 'react-redux'

const Navigation = () => {

  const branbStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '22px',
    display: 'flex',
    alignItems: 'center'
  }

  const logoText = {
    marginLeft: '20px'
  }

  const dispatch = useDispatch();
  const {isAuth,user} = useSelector((state) => state.auth);

  async function logout () {
    try{
      const {data} = await logoutUser();
      dispatch(setAuth(data));
    } catch(err){
      console.log(err);
    }
    
  }

  return (
    <div className={`${styles.navbar} container`}>
      <Link style={branbStyle} to="/">
        <img src='/images/logo.png' alt='logo'/>
        <span style={logoText}>My House</span>
      </Link>
      { isAuth && (
        <div className={styles.navRigth}>
          <h5>{user.name}</h5>
          <Link to="/">
            <img className={styles.avatar} 
              src={user.avatar ? user.avatar : '/images/monkey-avatar.png'} 
              width="30" height="30" alt="avatar" 
            />
          </Link>
          <button className={styles.logout} onClick={logout}>
            <img src="/images/logout.png" alt="logout" />
          </button>
        </div> 
      )}
    </div>
  )
}

export default Navigation
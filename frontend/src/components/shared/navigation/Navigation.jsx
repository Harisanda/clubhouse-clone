import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'

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

  return (
    <div className={`${styles.navbar} container`}>
      <Link style={branbStyle} to="/">
        <img src='/images/logo.png' alt='logo'/>
        <span style={logoText}>My House</span>
      </Link>
    </div>
  )
}

export default Navigation
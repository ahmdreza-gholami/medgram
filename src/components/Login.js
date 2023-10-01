import React from 'react';

import firebase from 'firebase/app';
import { auth } from '../firebase';

// Icons
import googleSvg from '../assets/icons/google.ico'

// Styles
import styles from './Login.module.css'

const Login = () => {
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <h2>Welcome to medgram</h2>
                <div 
                    className={styles.button}
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <img src={googleSvg} alt='#'/> Sing in with Google
                </div>
            </div>
        </div>
    );
}

export default Login;

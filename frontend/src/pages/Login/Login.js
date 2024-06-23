import React, {useState} from 'react';
import XImage from '../../assets/images/xloginpic.jpg'
import XIcon from '@mui/icons-material/X';
import auth from '../../firebase.init'
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {useSignInWithGoogle} from 'react-firebase-hooks/auth';
import { Link,useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import './Login.css'

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    //const [error,setEror] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    if (user||googleUser) {
        navigate('/')
        console.log(user)
        console.log(googleUser)
    }
    if (error) {
        console.log(error.message)
    }
    if (loading) {
        console.log('loading...')
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(email,password);
        signInWithEmailAndPassword(email,password);
    }
    const handleGoogleSignIn = ()=> {
        signInWithGoogle();
    }

    return (
        <div className='login-container'>
            <div className='image-container'>
                <img className='image' src={XImage} alt=""/>
            </div>

            <div className='form-container'>
                <div className='form-box'>
                    <div className='icon-container'>
                        <XIcon className='XIcon' style={{ color: 'black' }} />
                    </div>
                    <h1>Happening Now</h1>
                    <h3>Join Today.</h3>
                    <form className='my-form' onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className='email'
                            placeholder='Email address'
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <input 
                            type="password"
                            className='password'
                            placeholder='Password'
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <div className='btn-login'>
                            <button type='submit' className='btn'>Login</button>
                        </div>
                    </form>
                    <hr />

                        <div className='google-button'>
                            <GoogleButton 
                                className='g-btn'
                                type='light'
                                onClick={handleGoogleSignIn}
                            />
                        </div>
                        <div className='bottom'>
                            Don't have an account?
                            <Link
                                to='/signup'
                                style={{
                                    textDecoration: 'none',
                                    color: 'royalblue',
                                    fontWeight: '600',
                                    marginLeft: '5px'
                                }}
                            >
                                Sign-Up
                            </Link>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
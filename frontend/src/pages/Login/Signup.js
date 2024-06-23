import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import XImage from '../../assets/images/xloginpic.jpg'
import XIcon from '@mui/icons-material/X';
import auth from '../../firebase.init';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {useSignInWithGoogle} from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import './Login.css';
import axios from 'axios';

const Signup = () => {
    const [username,setUsername] = useState('');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    //const [error,setEror] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    if (user||googleUser) {
        console.log(user)
        console.log(googleUser)
    }
    if (error) {
        console.log(error.message)
    }
    if (loading) {
        console.log('loading...')
    }

    useEffect(() => {
        if (user || googleUser) {
          navigate('/home/feed'); // Navigate to feed after successful signup/login
        }
    }, [user, googleUser, navigate]);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(email,password);
        createUserWithEmailAndPassword(email,password);

        const user = {
            username: username,
            name:name,
            email:email
        }

        const {data}= axios.post('http://localhost:5000/register', user)
        console.log(data)
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
                            type="text"
                            className='display-name'
                            placeholder='@username'
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        <input 
                            type="text"
                            className='display-name'
                            placeholder='Enter full name'
                            onChange={(e)=>setName(e.target.value)}
                        />
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
                            <button type='submit' className='btn'>Sign-up</button>
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
                        Already have an account?
                        <Link
                            to='/login'
                            style={{
                                textDecoration: 'none',
                                color: 'royalblue',
                                fontWeight: '600',
                                marginLeft: '5px'
                            }}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Signup
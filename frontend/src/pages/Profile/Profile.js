import React from "react";
import '../Page.css';
import MainPage from './MainPage/MainPage';
import {useAuthState,useNavigate} from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Profile = () => {

    const [user]=useAuthState(auth);

    return (
        <div className="profilePage"> 
            <MainPage user={user}/>
        </div>
    );
};

export default Profile;
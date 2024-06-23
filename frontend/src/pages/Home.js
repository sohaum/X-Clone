import React from 'react';
import { Outlet } from 'react-router-dom';
import Widgets from './Widgets/Widgets';
import Sidebar from './Sidebar/Sidebar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from '../firebase.init';
import useLoggedInUser from '../hooks/useLoggedInUser';

const Home = () => {
    const [user, loading, error] = useAuthState(auth);
    const [loggedInUser, loggedInLoading, loggedInError] = useLoggedInUser();

    if (loading || loggedInLoading) {
        return <div>Loading...</div>;
    }

    if (error || loggedInError) {
        console.error('Error:', error || loggedInError);
        return <div>Error: {error?.message || loggedInError?.message}</div>;
    }

    const handleLogout = () => {
        signOut(auth);
    }

    return (
        <div className='app' style={{ display: 'flex' }}>
            <Sidebar handleLogout={handleLogout} user={user} />
            <Outlet />
            <Widgets />
        </div>
    )
}

export default Home;

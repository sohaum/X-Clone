import React, { useState, useEffect } from "react";
import EditProfile from '../../Profile/EditProfile/EditProfile';
import './MainPage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Post from '../../Feed/Post/Post';
import axios from 'axios';

const MainPage = ({ user }) => {

    const [loggedInUser] = useLoggedInUser();
    const navigate = useNavigate();
    const userProfilePic = loggedInUser?.[0]?.profileImage || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
    const userCoverPic = loggedInUser?.[0]?.coverImage || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
    const username = loggedInUser?.[0]?.username.split('@') || 'User';
    const displayName = loggedInUser?.[0]?.name || user?.displayName || 'User Name';
    const bio = loggedInUser?.[0]?.bio || '';
    const location = loggedInUser?.[0]?.location || '';
    const website = loggedInUser?.[0]?.website || '';

    const [imageURL, setImageURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/userPost?email=${user?.email}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError(error.message);
            }
        };
    
        fetchPosts();
    }, []);
    

    const handleUploadCoverImage = async (event) => {
        setIsLoading(true);
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        
        try {
            const res = await axios.post("https://api.imgbb.com/1/upload?key=29f60040bff1603c10e1734ba528b4d9", formData);
            const url = res.data.data.display_url;
            
            if (url) {
                const userEmail = user?.email;
                const patchUrl = `http://localhost:5000/userUpdates/${userEmail}`;
                await axios.patch(patchUrl, { coverImage: url });
                console.log('Cover image uploaded:', url);
                setImageURL(url); // Update state if needed
            }
        } catch (error) {
            console.error('Error uploading cover image:', error);
            // Handle error (e.g., show error message to user)
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleUploadProfileImage = async (event) => {
        setIsLoading(true);
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        
        try {
            const res = await axios.post("https://api.imgbb.com/1/upload?key=29f60040bff1603c10e1734ba528b4d9", formData);
            const url = res.data.data.display_url;
            
            if (url) {
                const userEmail = user?.email;
                const patchUrl = `http://localhost:5000/userUpdates/${userEmail}`;
                await axios.patch(patchUrl, { profileImage: url });
                console.log('Profile image uploaded:', url);
                // Update user state or any other state as needed
            }
        } catch (error) {
            console.error('Error uploading profile image:', error);
            // Handle error (e.g., show error message to user)
        } finally {
            setIsLoading(false);
        }
    };    

    return (
        <div className="page">
            <div className='topleft'>
                <ArrowBackIcon className="arrow-icon" onClick={() => navigate('/')} />
                <h4>@{username}</h4>
            </div>
            
            <div className="mainProfile">
                {
                    <div className="profile-bio">
                        <div>
                            <div className="coverImageContainer">
                                <img src={userCoverPic} alt="Cover" className="coverImage" />
                                <div className="hoverCoverImage">
                                    <label htmlFor="coverImage" className="imageIcon">                                
                                            <CenterFocusStrongIcon className="photoIcon"/>
                                    </label>
                                    <div className="imageIcon_tweetButton">
                                        <input type='file' id='coverImage' className="imageInput" onChange={handleUploadCoverImage} />
                                    </div>
                                </div>
                            </div>
                            <div className="avatar-img">
                                <div className="avatarContainer">
                                    <img src={userProfilePic} alt="Avatar" className="coverImage" />
                                </div>
                                <div className="hoverAvatarImage">
                                    <div className="imageIcon_xButton">
                                        <label htmlFor="profileImage" className="imageIcon">
                                            <CenterFocusStrongIcon />
                                        </label>
                                        <div className="imageIcon_tweetButton">
                                            <input type='file' id='profileImage' className="imageInput" onChange={handleUploadProfileImage} />
                                        </div>
                                    </div>
                                </div>
                                <div className="userInfo">
                                    <div>
                                        <h3 className="heading-3">{displayName}</h3>
                                        <p className="usernameSection">@{username}</p>
                                    </div>
                                    <div className="ep">
                                        <EditProfile className='editprofile' user={user} />
                                    </div>  
                                    <div className="infoContainer">
                                        {bio} 
                                        <div className='locationAndLink'>
                                            {location && <p className='subInfo'><MyLocationIcon /> {location}</p>}
                                            {website && <p className='subInfo link'><AddLinkIcon /> {website}</p>}
                                        </div>
                                    </div>
                                </div>
                                <h4 className='tweetsText'>Tweets</h4>
                                <hr />
                            </div>
                            {posts.map(p => <Post key={p.id} p={p} />)}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default MainPage;

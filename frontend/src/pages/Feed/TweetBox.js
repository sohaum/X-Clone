import React, { useState, useEffect } from 'react';
import { Avatar, Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './TweetBox.css';
import axios from 'axios';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const TweetBox = () => {
    const [user] = useAuthState(auth);
    const email = user?.email;
    const [post, setPost] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loggedInUser] = useLoggedInUser();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");

    const userProfilePic = loggedInUser?.[0]?.profileImage || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

    useEffect(() => {
        if (user && email) {
            if (user.providerData[0].providerId === 'password') {
                fetch(`http://localhost:5000/loggedInUser?email=${email}`)
                    .then(res => res.json())
                    .then(data => {
                        setName(data[0]?.name);
                        setUsername(data[0]?.username);
                    })
                    .catch(error => console.error('Error fetching user data:', error));
            } else {
                setName(user?.displayName);
                setUsername(email?.split('@')[0]);
            }
        }
    }, [user, email]);

    const handleUploadImage = async (e) => {
        setIsLoading(true);
        const image = e.target.files[0];
        const formData = new FormData();
        formData.set('image', image);

        try {
            const res = await axios.post("https://api.imgbb.com/1/upload?key=29f60040bff1603c10e1734ba528b4d9", formData);
            setImageURL(res.data.data.display_url);
            console.log(res.data.data.display_url);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTweet = async (e) => {
        e.preventDefault();

        if (name && username) {
            const userPost = {
                profilePhoto: userProfilePic,
                post: post,
                photo: imageURL,
                username: username,
                name: name,
                email: email 
            };
            console.log(userPost);
            
            try {
                const response = await fetch('http://localhost:5000/post', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userPost)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);

                // Reset the form after successful post
                setPost("");
                setImageURL("");
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        }
    };

    return (
        <div className='tweetBox'>
            <form onSubmit={handleTweet}>
                <div className='tweetBox__input'>
                    <Avatar src={userProfilePic} />
                    <input
                        type="text"
                        placeholder="What's Happening"
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                    />
                </div>
                <div className='imageIcon_tweetButton'>
                    <label htmlFor='image' className='imageIcon'>
                        {isLoading ? (
                            <p>Uploading Image...</p>
                        ) : (
                            <p>{imageURL ? 'Successfully Uploaded' : <AddPhotoAlternateIcon />}</p>
                        )}
                    </label>
                    <input
                        type='file'
                        id='image'
                        className='imageInput'
                        onChange={handleUploadImage}
                        disabled={isLoading}
                    />
                    <Button className='tweetBox__tweetButton' type='submit'>
                        Tweet
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TweetBox;

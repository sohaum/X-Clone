import React, { useEffect, useState } from 'react';
import TweetBox from './TweetBox';
import './Feed.css';
import Post from './Post/Post';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/post`);
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
    }, []);  // Empty dependency array

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <TweetBox />
            {error ? (
                <div className="error">{error}</div>
            ) : (
                posts.map(p => <Post key={p._id} p={p} />)
            )}
        </div>
    );
};

export default Feed;

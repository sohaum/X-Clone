import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const useLoggedInUser = () => {
    const [user] = useAuthState(auth);
    const email = user?.email;
    const [loggedInUser, setLoggedInUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (email) { //The fetch request is made only if email is defined
            setLoading(true);
            fetch(`http://localhost:5000/loggedInUser?email=${email}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(data => {
                    setLoggedInUser(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching logged-in user:', err);
                    setError(err);
                    setLoading(false);
                });
        }
    }, [email]);

    return [loggedInUser, loading, error];
};

export default useLoggedInUser;

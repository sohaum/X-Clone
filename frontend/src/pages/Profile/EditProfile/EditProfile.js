import React, { Fragment, useState } from "react";
import './EditProfile.css';
import Modal from '@mui/material/Modal';
import { Box, IconButton, TextField, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';
import useLoggedInUser from '../../../hooks/useLoggedInUser';  // Adjust the path accordingly

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 600,
    height: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 8,
    p: 4,
};

const childStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: 300,
    height: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 8,
    p: 4,
};

function EditChild({ dob, setDob }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Fragment>
            <div className="birthdate-section" onClick={handleOpen}>
                <span>Edit</span>
            </div>
            <Modal open={open} onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
                <Box sx={childStyle}>
                    <div className="text">
                        <h2>Edit date of birth?</h2>
                        <p>This can only be changed a few times. Make sure you enter the age of the person using the account.</p>
                        <TextField
                            type="date"
                            fullWidth
                            variant="outlined"
                            value={dob}
                            onChange={e => setDob(e.target.value)}
                        />
                        <div className="child-modal-buttons">
                            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </Fragment>
    );
}

const EditProfile = ({ user }) => {
    const [loggedInUser, setLoggedInUser] = useLoggedInUser();

    const website = loggedInUser?.website || '';
    const displayName = loggedInUser?.name || user?.displayName || 'User Name';
    const bioProfile = loggedInUser?.bio || '';
    const location = loggedInUser?.location || '';
    const dobProfile = loggedInUser?.dob || '';

    const [open, setOpen] = useState(false);
    const [name, setName] = useState(displayName);
    const [bio, setBio] = useState(bioProfile);
    const [loc, setLocation] = useState(location);
    const [site, setWebsite] = useState(website);
    const [dob, setDob] = useState(dobProfile);

    const handleSave = async () => {
        const editedInfo = {
            name,
            bio,
            location: loc,
            website: site,
            dob
        };

        if (editedInfo) {
            try {
                const userEmail = user?.email;
                const patchUrl = `http://localhost:5000/userUpdates/${userEmail}`;
                await axios.patch(patchUrl, editedInfo);
                console.log('Profile updated:', editedInfo);

                // Update the loggedInUser state
                setLoggedInUser(prevState => ({
                    ...prevState,
                    name,
                    bio,
                    location: loc,
                    website: site,
                    dob
                }));

                setOpen(false);
                window.location.reload(); // Reload the page to reflect changes (Optional)
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
    };

    return (
        <div>
            <button className="edit-profile-button" onClick={() => setOpen(true)}>Edit Profile</button>
            <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style} className="modal">
                    <div className="header">
                        <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
                        <h2 className="header-title">Edit Profile</h2>
                        <button className="save-btn" onClick={handleSave}>Save</button>
                    </div>
                    <form className="fill-content">
                        <TextField
                            className="text-field"
                            fullWidth
                            label="Name"
                            variant="filled"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            className="text-field"
                            fullWidth
                            label="Bio"
                            variant="filled"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <TextField
                            className="text-field"
                            fullWidth
                            label="Location"
                            variant="filled"
                            value={loc}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <TextField
                            className="text-field"
                            fullWidth
                            label="Website"
                            variant="filled"
                            value={site}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </form>
                    <div className="birthdate-section">
                        <p>Birth Date</p>
                        <EditChild dob={dob} setDob={setDob} />
                    </div>
                    <div className="last-section">
                        <h2>{dob || 'Add your Date of Birth'}</h2>
                        <div className="last-btn">
                            <h2>Switch to professional</h2>
                            <ChevronRightIcon />
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default EditProfile;

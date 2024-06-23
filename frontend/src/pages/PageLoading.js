import React from 'react';
import XIcon from '@mui/icons-material/X';

const PageLoading = () => {
    return (
        <div style={{display:'flex',minHeight:'100vh',justifyContent:'center',alignItems:'center'}}>
            <XIcon style={{ width: '60px', height: '60px' }}/>
        </div>
    );
};

export default PageLoading;
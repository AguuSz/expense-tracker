import React from 'react';
import './welcome.scss';

import Login from '../../components/login/login';

const Welcome = () => {
    return (
        <div className="welcome">
            <Login />
        </div>
    )
}

export default Welcome;
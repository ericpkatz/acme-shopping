import React from "react";
import { connect } from 'react-redux';
import UserOrdersCompleted from './UserOrdersCompleted';

const UserProfile = ({auth}) => {
    return (

    <div>
    <h1>
    {auth.username}
    </h1>
     <p>{auth.imageUrl}</p>
    <p>
    Email:{auth.email}
    </p>
    <p>
    Address:{auth.address}
    </p>
    <UserOrdersCompleted />
    </div>
    
    )
};

export default connect(state => state)(UserProfile);
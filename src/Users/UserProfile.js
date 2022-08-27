import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserOrdersCompleted from "./UserOrdersCompleted";

const UserProfile = ({ auth }) => {
  return (
    <section className="main">
      <div>
        <img src={auth.imageUrl} width='100%' height='100%'/>
      </div>
      <div className="info">
        <h1>{auth.firstName} {auth.lastName}</h1>
        <p>Email:{auth.email}</p>
        <p>Address:{auth.address}, {auth.city}, {auth.state}, {auth.zipCode}</p>
      </div>
      <UserOrdersCompleted />
      {auth.isGuest ? (
        <button className='create-btn'>
          <Link to="/profile/edit/credentials"> Create Profile</Link>
        </button>
      ) : (
        <button className='update-btn'>
          <Link to="/profile/edit"> Edit Profile</Link>
        </button>
      )}
    </section>
  );
};

export default connect((state) => state)(UserProfile);

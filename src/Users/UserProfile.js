import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserOrdersCompleted from "./UserOrdersCompleted";

const UserProfile = ({ auth }) => {
  const openProfileForm = () => {
    document.getElementById("main-app").style.marginRight = '350px';
    document.getElementById("editProfile-form").style.width = '300px';
  }
  const openCredentialsForm = () => {
    document.getElementById("main-app").style.marginRight = '350px';
    document.getElementById("credentials-form").style.width = '300px';
  }
  const openCreateAccountForm = () => {
    document.getElementById("main-app").style.marginRight = '100%';
    document.getElementById("createAccount-form").style.width = '100%';
  }
  return (
    <section className="main">
      {
        auth.isGuest ? <p>You do not have an account set up yet.</p> :
        <div className='profile'>
          <div className='image'>
            <img src={auth.imageUrl} width='100%' height='100%'/>
          </div>
          <div className="info">
            <h1>{auth.firstName} {auth.lastName}</h1>
            <p>Email:<br />
              {auth.email}
            </p>
            <p>Address:<br />
              {auth.fullAddress}
            </p>
          </div>
        </div>
      }
      <UserOrdersCompleted />
      {auth.isGuest ? (
        <button className='open-form-btn' onClick={() => openCreateAccountForm()}>Create Profile</button>
      ) : (
        <div>
          <button onClick={() => openProfileForm()} className='open-form-btn'>Edit Profile</button>
          <button onClick={() => openCredentialsForm()} className='open-form-btn'>Edit Login Info</button>
        </div>
      )}
    </section>
  );
};
export default connect((state) => state)(UserProfile);

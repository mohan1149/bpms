import React from 'react';
import { useStore } from 'react-redux';
const Profile = ()=>{
    const store = useStore();
    const user = store.getState().app.loggedUser;
    return(
        <div>
            <h1>User Profile</h1>
            <p>User Name: {user.username}</p>
         
            
        </div>
    );
}
export default Profile;
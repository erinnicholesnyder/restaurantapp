import React, { useContext, useState } from "react";
import CartContext from "../components/context";

const Profile = () => {

var {isAuthenticated} = useContext(CartContext)
  return (
    isAuthenticated && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
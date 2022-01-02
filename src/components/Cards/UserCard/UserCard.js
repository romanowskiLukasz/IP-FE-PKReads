import React from "react";
import "./UserCard.css";

function UserCard({ user }) {
  const { name, email } = user;
  return (
    <div className="user_card_container">
      <h3>{name}</h3>
    </div>
  );
}

export default UserCard;

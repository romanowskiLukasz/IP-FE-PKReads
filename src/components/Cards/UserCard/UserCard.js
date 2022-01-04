import React from "react";
import { Link } from "react-router-dom";
import "./UserCard.css";

function UserCard({ user }) {
  const { name, email, id } = user;
  return (
    <Link to={"/users/" + id} className="link">
      <div className="user_card_container">
        <h3>{name}</h3>
      </div>
    </Link>
  );
}

export default UserCard;

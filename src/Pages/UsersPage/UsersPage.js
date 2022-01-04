import React, { useRef, useEffect, useState } from "react";
import UserCard from "../../components/Cards/UserCard/UserCard";
import "./UsersPage.css";

const axios = require("axios").default;

function UsersPage() {
  const inputRef = useRef("");
  const [allUsers, setAllUsers] = useState([]);
  const [choosenUsers, setChoosenUsers] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get("http://localhost:8080/users").then((resp) => {
      setAllUsers(resp.data);
      setChoosenUsers(resp.data);
    });
  }, []);

  const handleSearchChange = () => {
    if (inputRef.current.value !== "") {
      const newItems = choosenUsers.filter((item) => {
        return item.name
          .toLowerCase()
          .includes(inputRef.current.value.toLowerCase());
      });
      return setChoosenUsers(newItems);
    } else if (inputRef.current.value == "") return setChoosenUsers(allUsers);
  };
  return (
    <>
      <h1 className="catalog_page_title">Przeglądaj użytkowników</h1>
      <div className="catalog_page_divider" />
      <div className="catalog_page_inputs_container">
        <input
          ref={inputRef}
          onChange={handleSearchChange}
          type="text"
          placeholder="Wyszukaj użytkownika"
        />
      </div>
      <div className="users_cards_container">
        {choosenUsers.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    </>
  );
}

export default UsersPage;

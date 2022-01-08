import React, { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import "./UserInfo.css";
import ChangeUserInfo from "../ChangeUserInfo/ChangeUserInfo";
import { useStoreActions } from "easy-peasy";

const axios = require("axios").default;

function ContactInfo() {
  const me = useStoreState((state) => state.me);
  const [email, setEmail] = useState(
    useStoreState((state) => state.loggedUserEmal)
  );
  const changeEmailInStore = useStoreActions(
    (actions) => actions.setLoggedUserEmal
  );
  const [showEmailChange, setShowEmailChange] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const toggleEmailChange = () => {
    setShowEmailChange(!showEmailChange);
  };

  const togglePasswordChange = () => {
    setShowPasswordChange(!showPasswordChange);
  };

  const changeEmail = (values) => {
    if (me != null) {
      changeEmailInStore(values.newValue);
      setEmail(values.newValue);
      axios.put("http://localhost:8080/user/changeEmail", {
        password: values.password,
        newEmail: values.newValue,
        id: me.id,
      });
    }
  };

  const changePassword = (values) => {
    if (me != null) {
      axios.put("http://localhost:8080/user/changePassword", {
        password: values.password,
        newPassword: values.newValue,
        id: me.id,
      });
    }
  };

  const handleLogout = () => {
    window.location = "http://localhost:3000";
  };

  return (
    <div className="contact_info_container">
      <h2>Twoje dane</h2>
      <div className="user_info_divider" />
      <h3>Email</h3>
      <p>{email}</p>
      {!showEmailChange && (
        <button className="user_change_info_button" onClick={toggleEmailChange}>
          Zmień email
        </button>
      )}
      {showEmailChange && (
        <ChangeUserInfo
          placeholder={"Podaj nowy email"}
          isDisplayed={toggleEmailChange}
          onSubmit={changeEmail}
        />
      )}
      <div className="user_info_divider" />
      <h3>Imie i Nazwisko</h3>
      <p>{me.name}</p>
      <div className="user_info_divider" />
      <h3>Hasło</h3>
      {!showPasswordChange && (
        <button
          className="user_change_info_button"
          onClick={togglePasswordChange}
        >
          Zmień hasło
        </button>
      )}
      {showPasswordChange && (
        <ChangeUserInfo
          placeholder={"Podaj nowe hasło"}
          isDisplayed={togglePasswordChange}
          onSubmit={changePassword}
        />
      )}
      <div className="user_info_divider" />
      <button className="logout_button" onClick={handleLogout}>
        Wyloguj się
      </button>
    </div>
  );
}

export default ContactInfo;

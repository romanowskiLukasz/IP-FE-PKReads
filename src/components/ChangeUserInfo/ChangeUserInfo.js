import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import "./ChangeUserInfo.css";

function ChangeUserInfo({ placeholder, isDisplayed, onSubmit }) {
  const [values, setValues] = useState({
    password: "",
    newValue: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return (
    <div className="change_user_info_container">
      <div className="header" onClick={isDisplayed}>
        <CgClose />
      </div>

      <input
        value={values.password}
        name="password"
        onChange={handleChange}
        type="password"
        placeholder="Podaj hasło "
      />
      <input
        value={values.newValue}
        name="newValue"
        onChange={handleChange}
        type="text"
        placeholder={placeholder}
      />
      <button
        className="user_change_info_button"
        onClick={() => onSubmit(values)}
      >
        Zatwierdź
      </button>
    </div>
  );
}

export default ChangeUserInfo;

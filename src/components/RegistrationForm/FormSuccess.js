import React from "react";
import { Link } from "react-router-dom";
import Divider from "../Divider/Divider";
import "./Form.css";

const FormSuccess = () => {
  return (
    <div className="register_success_container">
      <Divider sectionTitle={"Konto zostało założone!"} />
      <Link to="/" className="form_success_link">
        <button className="form-input-btn">Wróć do strony głównej</button>
      </Link>
    </div>
  );
};

export default FormSuccess;

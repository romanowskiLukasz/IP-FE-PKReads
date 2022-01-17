import React from "react";
import validate from "./validateInfo";
import useForm from "./useForm";
import "./Form.css";
import { Link } from "react-router-dom";
import Divider from "../Divider/Divider";

const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className="form-content-right">
      <form onSubmit={handleSubmit} className="form" noValidate>
        <div className="login_form_title_container">
          <Divider sectionTitle={"Utwórz konto "} />
        </div>
        <div className="form-inputs">
          <label className="form-label">Imię i Nazwisko</label>
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Podaj swoje imię i nazwisko"
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Podaj swój email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Hasło</label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Wpisz swoje hasło"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Potwierdź hasło</label>
          <input
            className="form-input"
            type="password"
            name="password2"
            placeholder="Wpisz hasło ponownie"
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className="form-input-btn" type="submit">
          Utwórz konto
        </button>
        <Link to="/sign-up" className="form-input-login">
          <span>Masz już konto? Zaloguj się klikając tutaj.</span>
        </Link>
      </form>
    </div>
  );
};

export default FormSignup;

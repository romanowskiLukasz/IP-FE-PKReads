import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Buttons/Button";
import { useStoreState } from "easy-peasy";
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";
import { GiBlackBook } from "react-icons/gi";

const Navbar = () => {
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  useEffect(() => {
    showButton();
  }, [isLoggedIn]);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link
            to="/"
            className="navbar-logo"
            style={{ fontFamily: "'Galada', cursive" }}
            onClick={closeMobileMenu}
          >
            PKReads <GiBlackBook size={45} style={{ marginLeft: "5px" }} />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Strona Główna
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/books" className="nav-links" onClick={closeMobileMenu}>
                Katalog
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  to="/form"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Formularz
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link
                to="/contact"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Kontakt
              </Link>
            </li>

            {isLoggedIn ? (
              <li className="nav-item">
                <Link
                  to="/profile"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Profil Uzytkownika
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="/sign-up"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Logowanie
                </Link>
              </li>
            )}
          </ul>
          {button &&
            (isLoggedIn ? (
              <Link to="/profile">
                <CgProfile className="profile-icon" />
              </Link>
            ) : (
              <Button buttonStyle="btn--outline" path="/sign-up">
                Logowanie
              </Button>
            ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

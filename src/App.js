import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StoreProvider, createStore } from "easy-peasy";
import model from "./easy-peasy/model";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./Pages/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import CatalogPage from "./Pages/CatalogPage/CatalogPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import SingleBookPage from "./Pages/SingleBookPage/SingleBookPage";
import FormPage from "./Pages/FormPage/FormPage";
import UsersPage from "./Pages/UsersPage/UsersPage";

const store = createStore(model);

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <StoreProvider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<LoginPage />} />
            <Route path="/registration" element={<RegisterPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/books" element={<CatalogPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/books/:bookId" element={<SingleBookPage />} />
          </Routes>
          <Footer />
        </Router>
      </StoreProvider>
    </>
  );
}

export default App;

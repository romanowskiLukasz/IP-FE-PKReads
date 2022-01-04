import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import LibraryInfo from "../../components/LibraryInfo/LibraryInfo";
import NewBooks from "../../components/NewBooks/NewBooks";
import { useStoreState } from "easy-peasy";
import "./HomePage.css";
import { useStoreActions } from "easy-peasy";
const axios = require("axios").default;

function HomePage() {
  const [allBooks, setAllBooks] = useState([]);
  const userEmail = useStoreState((state) => state.loggedUserEmal);
  const setMe = useStoreActions((actions) => actions.setMe);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get("http://localhost:8080/books").then((resp) => {
      setAllBooks(resp.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8080/me/${userEmail}`).then((resp) => {
      setMe(resp.data);
    });
  }, [userEmail]);

  return (
    <>
      <Banner />
      <div className="home_page_container">
        <div className="home_page_books_container">
          <NewBooks
            books={allBooks.slice(0, 8)}
            sectionTitle={"Popularne książki"}
          />
          <NewBooks
            books={allBooks.slice(allBooks.length - 8, allBooks.length)}
            sectionTitle={"Nowości na naszej stronie"}
          />
        </div>
        <div className="home_page_info_container">
          <LibraryInfo />
        </div>
      </div>
    </>
  );
}

export default HomePage;

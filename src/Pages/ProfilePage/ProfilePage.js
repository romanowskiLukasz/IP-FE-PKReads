import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import ReservedBookTable from "../../components/ReservedBookTable/ReservedBookTable";
import UserInfo from "../../components/UserInfo/UserInfo";
import { useStoreState } from "easy-peasy";
import UserStatistics from "../../components/UserStatistics/UserStatistics";

const axios = require("axios").default;

function ProfilePage() {
  const userId = useStoreState((state) => state.me.id);
  const [books, setBooks] = useState([]);
  const [amountOfReadBooks, setAmountOfReadBooks] = useState(0);
  const [userRaitings, setUserRatings] = useState([]);

  useEffect(() => {
    if (userId != null) {
      axios
        .get(`http://localhost:8080/user/getBooksStatus/${userId}`)
        .then((resp) => {
          setBooks(resp.data);
        });
      axios.get(`http://localhost:8080/ratings/${userId}`).then((response) => {
        setUserRatings(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const newItems = books.filter((item) => item.bookStatus === "Przeczytana");
    setAmountOfReadBooks(newItems.length);
  }, [books]);

  return (
    <>
      <h1 className="contact_page_title">Twój profil</h1>
      <div className="contact_page_divider" />
      <div className="contact_page_container">
        <UserInfo />
        <div className="tables_container">
          <ReservedBookTable books={books} title={"Twoje książki"} />
          <UserStatistics
            AmountOfBooksOnShelf={books.length}
            amountOfReadBooks={amountOfReadBooks}
            amountOfRatings={userRaitings.length}
          />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

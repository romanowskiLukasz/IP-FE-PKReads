import React, { useEffect, useState } from "react";
import "./SingleUserPage.css";
import ReservedBookTable from "../../components/ReservedBookTable/ReservedBookTable";
import UserStatistics from "../../components/UserStatistics/UserStatistics";

const axios = require("axios").default;

function SingleUserPage() {
  const userId = window.location.href.substring(
    28,
    window.location.href.length
  );
  const [books, setBooks] = useState([]);
  const [amountOfReadBooks, setAmountOfReadBooks] = useState(0);
  const [username, setUsername] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/getBooksStatus/${userId}`)
      .then((resp) => {
        setBooks(resp.data);
      });
    axios.get(`http://localhost:8080/userInfo/${userId}`).then((resp) => {
      setUsername(resp.data.name);
    });
  }, []);

  useEffect(() => {
    const newItems = books.filter((item) => item.bookStatus === "Przeczytana");
    setAmountOfReadBooks(newItems.length);
  }, [books]);
  console.log(userId);
  return (
    <div className="single_user_page_container">
      <h1 className="contact_page_title">Profil użytkownika {username}</h1>
      <div className="contact_page_divider" />

      <div className="tables_container">
        <ReservedBookTable books={books} title={"Książki"} />
        <UserStatistics
          AmountOfBooksOnShelf={books.length}
          amountOfReadBooks={amountOfReadBooks}
        />
      </div>
    </div>
  );
}

export default SingleUserPage;

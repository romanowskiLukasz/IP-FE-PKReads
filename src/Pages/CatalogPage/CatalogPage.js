import React, { useEffect, useState, useRef } from "react";
import CatalogBooks from "../../components/CatalogBooks/CatalogBooks";
import "./CatalogPage.css";
import Categories from "../../components/Categories/Categories";
import { useStoreState } from "easy-peasy";

const axios = require("axios").default;

function CatalogPage() {
  const [allBooks, setAllBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chosenBooks, setChosenBooks] = useState([]);
  const [userRaitings, setUserRatings] = useState([]);
  const [avgRatings, setAvgRatings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const me = useStoreState((state) => state.me);
  const inputRef = useRef("");

  let allCategories = [
    "Wszystkie",
    ...new Set(allBooks.map((item) => item.category)),
  ];

  useEffect(() => {
    allCategories = [
      "Wszystkie",
      ...new Set(allBooks.map((item) => item.genre)),
    ];
    setCategories(allCategories);
  }, [allBooks]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get("http://localhost:8080/books").then((resp) => {
      setAllBooks(resp.data);
      setChosenBooks(resp.data);
    });
    if (me.id != null) {
      axios.get(`http://localhost:8080/ratings/${me.id}`).then((response) => {
        setUserRatings(response.data);
      });
      axios.get(`http://localhost:8080/avgRatings`).then((response) => {
        setAvgRatings(response.data);
      });
    }
  }, []);

  const filterBooksCategories = (category) => {
    if (category === "Wszystkie" || category === "") {
      setChosenBooks(allBooks);
      return;
    }
    const newItems = chosenBooks.filter((item) => item.genre === category);

    return setChosenBooks(newItems);
  };

  const handleSearchChange = () => {
    setSearchTerm(inputRef.current.value);
    console.log(inputRef.current.value);
    if (inputRef.current.value !== "") {
      const newItems = chosenBooks.filter((item) => {
        return item.title
          .toLowerCase()
          .includes(inputRef.current.value.toLowerCase());
      });
      return setChosenBooks(newItems);
    } else if (inputRef.current.value == "") return setChosenBooks(allBooks);
  };

  return (
    <>
      <h1 className="catalog_page_title">Katalog</h1>
      <div className="catalog_page_divider" />
      <div className="catalog_page_inputs_container">
        <input
          ref={inputRef}
          onChange={handleSearchChange}
          type="text"
          placeholder="Wyszukaj książkę"
        />
        <Categories
          categories={categories}
          filterBookCategories={filterBooksCategories}
        />
      </div>
      <CatalogBooks
        books={chosenBooks}
        userRaitings={userRaitings}
        avgRatings={avgRatings}
      />
    </>
  );
}

export default CatalogPage;

import React from "react";
import CatalogBookCard from "../Cards/CatalogBookCard/CatalogBookCard";
import "./CatalogBooks.css";

function CatalogBooks({ books, userRaitings, avgRatings }) {
  return (
    <div className="catalog_books_container">
      {books.map((book) => {
        const rating = userRaitings.find((rating) => {
          if (rating.book_book_id === book.book_id) {
            return rating.stars_count;
          }
        });
        const avgRating = avgRatings.find((rating) => {
          if (rating.book_book_id === book.book_id) {
            return rating.stars_count;
          }
        });
        return (
          <CatalogBookCard
            key={book.book_id}
            book={book}
            userRating={rating}
            avgRating={avgRating}
          />
        );
      })}
    </div>
  );
}

export default CatalogBooks;

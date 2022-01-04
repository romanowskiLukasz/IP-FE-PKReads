import React from "react";
import "./UserStatistics.css";

function UserStatistics({ AmountOfBooksOnShelf, amountOfReadBooks }) {
  return (
    <div>
      <h1 className="user_statistics_title">Statystiki konta</h1>
      <h3 className="user_statistics_headers">
        Ilość książek na półce:{AmountOfBooksOnShelf}
      </h3>
      <h3 className="user_statistics_headers">
        Ilość przeczytanych książek:{amountOfReadBooks}
      </h3>
    </div>
  );
}

export default UserStatistics;

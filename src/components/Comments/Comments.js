import React, { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import "./Comments.css";

const axios = require("axios").default;

function Comments({ comments, bookId }) {
  const [inputValue, setInputValue] = useState("");
  const [bookComments, setbookComments] = useState([]);
  const me = useStoreState((state) => state.me);
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);

  useEffect(() => {
    setbookComments(comments);
  }, [comments]);

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      if (me != null) {
        axios.post("http://localhost:8080/user/addComment", {
          content: inputValue,
          book_book_id: bookId,
          user_id: me.id,
        });
        let newComments = [
          ...bookComments,
          {
            content: inputValue,
            book_book_id: bookId,
            user_id: me.id,
            user_name: me.name,
          },
        ];
        setbookComments(newComments);
        setInputValue("");
      }
    }
  };

  return (
    <div className="comments_container">
      <div className="divider" />
      <h2>Komentarze</h2>
      {isLoggedIn && (
        <input
          value={inputValue}
          name="email"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          type="text"
          placeholder="Dodaj komentarz..."
          onKeyPress={handleSubmit}
        />
      )}

      {bookComments &&
        bookComments.map((comment) => {
          return (
            <>
              <h5 style={{ marginTop: "10px" }}>{comment.user_name}</h5>
              <p>{comment.content}</p>
            </>
          );
        })}

      {bookComments.length === 0 && (
        <p>Ta książka nie ma jeszcze żadnych recenzji</p>
      )}
    </div>
  );
}

export default Comments;

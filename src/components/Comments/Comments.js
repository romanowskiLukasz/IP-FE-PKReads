import React, { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";
import "./Comments.css";
import { RiDeleteBin5Fill } from "react-icons/ri";

const axios = require("axios").default;

function Comments({ comments, bookId }) {
  const [inputValue, setInputValue] = useState("");
  const [bookComments, setbookComments] = useState([]);
  const me = useStoreState((state) => state.me);
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);

  useEffect(() => {
    setbookComments(comments);
  }, [comments]);

  const handleDelete = (id) => {
    let newBookComments = bookComments.filter((comment) => comment.id != id);
    setbookComments(newBookComments);
    axios.delete("http://localhost:8080/deleteComment/" + id);
  };

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
      <h2>Recenzje</h2>
      {isLoggedIn && (
        <input
          value={inputValue}
          name="email"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          type="text"
          placeholder="Dodaj recenzje..."
          onKeyPress={handleSubmit}
        />
      )}

      {bookComments &&
        bookComments.map((comment) => {
          return (
            <div className="comment_container">
              <div>
                <h5 style={{ marginTop: "10px" }}>{comment.user_name}</h5>
                <p>{comment.content}</p>
              </div>
              <div
                className="coment_icon_container"
                onClick={() => handleDelete(comment.id)}
              >
                <RiDeleteBin5Fill />
              </div>
            </div>
          );
        })}

      {bookComments.length === 0 && (
        <p>Ta książka nie ma jeszcze żadnych recenzji</p>
      )}
    </div>
  );
}

export default Comments;

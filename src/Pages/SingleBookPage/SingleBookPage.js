import React, { useEffect, useState, useRef } from "react";
import Divider from "../../components/Divider/Divider";
import "./SingleBookPage.css";
import { useStoreState } from "easy-peasy";
import Comments from "../../components/Comments/Comments";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const axios = require("axios").default;

function SingleBookPage() {
  let bookId = window.location.href.substring(28, window.location.href.length);

  const [bookInfo, setBookInfo] = useState([]);
  const [comments, setComments] = useState([]);
  const reference = useRef(null);

  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
  const me = useStoreState((state) => state.me);

  const [bookStatus, setBookStatus] = useState("");
  const [bookStatusId, setBookStatusId] = useState();

  const handleChange = (event) => {
    setBookStatus(event.target.value);
    if (bookStatusId != undefined) {
      axios.put("http://localhost:8080/user/updateBookStatus", {
        id: bookStatusId,
        bookStatus: event.target.value,
        book_book_id: bookId,
        user_id: me.id,
      });
    } else {
      axios.post("http://localhost:8080/user/addBookStatus", {
        bookStatus: event.target.value,
        book_book_id: bookId,
        user_id: me.id,
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`http://localhost:8080/books/${bookId}`).then((resp) => {
      setBookInfo(resp.data);
    });
    axios.get(`http://localhost:8080/getComments/${bookId}`).then((resp) => {
      setComments(resp.data);
    });
    if (me.id != undefined) {
      axios
        .get(`http://localhost:8080/getBookStatus/${bookId}/${me.id}`)
        .then((resp) => {
          setBookStatus(resp.data.bookStatus);
          setBookStatusId(resp.data.id);
        });
    }
  }, []);

  const { description, genre, img, name, publishingHouse, title } = bookInfo;

  return (
    <>
      <div className="single_book_container">
        <img src={img} />
        <div className="single_book_description_container">
          <Divider sectionTitle={title} />
          <p>{description}</p>
          {isLoggedIn && (
            <Box sx={{ minWidth: 120 }} style={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">
                Status książki
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bookStatus}
                label="BookStatus"
                onChange={handleChange}
              >
                <MenuItem value={"Do przeczytania"}>Do przeczytania</MenuItem>
                <MenuItem value={"W trakcie czytania"}>
                  W trakcie czytania
                </MenuItem>
                <MenuItem value={"Przeczytana"}>Przeczytana</MenuItem>
              </Select>
            </Box>
          )}
        </div>
        <div className="single_book_description_container">
          <h2>
            Kategoria:
            <br />
            {genre}
          </h2>
          <h2>
            Autor:
            <br />
            {name}
          </h2>
          <h2>
            Wydawinctwo:
            <br />
            {publishingHouse}
          </h2>
        </div>
      </div>
      <Comments comments={comments} bookId={bookId} />
    </>
  );
}

export default SingleBookPage;

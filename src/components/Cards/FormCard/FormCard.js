import React from "react";
import "./FormCard.css";
import Divider from "../../Divider/Divider";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";

function FormCard({ form, handleDelete, handleapprovement }) {
  const { author, description, id, img, publishingHouse, title, userId } = form;
  return (
    <div className="form_card_container">
      <img src={img} />
      <div className="catalog_book_card_content">
        <Divider sectionTitle={title} />
        <p>Autor: {author}</p>
        <p>Wydawnictwo: {publishingHouse}</p>
        <p>Opis: {description}</p>
      </div>
      <div className="form_card_icons_container">
        <TiTick
          size={30}
          className="form_aprove_icon"
          onClick={() => handleapprovement(id)}
        />
        <RiDeleteBin5Fill
          size={30}
          className="form_delete_icon"
          onClick={() => handleDelete(id)}
        />
      </div>
    </div>
  );
}

export default FormCard;

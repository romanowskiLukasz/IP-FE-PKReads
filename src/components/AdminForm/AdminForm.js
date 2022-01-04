import React, { useEffect, useState } from "react";
import "./AdminForm.css";
import FormCard from "../Cards/FormCard/FormCard";

const axios = require("axios").default;

function AdminForm() {
  const [forms, setForms] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get("http://localhost:8080/admin/getForms").then((resp) => {
      setForms(resp.data);
    });
  }, []);

  const handleDelete = (id) => {
    let newForms = forms.filter((form) => form.id != id);
    setForms(newForms);
    axios.delete("http://localhost:8080/deleteForm/" + id);
  };

  const handleapprovement = (id) => {
    let newForms = forms.filter((form) => form.id != id);
    let approuvedForm = forms.filter((form) => form.id === id);
    setForms(newForms);
    console.log(approuvedForm);
    axios.delete("http://localhost:8080/deleteForm/" + id);
    axios.post("http://localhost:8080/admin/addBook", {
      id: id,
      description: approuvedForm[0].description,
      img: approuvedForm[0].img,
      title: approuvedForm[0].title,
      author: approuvedForm[0].author,
      publishingHouse: approuvedForm[0].publishingHouse,
      userId: approuvedForm[0].userId,
    });
  };

  console.log(forms);
  return (
    <>
      <h1 className="catalog_page_title">Przesłane formularze</h1>
      <div className="catalog_page_divider" />
      <div className="users_cards_container">
        {forms.map((form) => {
          return (
            <FormCard
              key={form.id}
              form={form}
              handleDelete={handleDelete}
              handleapprovement={handleapprovement}
            />
          );
        })}
      </div>
    </>
  );
}

export default AdminForm;

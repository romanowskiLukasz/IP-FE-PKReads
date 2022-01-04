import React, { useEffect, useState } from "react";
import "./FormPage.css";
import { useStoreState } from "easy-peasy";
import UserForm from "../../components/UserForm/UserForm";
import AdminForm from "../../components/AdminForm/AdminForm";

const axios = require("axios").default;

function FormPage() {
  const me = useStoreState((state) => state.me);
  return (
    <>
      {me.account_type === "user" && <UserForm />}
      {me.account_type === "admin" && <AdminForm />}
    </>
  );
}

export default FormPage;

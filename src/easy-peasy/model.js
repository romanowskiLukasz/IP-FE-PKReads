import { action } from "easy-peasy";

export default {
  isLoggedIn: false,
  loggedUserEmal: "",
  me: "",

  //============= ACTIONS =================
  setIsLoggedIn: action((state, email) => {
    state.isLoggedIn = true;
    state.loggedUserEmal = email;
  }),
  setMe: action((state, userInfo) => {
    state.me = userInfo;
  }),
  setLoggedUserEmal: action((state, newEmail) => {
    state.loggedUserEmal = newEmail;
  }),
};

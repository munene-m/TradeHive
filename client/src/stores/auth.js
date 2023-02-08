import { defineStore, acceptHMRUpdate } from "pinia";
import { registerUrl, loginUrl } from "../utils/authUrls";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("token")),
    userDetails: "",
    roles: null
  }),

  getters: {},

  actions: {
    async register(firstname, lastname, email, password) {
      const response = await axios.post(registerUrl, {
        firstname,
        lastname,
        email,
        password,
      });
      this.user = response.data.token;
      localStorage.setItem("token", JSON.stringify(response.data.token));
    },
    async login(email, password) {
      const response = await axios.post(loginUrl, { email, password });
      this.user = response.data.token;
      localStorage.setItem("token", JSON.stringify(response.data.token));
      console.log(this.user);
    },
    async logOut() {
      this.user = null;
      localStorage.removeItem("token");
    },
    async getUser() {
      await fetch("http://localhost:3000/auth/credentials", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.user}`,
        },
      })
        .then((response) => response.json())
        .then((response) => (this.userDetails = response.firstname))
        .catch((err) => console.log(err));
    },
    setRoles(role) {
      this.roles = role
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

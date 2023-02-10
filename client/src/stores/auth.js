import { defineStore, acceptHMRUpdate } from "pinia";
import { registerUrl, loginUrl } from "../utils/authUrls";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("token")),
    userDetails: "",
    clientRole: JSON.parse(localStorage.getItem("clientRole")),
    freelancerRole: JSON.parse(localStorage.getItem("freelancerRole")),
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
      // console.log(this.user);
    },
    async logOut() {
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("clientRole");
      localStorage.removeItem("freelancerRole")
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
      if (role === "Client") {
        this.clientRole = role;
        localStorage.setItem("clientRole", JSON.stringify(role));
      } else if(role === "Freelancer") {
        this.freelancerRole = role;
        localStorage.setItem("freelancerRole", JSON.stringify(role));
      }
      // this.roles = role
      console.log(this.clientRole);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

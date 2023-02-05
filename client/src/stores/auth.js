import { defineStore, acceptHMRUpdate } from "pinia";
import { registerUrl, loginUrl } from "../utils/authUrls";


export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: JSON.parse(localStorage.getItem("token"))
  }),

  getters:{

  },

  actions: {
    async register(firstname, lastname, email, password ){ 
      const response = await axios.post(registerUrl, {firstname, lastname, email, password})
      this.token = response.data.token
      localStorage.setItem("token", JSON.stringify(response.data.token))
    },
    async login(email, password) {
      const response = await axios.post(loginUrl, {email, password})
      this.token = response.data.token
      localStorage.setItem("token", JSON.stringify(response.data.token))
    }
  }
});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
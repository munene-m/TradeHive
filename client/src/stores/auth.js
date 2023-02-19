import { defineStore, acceptHMRUpdate } from "pinia";
import { registerUrl, loginUrl } from "../utils/authUrls";
import axios from "axios";
// import { getFreelanceUsers } from "../../../server/controllers/authController";


export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("token")),
    firstname: "",
    lastname: "",
    email: "",
    category: [],
    role: "",
    userId: "",
    // userCategory: JSON.parse(localStorage.getItem("category")),
    services: JSON.parse(localStorage.getItem("Services")),
    clientRole: JSON.parse(localStorage.getItem("clientRole")),
    freelancerRole: JSON.parse(localStorage.getItem("freelancerRole")),
    freelancers: [],
    userDetails: JSON.parse(localStorage.getItem("userDetails")),
  }),

  getters: {},

  actions: {
    async register(firstname, lastname, email, password, category, role) {
      const response = await axios.post(registerUrl, {
        firstname,
        lastname,
        email,
        password,
        category, 
        role
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
      localStorage.removeItem("Services")
      localStorage.removeItem("category")
      localStorage.removeItem("userDetails")
    },
    async getUser() {
      await fetch("http://localhost:3000/auth/credentials", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.user}`,
        },
      })
        .then(response => response.json())
        .then(response => {
          this.firstname = response.firstname
          this.lastname = response.lastname
          this.email = response.email
          this.role = response.role
          console.log(this.role)
          this.userId = response._id
          this.category = response.category
          console.log(this.category)
          // this.userCategory = response.category
          // localStorage.setItem("category",JSON.stringify(this.userCategory))
          // console.log(this.userCategory)
          })
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
      console.log(this.freelancerRole)
    },
    async jobsInCategory() {
      console.log("this.usercategory >> ",this.userCategory)

      const url = `http://localhost:3000/services/service/${this.userCategory}`;
      const res = await axios.get(url)
      console.log(res.data)
      this.services = res.data
      localStorage.setItem("Services", JSON.stringify(this.services))
    },
    async getFreelancers(){
      const res = await axios.get('http://localhost:3000/auth/freelancers')
      this.freelancers = res.data
      console.log(res.data)
    },
    async updateClient(category, contact) {
      await axios.put(`http://localhost:3000/auth/update/${this.userId}`, {
       category, contact
      }).then(response => {
        console.log(response.data)
      localStorage.setItem("userDetails", JSON.stringify(response.data.category))
      }).catch(err => {
        console.log(err)
      })
    },
    async updateFreelancer(location, workingHours, rates, category, contact){
      await axios.put(`http://localhost:3000/auth/update/${this.userId}`, {
        location, workingHours, rates, category, contact
      }).then(response => {
        console.log(response.data)
      localStorage.setItem("userDetails", JSON.stringify(response.data.category))
      }).catch(err => {
        console.log(err)
      })
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}

import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useServiceStore = defineStore("services", () => {
  let user = JSON.parse(localStorage.getItem("token"));
  const userServices = ref(null);
  const services = ref([]);

  const getServices = async () => {
    await fetch("http://localhost:3000/services/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user}`,
      },
    })
      .then((response) => response.json())
      .then((response) => (userServices.value = response.category))
      .catch((err) => console.log(err));
  };
  const createJobs = async ( name, description, price, currency, category, provider, contactInfo) => {
    axios.post("http://localhost:3000/services/create",{ name, description, price, currency, category, provider, contactInfo, },
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const jobsInCategory = async () => {
  //   await axios.get(`http://localhost:3000/services/service/${authStore.userCategory}`)
  //     .then((response) => {
  //       console.log(response);
  //       services.value = response.data;
  //       // console.log(services.value)
  //     })
  //     .catch((err) => console.log(err));
  // };
  return { getServices, services, createJobs };
});

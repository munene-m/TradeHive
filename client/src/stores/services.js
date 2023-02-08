import { defineStore } from "pinia";
import { ref } from "vue";

export const useServiceStore = defineStore("services", () => {
  let user = JSON.parse(localStorage.getItem("token"));
  const userServices = ref(null);

  const getServices = async () => {
    await fetch("http://localhost:3000/services", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user}`,
      },
    })
      .then((response) => response.json())
      .then((response) => (userServices.value = response))
      .catch((err) => console.log(err));
  };
  return { getServices };
});

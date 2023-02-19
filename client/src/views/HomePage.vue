<script setup>
import { onMounted, ref, watchEffect, reactive } from "vue";
import { useAuthStore } from "../stores/auth";
import axios from 'axios'
const authStore = useAuthStore();
const getUser = authStore.getUser();
const jobsInCategory = authStore.jobsInCategory();
const getFreelancers = authStore.getFreelancers()

onMounted(() => {
  getUser
  getFreelancers
});
watchEffect(() => {
  if(authStore.userCategory !== null){
    jobsInCategory
  }
  function filterCategories(category){
    return authStore.category.filter(item => item === category)
}

 async function getCategoryData(category){
    await axios.get(`http://localhost:3000/services/service/${category}`)
    .then(response => {
      // Handle the response data
      console.log(response.data);
    })
    .catch(error => {
      // Handle the error
      console.log(error);
    });
}

authStore.category.forEach(category => {
  // Filter the array to create a new array with only the current category
  const filteredCategories = filterCategories(category);

  // Call the getCategoryData function with the first item in the filtered array
  if (filteredCategories.length > 0) {
    getCategoryData(filteredCategories[0]);
  }
});
})

</script>

<template>
  <div class="header">
    <h1>Welcome, {{ authStore.firstname }}</h1>
    <img src="../assets/images/Group 2.png" alt="" />
  </div>
  <div class="jobs" v-if="authStore.freelancerRole">
    <div class="recommendations">
      <h2>Recommended jobs for you</h2>
      <div v-if="authStore.services !== null">
        <div id="service" v-for="service in authStore.services" :key="service._id">
          <h2>Job title - {{ service.name }}</h2>
          <p>Job description - {{ service.description }}</p>
          <p>Duration - {{ service.duration }}</p>
          <p>Payment - {{ service.price }} {{ service.currency }}</p>
        </div>
      </div>
      <div id="freelancerPage" v-else-if="authStore.clientRole">
        <div v-if="authStore.freelancers !== null">
          <div v-for="freelancer in authStore.freelancers" :key="freelancer._id">
            <h2>Name: {{ freelancer.firstname }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: relative;
  top: 10rem;
  margin-left: 6rem;
  border-radius: 12px;
  border: 1px solid crimson;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #ffb8c5;
}
.jobs {
  margin-left: 6rem;
}
.header img {
  width: 15%;
}
.searchBar {
  display: flex;
  position: relative;
  top: 10rem;
  min-width: 100px;
}
.icon {
  position: absolute;
  top: 25px;
  left: 1rem;
  width: 14px;
}
.searchBar input {
  border: 1px solid grey;
  border-radius: 5px;
  height: 28px;
  width: 50%;
  /* margin: auto; */
  padding: 2px 23px 2px 30px;
  outline: 0;
  background-color: #f5f5f5;
  margin-top: 1rem;
}
.searchBar input:hover,
.searchBar input:focus {
  border: 1.5px solid #009688;
  background-color: white;
}
.recommendations {
  position: relative;
  top: 10rem;
}
#service {
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 65%;
  padding: 10px 20px;
  margin-bottom: 10px;
}
#freelancerPage{
  position: relative;
  top:10rem;
}
</style>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
const router = useRouter()
const authStore = useAuthStore()
const freelancers = ref([])
const jobs = ref([])
const categoryName = "Interior design"
onMounted(() => {
    getJobs
    getFreelancers
})

const getJobs = axios.get(`http://localhost:3000/services/service/${categoryName}`)
.then((response) => {
    console.log(response.data);
    jobs.value.push(response.data[0])

}).catch((err) => {
    console.log(err)
})

const getFreelancers = axios.get(`http://localhost:3000/auth/users/${categoryName}`)
.then((response) => {
    console.log(response.data);
    freelancers.value.push(response.data[0])

}).catch((err) => {
    console.log(err)
})
</script>

<template>
  <h2 class="title">Recommended</h2>
  <p class="titleDesc" v-if="jobs === []">No jobs have been added yet</p>
  <div v-else class="freelancerPage" v-if="authStore.role === 'Freelancer'">
    <div id="service" v-for="job in jobs" :key="job._id">
      <h2>Client - {{ job.provider }}, Contact - {{ job.contactInfo }}</h2>
      <h3>Job title - {{ job.name }}</h3>
      <p>Job description - {{ job.description }}</p>
      <p>Payment - {{ job.price }} {{ job.currency }}</p>
      <button
        @click="router.push({ path: `/home-page/${job._id}` })"
        class="showDetails"
      >
        Show details
      </button>
    </div>
  </div>
    <div class="clientPage" v-if="authStore.role === 'Client'">
        <h2 class="title">Recommended</h2>
        <p v-if="freelancers === []">No freelancers in this category yet</p>
        <div v-else class="freelancerGrid">
          <div  id="freelancer" v-for="freelancer in freelancers" :key="freelancer._id">
          <h2>{{ freelancer.firstname }} {{ freelancer.lastname }}</h2>
          <p>Location: {{ freelancer.location }}</p>
          <p>Working hours - {{ freelancer.workingHours }}</p>
          <button @click="router.push({ path: `/home-page/freelancer/${freelancer._id}` })" class="showDetails">
            Show details
          </button>
        </div>
        </div>
    </div>
  </template>
  
  <style scoped>
  /* h2 {
    position: relative;
    top: 9rem;
    margin: 0;
    font-style: italic;
    color: #626262;
  }
  p {
    position: relative;
    top: 9rem;
    color: #989898;
  } */
  .freelancerPage, .clientPage{
    position: relative;
    top: 9rem;
  }
  .title {
  position: relative;
  top: 9rem;
  text-align: center;
  margin: 0;
  font-style: italic;
  color: #626262;
}
.titleDesc{
  position: relative;
  top: 9rem;
}
  #service {
    margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 65%;
  padding: 10px 20px;
  margin-bottom: 10px;
}
.freelancerGrid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  margin-right: 4rem;
  margin-left: 4rem;
}
#freelancer {
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 60%;
  padding: 10px 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
button {
  border: none;
  padding: 8px 16px;
  outline: none;
  border-radius: 7px;
  background: crimson;
  color: white;
  cursor: pointer;
}
  </style>
  
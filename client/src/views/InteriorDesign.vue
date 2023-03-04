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

const getFreelancers = axios.get(`http://localhost:3000/auth/freelancers/${categoryName}`)
.then((response) => {
    console.log(response.data);
    freelancers.value.push(response.data)

}).catch((err) => {
    console.log(err)
})
</script>

<template>
  <h2 class="title">Recommended</h2>
  <p class="titleDesc" v-if="jobs === []">No jobs have been added yet</p>
  <div v-else class="jobPage" v-if="authStore.role === 'Freelancer'">
    <div id="service" v-for="job in jobs" :key="job._id">
      <h2>Client - {{ job.provider }}</h2>
      <h3>Job title - {{ job.name }}</h3>
      <p>Job description - {{ job.description }}</p>
      <button
        @click="router.push({ path: `/home-page/${job._id}` })"
        class="showDetails"
      >
        Show details
      </button>
    </div>
  </div>
    <div class="clientPage" v-if="authStore.role === 'Client'">
        <p v-if="freelancers === []">No freelancers in this category yet</p>
        <div v-else class="freelancerGrid">
          <div  id="freelancer" v-for="freelancer in freelancers[0]" :key="freelancer._id">
          <h2>{{ freelancer.firstname }} {{ freelancer.lastname }}</h2>
          <p>Location: {{ freelancer.location }}</p>
          <p>Working hours - {{ freelancer.workingHours }}</p>
          <p class="freelancerContact">Contact info - {{ freelancer.contact }}</p>
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
  .jobPage, .clientPage{
    position: relative;
    top: 9rem;
  }
  .jobPage{
    margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  margin-right: 4rem;
  margin-left: 4rem;
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
  border: 1px solid #707070;
  border-radius: 8px;
  width: 60%;
  padding: 10px 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
  border: 1px solid #707070;
  border-radius: 8px;
  width: 60%;
  max-width:350px;
  padding: 10px 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.freelancerContact{
  font-weight: 700;
    border: 1px solid crimson;
    padding: 2px 7px;
    border-radius: 4px;
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
  
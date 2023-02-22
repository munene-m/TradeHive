<script setup>
import { onMounted, ref, watchEffect, reactive } from "vue";
import { useAuthStore } from "../stores/auth";
import axios from "axios";
import { useRouter } from "vue-router";
import Modal from "../components/Modal.vue";
import { createAvatar } from "@dicebear/core";
import { miniavs } from "@dicebear/collection";
const avatar = createAvatar(miniavs, {
  seed: Math.random("John Doe"),
  size: 64,
  radius: 50,
  backgroundColor: ["c0aede", "b6e3f4"],
  glasses: ["variant01"],
}).toDataUriSync();
const router = useRouter();
const authStore = useAuthStore();
const getUser = authStore.getUser();
const jobsInCategory = authStore.jobsInCategory();
const jobRecommendations = ref([]);
const freelancerRecommendations = ref([]);

let showModal = ref(false);
function jobForm() {
  showModal.value = true;
}

onMounted(() => {
  getUser, filterCategories;
  getCategoryData;
  getFreelancers;
});
watchEffect(() => {
  if (authStore.userCategory !== null) {
    jobsInCategory;
  }
});
function filterCategories(category) {
  return authStore.category.filter((item) => item === category);
}

async function getCategoryData(category) {
  await axios
    .get(`http://localhost:3000/services/service/${category}`)
    .then((response) => {
      // Handle the response data
      jobRecommendations.value.push(response.data[0]);
      console.log(jobRecommendations.value);
    })
    .catch((error) => {
      // Handle the error
      console.log(error);
    });
}

const getFreelancers = async (category) => {
  await axios
    .get(`http://localhost:3000/auth/freelancers/${category}`)
    .then((response) => {
      // Handle the response data
      const filteredData = response.data.filter((array, index, self) => {
        return (
          index ===
          self.findIndex((a) => JSON.stringify(a) === JSON.stringify(array))
        );
      });
      for (let i = 0; i < filteredData.length; i++) {
        const element = filteredData[i];
        freelancerRecommendations.value.push(element);
        console.log(freelancerRecommendations.value);
      }
    })
    .catch((error) => {
      // Handle the error
      console.log(error);
    });
};

authStore.category.forEach((category) => {
  // Filter the array to create a new array with only the current category
  const filteredCategories = filterCategories(category);

  // Call the getCategoryData function with the first item in the filtered array
  if (filteredCategories.length > 0) {
    getCategoryData(filteredCategories[0]);
    getFreelancers(filteredCategories[0]);
  }
});
</script>

<template>
  <div class="header">
    <div class="headerInfo">
      <h1>Welcome, {{ authStore.firstname }}</h1>
      <img src="../assets/images/Group 2.png" alt="" />
    </div>
    <div class="createJob">
      <p>Click here to create a job now:</p>
      <button @click="jobForm" class="postjobBtn">Post job</button>
      <Modal :show="showModal" @close="showModal = false" />
    </div>
  </div>
  <div class="jobs">
    <div class="recommendations" v-if="authStore.role === 'Freelancer'">
      <h2 class="RecoTitle">Recommended jobs for you</h2>
      <div v-if="jobRecommendations !== null">
        <div id="service" v-for="job in jobRecommendations" :key="job._id">
          <h2>Job title - {{ job.name }}</h2>
          <p>Job description - {{ job.description }}</p>
          <p>Duration - {{ job.duration }}</p>
          <p>Payment - {{ job.price }} {{ job.currency }}</p>
          <button
            @click="router.push({ path: `/home-page/${job._id}` })"
            class="showDetails"
          >
            Show details
          </button>
        </div>
      </div>
    </div>
    <div id="freelancerPage" v-else-if="authStore.role === 'Client'">
      <h2 class="RecoTitle">Recommended freelancers for you</h2>
      <div class="freelancerGrid" v-if="freelancerRecommendations !== null">
        <div
          id="freelancer"
          v-for="freelancer in freelancerRecommendations"
          :key="freelancer._id"
        >
          <img :src="avatar" alt="" :key="freelancer" />
          <h2>{{ freelancer.firstname }} {{ freelancer.lastname }}</h2>
          <p>Location: {{ freelancer.location }}</p>
          <p>Working hours - {{ freelancer.workingHours }}</p>
          <button
            @click="
              router.push({ path: `/home-page/freelancer/${freelancer._id}` })
            "
            class="showDetails"
          >
            Show details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header{
  display: flex;
    align-items: center;
    justify-content: center;
    gap:15px;
    margin-right: 6rem;
    margin-left:6rem;
}
.headerInfo {
  position: relative;
  top: 10rem;
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
#freelancerPage {
  position: relative;
  top: 10rem;
}
.RecoTitle{
  margin-left:4rem;
}
.freelancerGrid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  margin-right: 4rem;
  margin-left: 4rem
}
#freelancer {
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
.showDetails {
  padding: 8px 16px;
  color: white;
  background-color: crimson;
  border: 2px solid crimson;
  border-radius: 28px;
  font-weight: bold;
  display: flex;
  cursor: pointer;
  align-items: center;
}
.createJob {
  position: relative;
    top: 10rem;
    padding: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65%;
    height: 5.5rem;
    border-radius: 10px;
    border: 1px solid crimson;
    background: #ffb8c5;
}
.createJob > p, button {
  margin: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.postjobBtn {
  padding: 8px 16px;
  color: black;
  background-color: rgb(0, 218, 0);
  border: 2px solid rgb(0, 218, 0);
  border-radius: 28px;
  font-weight: bold;
  display: flex;
  cursor: pointer;
  align-items: center;
}
</style>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const freelancers = ref([]);

const props = defineProps({
  freelancerId: {
    type: String,
    required: true,
  },
});
onMounted(() => {
  axios
    .get(`http://localhost:3000/auth/user/${props.freelancerId}`)
    .then((response) => {
      // Handle the response data
      console.log(response.data);
      freelancers.value.push(response.data);
    })
    .catch((error) => {
      // Handle the error
      console.log(error);
    });
});
</script>

<template>
  <h1 class="title">Freelancer profile</h1>
  <div v-for="freelancer in freelancers[0]" :key="freelancerId">
    <h2>Name: {{ freelancer.firstname }} {{ freelancer.lastname }}</h2>
    <h4>Contact - {{ freelancer.contact }}</h4>
    <p>Location: {{ freelancer.location }}</p>
    <p>Working hours: {{ freelancer.workingHours }}</p>
    <p>Rates: {{ freelancer.rates }}</p>
  </div>
</template>

<style scoped>
.title {
  position: relative;
  top: 9rem;
  text-align: center;
  margin: 10px 0;
  color: #737373;
  font-style: italic;
  text-decoration: underline;
}
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #a3a3a3;
  width: 50%;
  max-width: 320px;
  margin: auto;
  border-radius: 10px;
  position: relative;
  top: 10rem;
}
</style>

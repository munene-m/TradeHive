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
      freelancers.value.push(response.data)   
    })
    .catch((error) => {
      // Handle the error
      console.log(error);
    });
});
</script>

<template>
  <div v-for="freelancer in freelancers[0]" :key="freelancerId">
    <h2>Name: {{ freelancer.firstname }} {{ freelancer.lastname }}</h2>
  </div>
</template>

<style scoped>
div {
  position: relative;
  top: 10rem;
}
</style>

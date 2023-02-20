<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const jobs = ref([]);

const props = defineProps({
  jobId: {
    type: String,
    required: true,
  },
});
onMounted(() => {
  axios
    .get(`http://localhost:3000/services/${props.jobId}`)
    .then((response) => {
      // Handle the response data
      console.log(response.data);
      jobs.value.push(response.data)
    })
    .catch((error) => {
      // Handle the error
      console.log(error);
    });
});
</script>

<template>
  <div v-for="job in jobs" :key="jobId">
    <p>Title: {{ job.name }}</p>
  </div>
</template>

<style scoped>
div {
  position: relative;
  top: 10rem;
}
</style>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useAuthStore } from "../stores/auth";
// import { useServiceStore } from "../stores/services";
import SearchIcon from "../assets/icons/SearchIcon.vue";
const authStore = useAuthStore();
// const serviceStore = useServiceStore();
const getUser = authStore.getUser();
const searchInput = ref("");

onMounted(() => {
  getUser;
});

// watchEffect(() => {
//     if(authStore.roles === 'Client'){
//         clientRole.value === authStore.roles
//     } else {
//         freelancerRole.value === authStore.roles
//     }
// })
</script>

<template>
  <div class="header">
    <h1>Welcome, {{ authStore.userDetails }}</h1>
    <img src="../assets/images/Group 2.png" alt="" />
  </div>
  <div class="jobs" v-if="authStore.clientRole">
    <div class="searchBar">
      <SearchIcon class="icon"/>
      <input type="text" v-model="searchInput" placeholder="Search for jobs here..." />
    </div>
    <div class="recommendations">
        <h2>Recommended jobs for you</h2>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: relative;
  top: 10rem;
  margin-left: 6rem;
  border-radius: 12px;
  border: 1px solid #ccc;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}
.jobs{
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
.icon{
    position: absolute;
    top: 25px;
    left: 1rem;
    width: 14px;
}
.searchBar input{
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
.searchBar input:hover, .searchBar input:focus{
    border: 1.5px solid #009688;
    background-color: white;
}
.recommendations {
    position: relative;
    top:10rem;
}
</style>

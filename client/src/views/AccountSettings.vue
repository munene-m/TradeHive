<script setup>
import { onMounted, ref, watchEffect, reactive } from "vue";
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();
const getUser = authStore.getUser();
onMounted(() => {
    getUser
})
</script>


<template>
    <div class="settings">
        <h2>Complete setting up your account</h2>
        <h1>{{ authStore.username.charAt(0).toUpperCase() }}</h1>
        <h3>{{ authStore.username }}</h3>
    </div>
    <div v-if="authStore.clientRole">
        <p>Client profile</p>
    </div>
    <div v-else-if="authStore.freelancerRole">
        <p>Freelancer profile</p>
    </div>
</template>

<style scoped>
.settings{
    position: relative;
    top: 10rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.settings h1{ 
    padding: 10px;
    border: 1px solid #ccc;
    height: 2em;
    width: 2em;
    border-radius: 50%;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #888585;
    margin:0;
}
settings h3{
    margin:0;
    text-transform: capitalize;
}
</style>
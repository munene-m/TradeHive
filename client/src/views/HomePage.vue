<script setup> 
import { onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useServiceStore } from "../stores/services"
const authStore = useAuthStore()
const serviceStore = useServiceStore()
const getUser = authStore.getUser()

onMounted(() => {
    getUser
})
</script>

<template> 
<div class="header">
    <h1>Welcome, {{ authStore.userDetails }}</h1>
    <img src="../assets/images/Group 2.png" alt="">
</div>
<div v-if="authStore.roles = Client">

</div>
</template>

<style scoped>
.header{
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
.header img{
    width: 15%;
}
</style>
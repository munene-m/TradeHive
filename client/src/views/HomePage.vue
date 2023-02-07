<script setup> 
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore()
</script>

<template> 
<h1>Welcome, {{ authStore.userDetails }}</h1>
</template>

<style>
h1{
    position: relative;
    top:8rem;
}
</style>
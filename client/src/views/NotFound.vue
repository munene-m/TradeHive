<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const handle404 = () => {
    router.push('/home-page')
}
</script>

<template>
  <div>
    <h1>404 ERROR</h1>
    <p>This page does not exist. Kindly navigate to home</p>
    <button @click="handle404">Home</button>
  </div>
</template>
<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
button {
  padding: 8px 16px;
  color: white;
  background-color: crimson;
  border: 2px solid crimson;
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  cursor: pointer;
  align-items: center;
}
</style>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore()
const router = useRouter();
const handleSubmit = () => {
  router.push("/register");
};
</script>

<template>
  <main>
    <div class="container">
      <div class="hero-content">
        <h1>Get access to the brightest minds</h1>
        <p>
          Access Kenyan skilled individuals in various sectors at affordable
          rates.
        </p>
        <button v-if="!authStore.user" @click="handleSubmit">Get started</button>
      </div>
      <div class="community-img">
        <img src="../assets/images/Group 5.png" alt="" />
      </div>
    </div>
  </main>
</template>

<style scoped>
/* main {
  
  
} */
.container {
  position: relative;
  top: 10rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  /* margin: 0 6em; */
}
.hero-content {
  padding: 0 3em;
}
.hero-content h1 {
  color: crimson;
  font-size: 3.5rem;
  text-align: start;
}
.hero-content p {
  text-align: start;
  font-weight: bold;
  width: 20rem;
  /* margin: auto; */
  font-size: 20px;
}
.hero-content button {
  border: none;
  outline: none;
  cursor: pointer;
  background-color: crimson;
  color: #fff;
  padding: 12px 20px;
  border-radius: 24px;
}
.community-img img {
  padding: 0 4em;
}

@media only screen and (max-width: 768px) {
  /* main{
    top: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  } */
  .hero-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .hero-content h1{
    font-size: 2.5rem;
    text-align: center;
  }
  .hero-content p{
    width: 15rem;
    text-align: center;
    margin: auto;
    margin-bottom:20px;
  }
  .container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
    justify-items: center;
    /* margin: 0 6em; */
  }
  .community-img{
    visibility: hidden;
  }
}
</style>

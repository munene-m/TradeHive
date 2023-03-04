<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();
const router = useRouter();
const handleSubmit = () => {
  router.push("/register");
};
const handleSubmitStart = () => {
  router.push("/home-page");
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
        <button v-if="!authStore.user" @click="handleSubmit">
          Get started
        </button>
        <button v-else @click="handleSubmitStart">Get started</button>
      </div>
      <div class="community-img">
        <img src="../assets/images/Group 5.png" alt="" />
      </div>
    </div>
    <hr />
    <div class="body-content">
      <div class="freelancersCard">
        <h2>Freelancers</h2>
        <img src="../assets/images/networkImage.svg" alt="" />
        <p>As a freelancer, gain access to clients hiring from various locations in your categories of expertise.</p>
      </div>
      <div class="clientsCard">
        <h2>Clients</h2>
      <img src="../assets/images/ClientImage.svg" alt="">
      <p>As a client, gain access to skilled freelancers with affordable rates from all over the country.</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* main {
  
  
} */
.container {
  position: relative;
  top: 3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  margin-bottom: 12rem;
  /* margin: 0 6em; */
  /* background: #f5f2f2;*/
  height: 80vh; 
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
hr {
  margin: 1em 4em;
}
.body-content{
  display: grid;
    grid-template-columns: repeat(2,1fr);
    place-items: center;
    align-items: center;
    margin: 2rem 0;;
}
.freelancersCard{
  display: flex;
  position: relative;
  flex-direction: column;
  width: 50%;
  background: white;
  padding: 8px 16px;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 11px;
  max-width: 300px;
}
.freelancersCard p{
  text-align: center;
}
.freelancersCard img{
  border-bottom: 1px solid #777;
  width: 100%;
}
.clientsCard{
  display: flex;
  position: relative;
  flex-direction: column;
  width: 50%;
  background: white;
  padding: 8px 16px;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 11px;
  max-width: 300px;
}
.clientsCard p{
  text-align: center;
}
.clientsCard img{
  border-bottom: 1px solid #777;
  width: 100%;
}

@media only screen and (max-width: 768px) {
  /* main{
    top: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  } */
  .hero-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .hero-content h1 {
    font-size: 2.5rem;
    text-align: center;
  }
  .hero-content p {
    width: 15rem;
    text-align: center;
    margin: auto;
    margin-bottom: 20px;
  }
  .container {
    display: grid;
    top: 8rem;
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
    justify-items: center;
    height: auto;
    /* margin: 0 6em; */
  }
  .community-img {
    display: none;
  }
  .body-content{
  display: grid;
    grid-template-columns: repeat(1,1fr);
    place-items: center;
    gap:40px;
}
}

</style>

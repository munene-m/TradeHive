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
    <div class="pageTitle">
      <h1>Welcome to TradeHive.</h1>
    <p>A platform for freelancers to sell their skills and services.</p>
    </div>
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
      <div class="freelancersCard" >
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
.pageTitle{
  position: relative;
  top:9rem;
  text-align: center;
}
.pageTitle h1{
  margin: 0;
}
.container {
  position: relative;
  top: 8rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  margin-bottom: 12rem;
  /* margin: 0 6em; */
  /* background: #f5f2f2;*/
  height: 60vh; 
}
.hero-content {
  padding: 0 4em;
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
  transition: .3s;
}
.hero-content button:hover{
  transform: scale(0.96);
}
/* .community-img img {
  padding: 0 4em;
} */
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
.body-content div{
  height: -webkit-fill-available;
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
  border: 1px solid #eeeeee;
  border-radius: 11px;
  max-width: 300px;
  background-image: linear-gradient(0deg, #fff, #fff, #eeeeee 80%);
  border:1px solid #ccc;
  box-shadow: #0000001a 0 20px 25px -5px, #0000000a 0 10px 10px -5px;
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
  border: 1px solid #eeeeee;
  border-radius: 11px;
  max-width: 300px;
  background-image: linear-gradient(to top, #fff, #fff, #eeeeee 95%);
  box-shadow: #0000001a 0 20px 25px -5px, #0000000a 0 10px 10px -5px;
  border:1px solid #ccc;
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
    padding: 0;
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
hr{
  margin: 1em;
}
}

</style>

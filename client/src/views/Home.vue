<script setup></script>

<template>
  <main>
    <div class="container">
      <div class="hero-content">
        <h1>Get access to the brightest minds</h1>
      <p>
        Access Kenyan skilled individuals in various sectors at affordable rates.
      </p>
      <button>Get started</button>
      </div>
      <div class="community-img">
        <img src="../assets/images/Group 5.png" alt="">
      </div>
    </div>
  </main>
</template>

<style scoped>
main{
  position: relative;
  top:10rem;
}
.container{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  margin: 0 6em;
}
.hero-content{
  padding: 0 3em;
}
.hero-content h1{
  color: crimson;
  font-size: 3.5rem;
  text-align:start;
}
.hero-content p{
  text-align: start;
  font-weight: bold;
  width:20rem;
  /* margin: auto; */
  font-size: 20px;
}
.community-img img{
  padding:0 4em;
}
</style>

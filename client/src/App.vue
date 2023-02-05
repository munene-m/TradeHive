<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">

      <nav>
        <RouterLink class="heading" to="/">tradeHive</RouterLink>
        <div>
          <RouterLink class="loginBtn" to="/login">Log in</RouterLink>
          <RouterLink class="registerBtn" to="/register">Register</RouterLink>
        </div>
  
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem 1.5rem 5rem;
  border-bottom: 1px solid grey;
}
nav a {
  text-decoration: none;
}
.heading{
  color: black;
  font-size: 20px;
  font-weight: 700;
}
nav > div{
  display:flex;
  align-items: center;
}
.loginBtn{
  padding: 10px 20px;
  border: 2px solid black;
  border-radius: 28px;
  font-weight:bold;
}
.registerBtn {
  padding:10px 20px;
  color: white;
  background-color: crimson;
  border: 2px solid crimson;
  border-radius: 28px;
  margin-left: 12px;
  font-weight: bold;
}
</style>

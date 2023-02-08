<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";
const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logOut()
  router.push("/")
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink class="heading" to="/">tradeHive</RouterLink>
        <div v-if="authStore.user === null">
          <RouterLink class="loginBtn" to="/login">Log in</RouterLink>
          <RouterLink class="registerBtn" to="/register">Create account</RouterLink>
        </div>
        <div v-else>
          <a @click="handleLogout" class="logOutBtn">Log out</a>
        </div>
      </nav>
      <div v-if="authStore.user" class="categories">
        <RouterLink to="/wood-work">Wood work</RouterLink>
        <RouterLink to="/metal-work">Metal work</RouterLink>
        <RouterLink to="/art">Art</RouterLink>
        <RouterLink to="/interior-design">Interior design</RouterLink>
        <RouterLink to="/painting">Painting</RouterLink>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.wrapper {
  position: relative;
  height: 20h;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: 0.4s;
  padding: 1rem 5rem 1.5rem 5rem;
  border-bottom: 1px solid grey;
  background-color: white;
}
nav a {
  text-decoration: none;
}
.heading {
  color: black;
  font-size: 20px;
  font-weight: 700;
}
nav > div {
  display: flex;
  align-items: center;
}
.loginBtn {
  padding: 10px 20px;
  border: 2px solid black;
  border-radius: 28px;
  font-weight: bold;
}
.registerBtn {
  padding: 10px 20px;
  color: white;
  background-color: #f4605b;
  border: 2px solid #f4605b;
  border-radius: 28px;
  margin-left: 12px;
  font-weight: bold;
}
.logOutBtn{
  padding: 10px 20px;
  color: white;
  background-color: #f4605b;
  border: 2px solid #f4605b;
  border-radius: 28px;
  margin-left: 12px;
  font-weight: bold;
  cursor: pointer
}
.categories {
  position: absolute;
  padding: 1rem;
  background: white;
  position: fixed;
  top: 5rem;
  right: 0;
  left: 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.categories a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
.categories a:hover {
  text-decoration-line: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: #f4605b;
}
@media only screen and (max-width: 768px) {
  nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-right: 0;
    padding-left: 0;
  }
  .loginBtn {
    display: none;
  }
}
</style>

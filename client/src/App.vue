<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";
import LogOutIcon from "./assets/icons/LogOut.vue";
// import SettingsIcon from "./assets/icons/SettingsIcon.vue";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";
const authStore = useAuthStore();
const router = useRouter();

const avatar = createAvatar(pixelArt, {
  seed: Math.random("John"),
  size: 64,
  radius: 50,
  backgroundColor: ["dc143c"],
  glasses: ["variant01"],
}).toDataUriSync();

const handleLogout = () => {
  authStore.logOut();
  router.push("/");
};
</script>

<template>
  <div class="main-layout">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink class="heading" to="/">tradeHive</RouterLink>
          <div v-if="authStore.user === null">
            <RouterLink class="loginBtn" to="/login">Log in</RouterLink>
            <RouterLink class="registerBtn" to="/register"
              >Create account</RouterLink
            >
          </div>
          <div class="logoutProfile" v-else>
            <a @click="handleLogout" class="logOutBtn">Log out <LogOutIcon/></a>
            <RouterLink to="/account-settings"><img :src="avatar" alt="" :key="freelancer"/></RouterLink>
          </div>
        </nav>
        <div v-if="authStore.user" class="categories">
          <RouterLink class="homePage" to="/home-page">Home</RouterLink>
          <RouterLink to="/wood-work">Wood work</RouterLink>
          <RouterLink to="/metal-work">Metal work</RouterLink>
          <RouterLink to="/art">Art</RouterLink>
          <RouterLink to="/interior-design">Interior design</RouterLink>
          <RouterLink to="/painting">Painting</RouterLink>
        </div>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
/* .main-layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
} */
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
  border: 2px solid #dc143c;
  border-radius: 28px;
  font-weight: bold;
  border: nonw;
  /* border: none; */
  outline: none;
  color: black;
}
.loginBtn:hover{
    transform: scale(0.98);
  }
.registerBtn {
  padding: 10px 20px;
  color: white;
  background-color: crimson;
  border: 2px solid crimson;
  border-radius: 28px;
  margin-left: 12px;
  font-weight: bold;
}
.registerBtn:hover{
    transform: scale(0.98);
  }
.logOutBtn {
  padding: 10px 20px;
  color: white;
  background-color: crimson;
  border: 2px solid crimson;
  border-radius: 28px;
  margin-left: 12px;
  font-weight: bold;
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 5px;
}
.logOutBtn:hover{
    transform: scale(0.98);
  }
.categories {
  position: absolute;
  padding: 1rem;
  position: fixed;
  top: 5rem;
  right: 0;
  left: 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 100;
  background-image: linear-gradient(to bottom, rgb(251, 81, 115), #ffa4a1);

}
/* .categories .homePage {
  color: crimson;
} */
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
.logoutProfile{
  gap:20px;
}
img{
  width: 2.8em;
  margin-top:4px;
}
@media only screen and (max-width: 768px) {
  nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-right: 0;
    padding-left: 0;
    justify-content: space-between;
    margin-right: 10px;
    margin-left: 10px;;
  }
  .loginBtn {
    display: none;
  }
  .logOutBtn{
    padding: 6px 12px;
  }

}
</style>

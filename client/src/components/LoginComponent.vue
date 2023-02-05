<template>
  <div class="form">
    <div class="login-image">
      <img src="../assets/images/Group 2.png" />
      <p>Your search for freelancers is over.</p>
    </div>
    <form id="loginForm" @submit.prevent="handleSubmit">
      <h3>Log in</h3>
      <label for="email">Email address</label><br />
      <input type="email" v-model="email" id="email" name="email" /><br />

      <label for="password">Password</label><br />
      <input
        type="password"
        v-model="password"
        id="password"
        name="password"
      /><br />

      <p class="forgot">Forgot password?</p>

      <button id="signupBtn" type="submit">Log in</button>
      <p class="createAcc">
        Don't have an account?
        <RouterLink to="/register">Create account</RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import Carousel from "./Carousel.vue";
const email = ref("");
const password = ref("");
</script>

<style scoped>
.form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 100vh;
}
.login-image {
  background-color: #f4605b;
  border-radius: 0 4px 4px 0;
}
.login-image img {
  display: flex;
  align-items: center;
  height: 150px;
  padding-top: 17rem;
  margin: auto;
}
.login-image p {
  color: white;
  text-align: center;
}

#loginForm {
  width: 300px;
  margin: 40px auto;
  padding: 14px 28px;
  text-align: left;
  /* border: 1px solid #919191; */
  border-radius: 8px;
  background: #fff;
  margin-top: 11rem;
}

form > h3 {
  text-align: center;
  font-size: 22px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

label {
  display: block;
  font-size: 16px;
}
input[type="password"],
input[type="email"] {
  width: 100%;
  margin-bottom: 8px;
  box-sizing: border-box;
  border: none;
  outline: none;
  border-bottom: 2px solid #919191;
  line-height: 1.5em;
}
button[type="submit"] {
  width: 100%;
  background-color: #f4605b;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  font-size: 17px;
}
.forgot {
  color: rgb(66, 66, 228);
  text-align: end;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
  margin: 0;
  margin-bottom: 6px;
}
button[type="submit"]:hover {
  background-color: rgb(236, 55, 91);
  transform: scale(0.98);
}
.createAcc {
  text-align: center;
}
.createAcc a {
  color: rgb(236, 55, 91);
  text-decoration: none;
}
@media only screen and (max-width: 768px) {
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
  }
  .login-image{
    display: none;
  }
  #loginForm{
    margin-top: 5rem;
  }
}
@media only screen and (max-height: 1250px){
    .form{
        height:100%;
    }
}
</style>

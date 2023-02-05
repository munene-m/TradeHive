<template>
    <div class="form">
        <div class="carousel">
            <h1>SVG goes here</h1>
        </div>
      <form id="signupForm" @submit.prevent="handleSubmit">
              <h3>CREATE ACCOUNT</h3>
              <label for="firstName">First name</label><br>
              <input type="text" v-model="firstname" id="firstName" name="firstName"><br>
  
              <label for="firstname">Last name</label><br>
              <input type="text" v-model="lastname" id="lastname" name="lastname"><br>
  
              <label for="email">Email address</label><br>
              <input type="email" v-model="email" id="email" name="email"><br>
  
              <label for="password">Password</label><br>
              <input type="password" v-model="password" id="password" name="password"><br>

              <p class="forgot">Forgot password?</p>
  
              <button id="signupBtn" type="submit">Submit</button>
          </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const firstname = ref("")
  const lastname = ref("")
  const email = ref("")
  const password = ref("")
  </script>
  
  <style scoped>
  .form{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    min-height:100vh;
  }
  .carousel{
    background-color: rgb(226, 53, 88);
    border-radius: 0 4px 4px 0;
  }
  #signupForm {
      width: 300px;
      margin: 40px auto;
      padding: 14px 28px;
      text-align: left;
      /* border: 1px solid #919191; */
      border-radius: 8px;
      background: #fff;
  }
  
  form>h3 {
      text-align: center;
      font-size: 22px;
      text-transform: uppercase;
      letter-spacing: 2px;
  }
  
  label {
      display: block;
      font-size: 16px;
  }
  
  input[type="text"],
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
  .forgot{
    color:rgb(66, 66, 228);
    text-align: end;
    text-decoration: underline;
    font-size: 14px;
    cursor: pointer;
    margin:0;
    margin-bottom:6px;
  }
  button[type="submit"] {
      width: 100%;
      background-color: rgb(236, 55, 91);
      color: white;
      padding: 14px 20px;
      margin: 8px 0;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: .3s ease-in-out;
      font-size: 17px;
  }
  
  button[type="submit"]:hover {
      background-color: crimson;
      transform: scale(0.98);
  }
  </style>
  
<script setup>
import { reactive, computed, ref, watchEffect } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs, minLength, email, helpers } from '@vuelidate/validators'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()
const formClass = ref('form')
const formBeforeAuthClass = ref('formBeforeAuth')
const role = ref("")

watchEffect(() => {
  if(authStore.user){
    router.push("/account-settings")
  }
})

const formData = reactive({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
})
const rules = computed(() => {
    return{
        firstname: { required: helpers.withMessage("First name is required", required) },
        lastname: { required: helpers.withMessage("Last name is required", required) },
        email: { required: helpers.withMessage("Email is required", required), email },
        password: { required: helpers.withMessage("Password is required", required), minLength:minLength(6)},
        confirmPassword: { required: helpers.withMessage("The entered passwords do not match", required), sameAs: sameAs(formData.password) },
        role: { required: helpers.withMessage("Category is required", required) }
    }
})
const v$ = useVuelidate(rules, formData)
const handleSubmit = async () =>{
    const result = await v$.value.$validate()
    if(result){
        authStore.register(formData.firstname, formData.lastname, formData.email, formData.password, formData.category, formData.role)
        authStore.setRoles(role.value)
        //router.push("/home-page")
    }
    setTimeout(() => {
        formData.firstname = "",
        formData.lastname = "",
        formData.email = "",
        formData.password  = "",
        formData.role = ""
        formData.confirmPassword = ""
    }, 1000)
}
</script>
<template>
  <div :class="[authStore.user ? formClass : '', formBeforeAuthClass]">
    <div class="login-image">
      <img src="../assets/images/Group 7.png" />
      <p>Sign up to get access to affordable labour or even sell your services!</p>
    </div>
    <form id="signupForm" @submit.prevent="handleSubmit">
      <h3>CREATE ACCOUNT</h3>
      <label for="firstName">First name</label><br />
      <input
        type="text"
        v-model="formData.firstname"
        id="firstName"
        name="firstName"
      />
      <p class="errorMsg" v-if="v$.firstname.$error">{{ v$.firstname.$errors[0].$message }}</p>
      <br />

      <label for="firstname">Last name</label><br />
      <input
        type="text"
        v-model="formData.lastname"
        id="lastname"
        name="lastname"
      />
      <p class="errorMsg" v-if="v$.lastname.$error">{{ v$.lastname.$errors[0].$message }}</p>
      <br />

      <label for="email">Email address</label><br />
      <input type="email" v-model="formData.email" id="email" name="email" />
      <p class="errorMsg" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
      <br />

      <label for="password">Password</label><br />
      <input
        type="password"
        v-model="formData.password"
        id="password"
        name="password"
      />
      <p class="errorMsg" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
      <br />
      <label for="confirmPassword">Confirm Password</label><br />
      <input
        type="password"
        v-model="formData.confirmPassword"
        id="confirmPassword"
        name="confirmPassword"
      />
      <p class="errorMsg" v-if="v$.confirmPassword.$error">{{ v$.confirmPassword.$errors[0].$message }}</p>
      <br />

      <div class="radioBtns">
        <input type="radio" name="role" value="Freelancer" id="freelancer" v-model="formData.role" required />
        <label id="labelRadio1" for="freelancer">Freelancer</label>

        <input type="radio" name="role" value="Client" id="client" v-model="formData.role"/>
        <label id="labelRadio2" for="client">Client</label>
      </div>

      <button id="signupBtn" type="submit">Create account</button>
      <p class="login">
        Have an account? <RouterLink to="/login">Log in</RouterLink>
      </p>
    </form>
  </div>
</template>


<style scoped>
.form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 100vh;
  padding-top:8rem;
}
.formBeforeAuth{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 100vh;
  padding-top: 5rem;
}
.login-image {
  background-color: #f4605b;
  border-radius: 0 4px 4px 0;
}
.login-image img {
  display: flex;
  align-items: center;
  height: 150px;
  padding-top: 180px;
  margin: auto;
}
.login-image p {
  color: white;
  text-align: center;
  margin: auto;
  width:18rem;
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

.radioBtns {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 1rem;
}
#labelRadio1, #labelRadio2{
  display: inline;
  cursor: pointer;
}
#labelRadio1{
  margin-right: 12px;
}
#freelancer, #client{
  accent-color: crimson;
  cursor: pointer;
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
  font-family: inherit;
    font-weight: 800;
    font-size: 14px;
}
.errorMsg{
    color: red;
    font-size: 12px; 
    margin:0;
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

button[type="submit"]:hover {
  background-color: rgb(236, 55, 91);
  transform: scale(0.98);
}
.login {
  text-align: center;
}
.login a {
  color: crimson;
  text-decoration: none;
  font-weight: 600;
}
@media only screen and (max-width: 40em) {
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
min-height: 50vh;
  }
  .login-image{
    display: none;
  }
}
</style>

<script setup>
import { reactive, computed, ref, watchEffect } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email, helpers } from "@vuelidate/validators";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const role = ref("");

watchEffect(() => {
  if (authStore.user !== null) {
    router.push("/");
  }
});

const formClass = ref("form");
const formBeforeAuthClass = ref("formBeforeAuth");
const formData = reactive({
  email: "",
  password: ""
});
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Email is required", required),
      email,
    },
    password: {
      required: helpers.withMessage("Password is required", required),
      minLength: minLength(6),
    }
  };
});
const v$ = useVuelidate(rules, formData);
const handleSubmit = async () => {
  const result = await v$.value.$validate();
  if (result) {
    authStore.login(formData.email, formData.password);
  }
  setTimeout(() => {
    (formData.email = ""), (formData.password = "")
  }, 1000);
};
</script>

<template>
  <div :class="[authStore.user ? formClass : '', formBeforeAuthClass]">
    <div class="login-image">
      <img src="../assets/images/Group 2.png" />
      <p>Your search for freelancers is over.</p>
    </div>
    <form id="loginForm" @submit.prevent="handleSubmit">
      <h3>Log in</h3>
      <label for="email">Email address</label><br />
      <input type="email" v-model="formData.email" id="email" name="email" />
      <p class="errorMsg" v-if="v$.email.$error">
        {{ v$.email.$errors[0].$message }}
      </p>
      <br />

      <label for="password">Password</label><br />
      <input
        type="password"
        v-model="formData.password"
        id="password"
        name="password"
      />
      <p class="errorMsg" v-if="v$.password.$error">
        {{ v$.password.$errors[0].$message }}
      </p>
      <br />

      <p class="forgot">Forgot password?</p>

      <button id="signupBtn" type="submit">Log in</button>
      <p class="createAcc">
        Don't have an account?
        <RouterLink to="/register">Create account</RouterLink>
      </p>
    </form>
  </div>
</template>

<style scoped>
.form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  min-height: 100vh;
  padding-top: 8rem;
}
.formBeforeAuth {
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
  padding-top: 15rem;
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
  margin-top: 7rem;
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
  font-family: inherit;
    font-weight: 800;
    font-size: 14px;
}
.errorMsg {
  color: red;
  font-size: 12px;
  margin: 0;
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
  font-weight: 600;
}
button[type="submit"]:hover {
  background-color: rgb(236, 55, 91);
  transform: scale(0.98);
}
.createAcc {
  text-align: center;
}
.createAcc a {
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
  .login-image {
    display: none;
  }
  #loginForm {
    margin-top: 5rem;
  }
}
@media only screen and (max-height: 1250px) {
  .form {
    height: 100%;
  }
}
</style>

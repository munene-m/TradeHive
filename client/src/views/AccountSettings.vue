<script setup>
import { onMounted, ref, watchEffect, reactive } from "vue";
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();
const getUser = authStore.getUser();
const checkedCategories = ref([]);
onMounted(() => {
  getUser;
});
</script>

<template>
  <div class="settings">
    <h2>Complete setting up your account</h2>
    <h1>{{ authStore.firstname.charAt(0).toUpperCase() }}</h1>
    <h3>{{ authStore.firstname }}</h3>
  </div>
  <div id="clientDetails" v-if="(authStore.role = 'Client')">
    <form id="updateDetails" @submit.prevent="handleSubmit">
      <div class="names">
        <div>
          <label for="firstName">First name</label><br />
          <input
            type="text"
            :value="authStore.firstname"
            disabled
            id="firstName"
            name="firstName"
          />
        </div>
        <div>
          <label for="lastname">Last name</label><br />
          <input
            type="text"
            :value="authStore.lastname"
            disabled
            id="firstName"
            name="firstName"
          />
        </div>
      </div>
      <label for="email">Email</label><br />
      <input
        type="email"
        :value="authStore.email"
        disabled
        id="firstName"
        name="firstName"
      />
      <span>Categories you want to hire from:{{ checkedCategories }}</span><br />
      <div class="checkboxes">
        <div>
          <label class="checkboxLabel" for="woodWork">Wood work</label>
          <input
            type="checkbox"
            id="woodWork"
            value="Wood work"
            v-model="checkedCategories"
          />
        </div>
        <div>
          <label class="checkboxLabel" for="metalWork">Metal work</label>
          <input
            type="checkbox"
            id="metalWork"
            value="Metal work"
            v-model="checkedCategories"
          />
        </div>
        <div>
          <label class="checkboxLabel" for="painting">Painting</label>
          <input
            type="checkbox"
            id="painting"
            value="Painting"
            v-model="checkedCategories"
          />
        </div>
        <div>
          <label class="checkboxLabel" for="interiorDesign"
            >Interior design</label
          >
          <input
            type="checkbox"
            id="interiorDesign"
            value="Interior design"
            v-model="checkedCategories"
          />
        </div>
        <div>
          <label class="checkboxLabel" for="art">Art</label>
          <input
            type="checkbox"
            id="art"
            value="Art"
            v-model="checkedCategories"
          />
        </div>
      </div>
      <label for="phone">Contact information</label><br />
      <input
        type="tel"
        v-model="phoneNo"
        id="phone"
        name="phone"
        placeholder="e.g 0712345678"
      />
      <button>Update</button>
    </form>
  </div>
  <div v-else-if="(authStore.role = 'Freelancer')">
    <form id="updateDetails" @submit.prevent="handleSubmit">
      <label for="firstName">First name</label><br />
      <input type="text" v-model="firstName" id="firstName" name="firstName" />
    </form>
  </div>
</template>

<style scoped>
.settings {
  position: relative;
  top: 8rem;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.settings h1 {
  padding: 10px;
  border: 1px solid #ccc;
  height: 2em;
  width: 2em;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #888585;
  margin: 0;
}
settings h3 {
  margin: 0;
  text-transform: capitalize;
}
#clientDetails {
  position: relative;
  top: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
form {
  width: 330px;
  padding: 14px 28px;
  text-align: left;
  border-radius: 8px;
  background: #fff;
}
label {
  display: block;
  font-size: 16px;
}
.names {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
input[type="text"],
input[type="password"],
input[type="email"],
input[type="tel"] {
  width: 100%;
  box-sizing: border-box;
  border: none;
  outline: none;
  /* border-bottom: 2px solid #919191; */
  line-height: 1.5em;
  background: #ededed;
    line-height: 1.5rem;
    border-radius: 4px;
    padding: 6px;
}

.checkboxes {
  display: grid;
  justify-items: start;
  grid-template-columns: repeat(3, 1fr);
  background: #eee;
    border-radius: 6px;
    padding: 10px;
}
button{
    border: none;
    outline: none;
    color: white;
    background: crimson;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    margin-top: 1.5rem;
}
</style>

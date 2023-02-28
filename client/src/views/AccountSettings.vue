<script setup>
import { onMounted, ref, watchEffect, reactive, computed } from "vue";
import { useAuthStore } from "../stores/auth";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import Popup from "../components/Popup.vue";
const authStore = useAuthStore();
const getUser = authStore.getUser();
const showPopUp = ref(false);

const formData = reactive({
  contact: "",
  checkedCategories: [],
});
const rules = computed(() => {
  return {
    contact: {
      required: helpers.withMessage("Contact is required", required),
      minLength: minLength(10),
    },
  };
});
const v$ = useVuelidate(rules, formData);
const handleClientUpdate = async () => {
  const result = await v$.value.$validate();
  if (result) {
    await authStore.updateClient(formData.checkedCategories, formData.contact);
  }
  setTimeout(() => {
    formData.contact = "";
  }, 1000);
};
const freelanceFormData = reactive({
  location: "",
  contact: "",
  workingHours: "",
  rates: "",
  checkedCategories: [],
});

const freelanceRules = computed(() => {
  return {
    location: {
      required: helpers.withMessage("Location is required", required),
    },
    workingHours: {
      required: helpers.withMessage("Working hours are required", required),
    },
    rates: {
      required: helpers.withMessage("Rates are required", required),
      required,
    },
    contact: {
      required: helpers.withMessage("Contact is required", required),
      minLength: minLength(10),
    },
  };
});
const v2$ = useVuelidate(freelanceRules, freelanceFormData);
const handleFreelancerUpdate = async () => {
  const result = await v2$.value.$validate();
  if (result) {
    authStore.updateFreelancer(
      freelanceFormData.location,
      freelanceFormData.workingHours,
      freelanceFormData.rates,
      freelanceFormData.checkedCategories,
      freelanceFormData.contact
    );
    showPopUp.value = true;
  }
  setTimeout(() => {
    (freelanceFormData.location = ""),
      (freelanceFormData.rates = ""),
      (freelanceFormData.workingHours = ""),
      (freelanceFormData.contact = ""),
      freelanceFormData.checkedCategories;
  }, 1000);
};

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
  <div id="clientDetails" v-if="authStore.role === 'Client'">
    <form id="updateDetails" @submit.prevent="handleClientUpdate">
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
      <span>Categories you want to hire from: </span><br />
      <div class="checkboxes">
        <div>
          <label class="checkboxLabel" for="woodWork">Wood work</label>
          <input
            type="checkbox"
            id="woodWork"
            value="Wood work"
            v-model="formData.checkedCategories"
          />
        </div>
        <div>
          <label class="checkboxLabel" for="metalWork">Metal work</label>
          <input
            type="checkbox"
            id="metalWork"
            value="Metal work"
            v-model="formData.checkedCategories"
          />
        </div>
        <div>
          <label class="checkboxLabel" for="painting">Painting</label>
          <input
            type="checkbox"
            id="painting"
            value="Painting"
            v-model="formData.checkedCategories"
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
            v-model="formData.checkedCategories"
          />
        </div>
        <div>
          <label class="checkboxLabel" for="art">Art</label>
          <input
            type="checkbox"
            id="art"
            value="Art"
            v-model="formData.checkedCategories"
          />
        </div>
      </div>
      <label for="phone">Contact information</label><br />
      <input
        type="tel"
        v-model="formData.contact"
        id="phone"
        name="phone"
        placeholder="e.g 0712345678"
        autocomplete="off"
      />
      <button type="submit">Update</button>
    </form>
  </div>
  <div id="freelancerDetails" v-else>
    <form id="updateDetails" @submit.prevent="handleFreelancerUpdate">
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
      <span>Categories you are interested in: </span><br />
      <div class="checkboxes">
        <div>
          <label class="checkboxLabel" for="woodWork">Wood work</label>
          <input
            type="checkbox"
            id="woodWork"
            value="Wood work"
            v-model="freelanceFormData.checkedCategories"
          />
        </div>
        <div>
          <label class="checkboxLabel" for="metalWork">Metal work</label>
          <input
            type="checkbox"
            id="metalWork"
            value="Metal work"
            v-model="freelanceFormData.checkedCategories"
          />
        </div>
        <div>
          <label class="checkboxLabel" for="painting">Painting</label>
          <input
            type="checkbox"
            id="painting"
            value="Painting"
            v-model="freelanceFormData.checkedCategories"
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
            v-model="freelanceFormData.checkedCategories"
          />
        </div>
        <div>
          <label class="checkboxLabel" for="art">Art</label>
          <input
            type="checkbox"
            id="art"
            value="Art"
            v-model="freelanceFormData.checkedCategories"
          />
        </div>
      </div>
      <label for="location">Location</label><br />
      <input
        type="text"
        v-model="freelanceFormData.location"
        placeholder="e.g Ruiru, Kiambu"
        id="location"
        name="location"
        autocomplete="off"
      />
      <!-- <p class="errorMsg" v-if="v$.location.$error">{{ v$.location.$errors[0].$message }}</p> -->
      <label for="workingHrs">Working Hours</label><br />
      <input
        type="text"
        v-model="freelanceFormData.workingHours"
        placeholder="e.g 8am - 5pm"
        id="workingHrs"
        name="workingHrs"
        autocomplete="off"
      />
      <!-- <p class="errorMsg" v-if="v$.workingHours.$error">{{ v$.workingHours.$errors[0].$message }}</p> -->
      <label for="rates">Rates</label><br />
      <input
        type="text"
        v-model="freelanceFormData.rates"
        placeholder="e.g Ksh 400/hr"
        id="rates"
        name="rates"
        autocomplete="off"
      />
      <!-- <p class="errorMsg" v-if="v$.rates.$error">{{ v$.rates.$errors[0].$message }}</p> -->
      <label for="phone">Contact information</label><br />
      <input
        type="tel"
        v-model="freelanceFormData.contact"
        id="phone"
        name="phone"
        placeholder="e.g 0712345678"
        autocomplete="off"
      />
      <!-- <p class="errorMsg" v-if="v$.contact.$error">{{ v$.contact.$errors[0].$message }}</p> -->

      <button type="submit">Update</button>
    </form>
    <Popup v-if="showPopUp" message="Account details updated successfully!" />
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
  border: 2px solid rgb(0, 166, 255);
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
  /* top: 8rem; */
  display: flex;
  justify-content: center;
  align-items: center;
}
#freelancerDetails {
  display: flex;
  justify-content: center;
  align-items: center;
}
form {
  position: relative;
  top: 8rem;
  width: 330px;
  padding: 14px 28px;
  text-align: left;
  border-radius: 8px;
  background: #fff;
}
label {
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
  border: 2px solid #bbb;
  line-height: 1.5em;
  background: #ededed;
  line-height: 1.5rem;
  border-radius: 4px;
  padding: 6px;
  margin-bottom: 18px;
  transition: 0.4s;
}
input:focus {
  background: #fff;
  border: 2px solid rgb(0, 166, 255);
}
.checkboxes {
  display: grid;
  justify-items: start;
  grid-template-columns: repeat(3, 1fr);
  background: #eee;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 18px;
  border: 2px solid #bbb;
  gap: 2px;
}
button {
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

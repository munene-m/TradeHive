<script setup>
import { computed, reactive } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useServiceStore } from "../stores/services";
defineProps({
  show: Boolean,
});
const serviceStore = useServiceStore()
const formData = reactive({
    name: "",
    contact: "",
    jobTitle: "",
    jobDesc: "",
    budget: "",
    selectedCategory: "",
    selectedCurrency: ""
})
const rules = computed(() => {
    return{
        name: { required: helpers.withMessage("Name is required", required) },
        contact: { required: helpers.withMessage("Contact is required", required) },
        jobTitle: { required: helpers.withMessage("Job title is required", required) },
        jobDesc: { required: helpers.withMessage("Description is required", required) },
        budget: { required: helpers.withMessage("Budget is required", required) },
        selectedCategory: { required: helpers.withMessage("Please select a category", required) },
        selectedCurrency: { required: helpers.withMessage("Please select a currency", required) }
    }
})
const v$ = useVuelidate(rules, formData)
const handleSubmit = async () => {
    const result = await v$.value.$validate()
    if(result){
    serviceStore.createJobs(formData.jobTitle, formData.jobDesc, formData.budget, formData.selectedCurrency, formData.selectedCategory, formData.name, formData.contact)
    $emit('submit');
    }
    setTimeout(() => {
        formData.name = "",
        formData.contact = "",
        formData.jobTitle = ""
        formData.jobDesc = ""
        formData.budget = ""
        formData.selectedCategory = ""
        formData.selectedCurrency = ""
    }, 1000)
}
</script>

<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-container">
      <form id="createJobForm" @submit.prevent="handleSubmit" >
        <div class="formHeader">
          <h3>Post a job</h3>
          <p>Describe your needs then get contacted by freelancers</p>
        </div>
        <div class="clientInfo">
          <div>
            <label for="name">Your name</label><br />
            <input type="text" id="name" v-model="formData.name" name="name" />
            <p class="errorMsg" v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</p>
          </div>
          <div>
            <label for="contact">Contact information</label><br />
            <input
              type="text"
              id="contact"
              v-model="formData.contact"
              name="contact"
              placeholder="e.g +254 712345678"
            />
            <p class="errorMsg" v-if="v$.contact.$error">{{ v$.contact.$errors[0].$message }}</p>
          </div>
        </div>

        <label for="category"
          >Select a relevant category so freelancers can find your job</label
        ><br />
        <div class="select">
          <select name="category" v-model="formData.selectedCategory" id="category">
            <option value="" disabled>Select one</option>
            <option value="Art">Art</option>
            <option value="Wood work">Wood work</option>
            <option value="Painting">Painting</option>
            <option value="Interior design">Interior design</option>
            <option value="Metal work">Metal work</option>
          </select>
        </div>
        <p class="errorMsg" v-if="v$.selectedCategory.$error">{{ v$.selectedCategory.$errors[0].$message }}</p>

        <label for="title">Job title</label><br />
        <input type="text" v-model="formData.jobTitle" id="title" name="title" />
        <p class="errorMsg" v-if="v$.jobTitle.$error">{{ v$.jobTitle.$errors[0].$message }}</p>
        <br />

        <label for="description">Job description</label><br />
        <textarea
          name="description"
          id="description"
          v-model="formData.jobDesc"
        ></textarea>
      <p class="errorMsg" v-if="v$.jobDesc.$error">{{ v$.jobDesc.$errors[0].$message }}</p>

        <label for="budget">Budget</label><br />
        <input
          type="text"
          id="budget"
          v-model="formData.budget"
          name="budget"
          placeholder="e.g KES 100/hr"
        />
      <p class="errorMsg" v-if="v$.budget.$error">{{ v$.budget.$errors[0].$message }}</p>


        <label for="currency">Currency</label><br />
        <div class="select">
          <select name="currency" v-model="formData.selectedCurrency" id="currency">
            <option value="" disabled>Select one</option>
            <option value="KES">KES</option>
            <option value="USD">USD</option>
          </select>
        </div>
      <p class="errorMsg" v-if="v$.selectedCurrency.$error">{{ v$.selectedCurrency.$errors[0].$message }}</p>

        <button id="createJobBtn" @click="$emit('close')" type="submit">
          Submit
        </button>
      </form>
      <!-- <footer>
        <button >Submit</button>
      </footer> -->
    </div>
  </div>
</template>

<style scoped>
h3 {
  margin: 0;
  font-weight: 800;
  font-size: 2em;
}
.clientInfo {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
}
.clientInfo > div {
  width: 100%;
}
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgb(0, 0, 0, 0.6);
  backdrop-filter: blur(5px); /* Change blur amount as needed */
  -webkit-backdrop-filter: blur(5px); /* For Safari */
  display: grid !important;
  place-items: center;
  z-index: 1000;
}
.modal-container {
  background: #fff;
  padding: 1rem 2rem;
  max-width: 900px;
  border-radius: 15px;
}
h3 {
  margin: 0;
  font-weight: 800;
  font-size: 2em;
}
.clientInfo {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
}
.clientInfo > div {
  width: 100%;
}
input[type="text"],
input[type="password"],
input[type="email"] {
  width: 100%;
  margin-top: 6px;
  margin-bottom: 8px;
  box-sizing: border-box;
  border: none;
  outline: none;
  line-height: 1.5em;
  border: 2px solid #ccc;
  line-height: 2.5;
  background: #eee;
  border-radius: 6px;
  color: black;
  padding: 0 10px;
  font-family: inherit;
  font-weight: 800;
  font-size: 14px;
}
textarea {
  width: 100%;
  margin-top: 6px;
  margin-bottom: 8px;
  box-sizing: border-box;
  border: none;
  outline: none;
  line-height: 1.5em;
  border: 2px solid #ccc;
  background: #eee;
  border-radius: 6px;
  color: black;
  padding: 5px;
  height: 8rem;
  font-family: inherit;
  font-weight: 800;
  font-size: 14px;
}
select {
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  cursor: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  outline: none;
}
/* For removal of the arrow for lower IE versions */
select::-ms-expand {
  display: none;
}
.select {
  width: 44%;
  min-width: 15ch;
  max-width: 30ch;
  border: 1px solid #777;
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1rem;
  cursor: pointer;
  line-height: 1.5;
  background-color: #fff;
  background-image: linear-gradient(to top, #eeeeee, #fff 33%);
  margin-top:10px
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
.errorMsg{
    color: red;
    font-size: 12px; 
    margin:0;
}
@media only screen and (max-height: 1250px) {
  .modal-container {
    margin: 1em;
  }
}
.select{
    font-size: .8rem;
}
</style>

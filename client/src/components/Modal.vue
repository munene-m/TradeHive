<script setup>
import { ref } from 'vue';
defineProps({
  show: Boolean,
});
const name = ref("")
const contact = ref("")
const jobTitle = ref("")
const jobDesc = ref("")
const budget = ref("")
</script>

<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-container">
      <form id="createJobForm" @submit.prevent="handleSubmit">
        <div class="formHeader">
          <h3>Post a job</h3>
          <p>Describe your needs then get contacted by freelancers</p>
        </div>
        <div class="clientInfo">
          <div>
            <label for="name">Your name</label><br />
            <input type="text" id="name" v-model="name" name="name" />
          </div>
          <div>
            <label for="contact">Contact information</label><br />
            <input type="text" id="contact" v-model="contact" name="contact" placeholder="e.g +254 712345678"/>
          </div>
        </div>

        <label for="category"
          >Select relevant category so freelancers can find your job</label
        ><br />
        <div class="select">
            <select name="category" id="category">
          <option value="default" disabled selected>...</option>
          <option value="Art">Art</option>
          <option value="Wood work">Wood work</option>
          <option value="Painting">Painting</option>
          <option value="Interior design">Interior design</option>
          <option value="Metal work">Metal work</option>
        </select>
        </div>
        <p class="errorMsg"></p>
        <br />

        <label for="title">Job title</label><br />
        <input type="text" v-model="jobTitle" id="title" name="title" />
        <p class="errorMsg"></p>
        <br />

        <label for="description">Job description</label><br />
        <textarea
          name="description"
          id="description"
          v-model="jobDesc"
        ></textarea>

        <label for="budget">Budget</label><br />
        <input type="text" id="budget" v-model="budget" name="budget" />

        <label for="currency">Currency</label><br />
        <div class="select">
            <select name="currency" id="currency">
          <option value="default" disabled selected>...</option>
          <option value="KES">KES</option>
          <option value="USD">USD</option>
        </select>
        </div>

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
.clientInfo > div{
    width:100%;
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
  width: 80vw;
  max-width: 800px;
  border-radius: 5px;
}
input[type="text"],
input[type="password"],
input[type="email"] {
    width: 100%;
    margin-top:6px;
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
textarea{
    width: 100%;
    margin-top:6px;
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
    height: 8rem;
    font-family: inherit;
    font-weight: 800;
    font-size: 14px;
}
select{
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
select::-ms-expand{
    display: none;
}
.select{
    width:100%;
    min-width: 15ch;
    max-width:30ch;
    border:1px solid #777;
    border-radius:0.25em;
    padding: 0.25em 0.5em;
    font-size: 1rem;
    cursor: pointer;
    line-height: 1.1;
    background-color: #fff;
    background-image: linear-gradient(to top, #eeeeee, #fff 33%);
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
</style>

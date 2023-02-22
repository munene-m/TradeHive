<script setup>
defineProps({
  show: Boolean,
});
</script>

<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-container">
      <form id="createJobForm" @submit.prevent="handleSubmit">
        <h3>Post a job</h3>
        <p>Describe your needs then get contacted by freelancers</p>
        <div class="clientInfo">
          <div>
            <label for="name">Your name</label><br />
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label for="contact">Contact information</label><br />
            <input type="text" id="contact" name="contact" />
          </div>
        </div>

        <label for="category"
          >Select relevant category so freelancers can find your job</label
        ><br />
        <select name="category" id="category">
          <option value="default" selected>Choose</option>
          <option value="Art">Art</option>
          <option value="Wood work">Wood work</option>
          <option value="Painting">Painting</option>
          <option value="Interior design">Interior design</option>
          <option value="Metal work">Metal work</option>
        </select>
        <p class="errorMsg"></p>
        <br />

        <label for="title">Job title</label><br />
        <input type="text" id="title" name="title" />
        <p class="errorMsg"></p>
        <br />

        <label for="description">Job description</label><br />
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
        ></textarea>

        <label for="budget">Budget</label><br />
        <input type="text" id="budget" name="budget" />

        <label for="currency">Currency</label><br />
        <input type="text" id="currency" name="currency" />

        <button id="createJobBtn" @click="$emit('close')" type="submit">
          Log in
        </button>
      </form>
      <!-- <footer>
        <button >Submit</button>
      </footer> -->
    </div>
  </div>
</template>

<style scoped>
h3{
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
  padding: 1rem;
  width: 80vw;
  max-width: 800px;
  border-radius: 5px;
}
</style>

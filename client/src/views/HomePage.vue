<script setup>
import { onMounted, ref, watchEffect, reactive, computed,onBeforeMount } from "vue";
import { useAuthStore } from "../stores/auth";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import gsap from 'gsap'
import Modal from "../components/Modal.vue";
import { useServiceStore } from "../stores/services";

const headerClass = ref("header");
const headerIfFreelancer = ref("headerIfFreelancer");
const router = useRouter();
const authStore = useAuthStore();
const getUser = authStore.getUser();
const jobs = authStore.jobsInCategory();
const freelancers = authStore.freelancersInCatgory();

//this computed property first filters out any empty arrays in authStore.freelancers. Then it uses the map() method to loop through each non-empty
//array and create a new filtered array that only contains unique items. It uses the Map object to keep track of which items have already been 
//added to the new array. If the item is not in the Map, it is added to the Map and added to the new array. Finally the method filters out any
// resulting empty arrays 
const nonEmptyFreelancers = computed(() => {
  const uniqueItems = new Map();
  return authStore.freelancers
    .filter((freelancer) => freelancer.length > 0)
    .map((freelancer) =>
      freelancer.filter((item) => {
        if (!uniqueItems.has(item._id)) {
          uniqueItems.set(item._id, true);
          return true;
        }
        return false;
        
      })
      
    )
    .filter((freelancer) => freelancer.length > 0);
});

const nonEmptyJobs = computed(() => {
  return authStore.jobs.filter((job) => job.length > 0);
});

let showModal = ref(false);
function jobForm() {
  showModal.value = true;
}


onMounted(() => {
  getUser;
  jobs;
  freelancers;
  gsap.fromTo(".headerInfo", {
    opacity:0,
    y: "-100%"
    // duration:1.5
  },{
    y:0,
    opacity:1,
    // duration:1.5,
    ease:"power1.out"
  })
  gsap.fromTo(".container", {
    opacity:0,
    x: "-100%"
    // duration:1.5
  },{
    x:0,
    opacity:1,
    duration:1.5,
    ease:"power1.out"
  })
  
});


const serviceStore = useServiceStore();
const formData = reactive({
  name: "",
  contact: "",
  jobTitle: "",
  jobDesc: "",
  budget: "",
  selectedCategory: ""
});
const rules = computed(() => {
  return {
    name: { required: helpers.withMessage("Name is required", required) },
    contact: { required: helpers.withMessage("Contact is required", required) },
    jobTitle: {
      required: helpers.withMessage("Job title is required", required),
    },
    jobDesc: {
      required: helpers.withMessage("Description is required", required),
    },
    budget: { required: helpers.withMessage("Budget is required", required) },
    selectedCategory: {
      required: helpers.withMessage("Please select a category", required),
    }
  };
});
const v$ = useVuelidate(rules, formData);
const handleSubmit = async () => {
  const result = await v$.value.$validate();
  if (result) {
    serviceStore.createJobs(
      formData.jobTitle,
      formData.jobDesc,
      formData.budget,
      formData.selectedCategory,
      formData.name,
      formData.contact
    );
    showModal.value = false;
  }
  setTimeout(() => {
    (formData.name = ""), (formData.contact = ""), (formData.jobTitle = "");
    formData.jobDesc = "";
    formData.budget = "";
    formData.selectedCategory = "";
  }, 1000);
};
const handleModal = async () => {
  const response = await serviceStore.createJobs();
  console.log(response);
  showModal.value = false;
};
</script>

<template>
  <div
    :class="[authStore.role === 'Client' ? headerClass : headerIfFreelancer]"
  >
    <div class="headerInfo">
      <h1>Welcome, {{ authStore.firstname }}</h1>
      <img src="../assets/images/Group 2.png" alt="" />
    </div>
    <div class="createJob" v-if="authStore.role === 'Client'">
      <p>Click here to create a job now:</p>
      <button @click="jobForm" class="postjobBtn">Post job</button>
      <Modal :show="showModal" @close="handleModal">
        <template #form>
          <form id="createJobForm" @submit.prevent="handleSubmit">
            <div class="formHeader">
              <h3>Post a job</h3>
              <p>Describe your needs then get contacted by freelancers</p>
            </div>
            <div class="clientInfo">
              <div>
                <label for="name">Your name</label><br />
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  name="name"
                />
                <p class="errorMsg" v-if="v$.name.$error">
                  {{ v$.name.$errors[0].$message }}
                </p>
              </div>
              <div>
                <label for="contact">Contact</label><br />
                <input
                  type="text"
                  id="contact"
                  v-model="formData.contact"
                  name="contact"
                  placeholder="e.g +254 712345678"
                />
                <p class="errorMsg" v-if="v$.contact.$error">
                  {{ v$.contact.$errors[0].$message }}
                </p>
              </div>
            </div>

            <label for="category"
              >Select a relevant category so freelancers can find your
              job</label
            ><br />
            <div class="select">
              <select
                name="category"
                v-model="formData.selectedCategory"
                id="category"
              >
                <option value="" disabled>Select one</option>
                <option value="Art">Art</option>
                <option value="Wood work">Wood work</option>
                <option value="Painting">Painting</option>
                <option value="Interior design">Interior design</option>
                <option value="Metal work">Metal work</option>
              </select>
            </div>
            <p class="errorMsg" v-if="v$.selectedCategory.$error">
              {{ v$.selectedCategory.$errors[0].$message }}
            </p>

            <label for="title">Job title</label><br />
            <input
              type="text"
              v-model="formData.jobTitle"
              id="title"
              name="title"
            />
            <p class="errorMsg" v-if="v$.jobTitle.$error">
              {{ v$.jobTitle.$errors[0].$message }}
            </p>
            <br />

            <label for="description">Job description</label><br />
            <textarea
              name="description"
              id="description"
              v-model="formData.jobDesc"
            ></textarea>
            <p class="errorMsg" v-if="v$.jobDesc.$error">
              {{ v$.jobDesc.$errors[0].$message }}
            </p>

            <label for="budget">Budget</label><br />
            <input
              type="text"
              id="budget"
              v-model="formData.budget"
              name="budget"
              placeholder="e.g KES 100/hr"
            />
            <p class="errorMsg" v-if="v$.budget.$error">
              {{ v$.budget.$errors[0].$message }}
            </p>

            <!-- <label for="currency">Currency</label><br />
            <div class="select">
              <select
                name="currency"
                v-model="formData.selectedCurrency"
                id="currency"
              >
                <option value="" disabled>Select one</option>
                <option value="KES">KES</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <p class="errorMsg" v-if="v$.selectedCurrency.$error">
              {{ v$.selectedCurrency.$errors[0].$message }}
            </p> -->

            <button id="createJobBtn" type="submit">Submit</button>
          </form>
        </template>
      </Modal>
    </div>
  </div>
  <div class="container">
    <div class="recommendations" v-if="authStore.role === 'Freelancer'">
      <h2 class="RecoTitle">Recommended jobs for you</h2>
      <div v-if="nonEmptyJobs !== null">
        <div id="service" v-for="(jobList, index) in nonEmptyJobs" :key="index">
          <div v-for="job in jobList" :key="job._id">
            <h2>Job title - {{ job.name }}</h2>
            <p>Job description - {{ job.description }}</p>
            <p>Duration - {{ job.duration }}</p>
            <p>Payment - {{ job.price }}</p>
            <button
              @click="router.push({ path: `/home-page/${job._id}` })"
              class="showDetails"
            >
              Show details
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="freelancerPage" v-else-if="authStore.role === 'Client'">
      <h2 class="RecoTitle">Recommended freelancers for you</h2>
      <div class="freelancerGrid" v-if="nonEmptyFreelancers !== null">
        <div
          class="gridItem"
          v-for="(freelancerList, index) in nonEmptyFreelancers"
          :key="index"
        >
          <div id="freelancer" v-for="freelancer in freelancerList" :key="freelancer._id">
            
            <h2>{{ freelancer.firstname }} {{ freelancer.lastname }}</h2>
            <p>Location: {{ freelancer.location }}</p>
            <p>Working hours - {{ freelancer.workingHours }}</p>
            <button
              @click="
                router.push({ path: `/home-page/freelancer/${freelancer._id}` })
              "
              class="showDetails"
            >
              Show details
            </button>
            <hr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-right: 6rem;
  margin-left: 6rem;
}
.headerIfFreelancer {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 15px;
  margin-right: 6rem;
  margin-left: 6rem;
}
.headerIfFreelancer img {
  width: 15%;
}
.headerInfo {
  position: relative;
  top: 10rem;
  border-radius: 12px;
  border: 1px solid crimson;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #ffb8c5;
}
.container {
  margin-left: 6rem;
  
}
.header img {
  width: 15%;
}
.icon {
  position: absolute;
  top: 25px;
  left: 1rem;
  width: 14px;
}

.recommendations {
  position: relative;
  top: 10rem;
  padding-bottom: 1em ;
}
#service {
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 65%;
  padding: 10px 20px;
  margin-bottom: 10px;
}
#freelancerPage {
  position: relative;
  top: 10rem;
}
.RecoTitle {
  margin-left: 4rem;
}
.freelancerGrid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  margin-right: 4rem;
  margin-left: 4rem;
}
.gridItem{
  display: contents;
}
#freelancer {
  border: 2px solid #707070;
  border-radius: 8px;
  width: 60%;
  padding: 10px 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.showDetails {
  padding: 8px 16px;
  color: white;
  background-color: crimson;
  border: 2px solid crimson;
  border-radius: 10px;
  font-weight: bold;
  display: flex;
  cursor: pointer;
  align-items: center;
}
.createJob {
  position: relative;
  top: 10rem;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65%;
  height: 5.5rem;
  border-radius: 10px;
  border: 1px solid crimson;
  background: #ffb8c5;
}
.createJob > p,
button {
  margin: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.postjobBtn {
  padding: 8px 16px;
  color: white;
  background-color: crimson;
  border: 2px solid crimson;
  border-radius: 28px;
  font-weight: bold;
  display: flex;
  cursor: pointer;
  align-items: center;
}
.postjobBtn:hover {
  transform: scale(0.98);
}
h3 {
  margin: 0;
  font-weight: 800;
  font-size: 2em;
}
/* .clientInfo {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 5px;
} */
.clientInfo > div {
  width: 100%;
}

/* Modal styles */
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgb(0, 0, 0, 0.7);
  backdrop-filter: blur(5px); /* Change blur amount as needed */
  -webkit-backdrop-filter: blur(5px); /* For Safari */
  display: grid !important;
  place-items: center;
  z-index: 1002;
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
  gap: 5px;
}
.clientInfo > div {
  width: 100%;
}
input {
  width: 100%;
  margin-top: 6px;
  /* margin-bottom: 8px; */
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
input:focus {
  background: #fff;
  border: 2px solid rgb(0, 166, 255);
}
textarea {
  width: 100%;
  margin-top: 6px;
  /* margin-bottom: 8px; */
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
textarea:focus {
  background: #fff;
  border: 2px solid rgb(0, 166, 255);
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
  margin-top: 10px;
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
.errorMsg {
  color: red;
  font-size: 12px;
  margin: 0;
}
@media only screen and (max-height: 1250px) {
  .modal-container {
    margin: 1em;
  }
  .select {
    font-size: 0.8rem;
  }
}
@media only screen and (max-width: 800px) {
  .header {
    display: grid;
    place-items: center;
    grid-template-rows: repeat(2, 1fr);
  }
  .headerInfo {
    width: 100%;
  }
  .headerInfo h1 {
    margin: 0;
    margin-left: 0;
    margin-right: 0;
    font-size: 90%;
  }
  .createJob {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    background: none;
    border: none;
    padding: 0;
  }
  .headerInfo img {
    display: none;
  }
  .createJob p {
    margin: 0;
  }
  .freelancerGrid {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1rem;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1em;
    margin-left: 1em;
    margin-bottom: 1em;
  }
  .RecoTitle {
    margin: 0;
    text-align: center;
  }
  #freelancer {
    width: 80%;
    margin: auto;
  }
}
</style>

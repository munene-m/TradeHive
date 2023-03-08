<template>
    <div class="star-rating">
      <span v-for="(star, index) in stars" :key="index" @click="selectRating(index)">
        <i :class="[starClass, { filled: index < selectedRating }]"></i>
      </span>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const starClass = 'fa';
  
  const props = {
    itemId: { type: String, required: true },
    initialRating: { type: Number, default: 0 }
  };
  
  const selectedRating = ref(props.initialRating);
  const stars = Array(5).fill(starClass);
  
  const selectRating = index => {
    selectedRating.value = index + 1;
    saveRating();
  };
  
  const saveRating = async () => {
    await axios.post(`/ratings/${props.itemId}`, { ratingValue: selectedRating.value });
  };
  
  </script>
  
  <style>
  .star-rating {
    display: inline-block;
    font-size: 2rem;
    color: #ffd700;
    cursor: pointer;
  }
  
  .fa {
    margin-right: 0.2rem;
  }
  
  .fa:before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 400;
  }
  
  .fa-star:before {
    content: '\f005';
  }
  
  .fa-star-o:before {
    content: '\f006';
  }
  
  .filled {
    color: #fde16d;
  }
  </style>
  
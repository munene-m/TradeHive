<template>
<div class="carousel">
    <div class="slide" v-for="(slide, index) in slides" :key="index" :style="{left: `${-100 * index}%`}">
        <img :src="slide.image" alt="">
    </div>
    <button @click="prev">prev</button>
    <button @click="next">next</button>
</div>

</template>

<script setup>
// import Group5 from '../assets/images'
// import Group2 from '../assets/images/Group2.png'
import { reactive, ref } from 'vue';
const slides = reactive([
    {id: '1', image: require('../assets/images/Group2.png')},
    {id: '2', image: require('../assets/images/Group5.png')}
])
const currentSlide = ref(0)

const prev = () => {
    currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

const next = () => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
}
</script>
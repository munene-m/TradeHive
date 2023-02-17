<template>
    <div v-if="show" class="popup">
        <p>{{ message }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const show = ref(true)
defineProps({
    message: String
})
//This hook makes this appear only once when user updates the page. After other updates the popup doesn't show
onMounted(() => {
    setTimeout(() => {
        show.value = false
    }, 5000)
})
</script>

<style scoped>
.popup{
    position: fixed;
    top: 10rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px;
    background-color: #4CAF50;
    border-radius: 6px;
    color: #fff;
    z-index: 10000;
    opacity: 0.7;
}
</style>
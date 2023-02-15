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
onMounted(() => {
    setTimeout(() => {
        show.value = false
    }, 3000)
})
</script>

<style scoped>
.popup{
    position: fixed;
    top: 10rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    background-color: #4CAF50;
    color: #fff;
    z-index: 10000;
}
</style>
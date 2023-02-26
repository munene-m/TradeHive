<script setup>
import { computed, reactive } from "vue";

import { useServiceStore } from "../stores/services";
defineProps({
  show: Boolean,
});
</script>

<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-container">
        <slot name="form"></slot>

      <!-- <footer>
        <button >Submit</button>
      </footer> -->
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  background: #fff;
  padding: 1rem 2rem;
  max-width: 900px;
  border-radius: 15px;
}
</style>
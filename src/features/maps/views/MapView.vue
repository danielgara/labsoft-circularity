<script setup lang="ts">
import { onMounted } from 'vue';
import * as L from 'leaflet';

onMounted(() => {
  const map = L.map('map').setView([6.2442, -75.5812], 13); // Medellín

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  L.marker([6.2442, -75.5812]).addTo(map).bindPopup('Medellín').openPopup();
});
</script>

<template>
  <div id="map" class="map-container"></div>
</template>

<style scoped>
.map-container {
  height: 100vh;
  width: 100%;
}
</style>

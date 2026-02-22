<script setup lang="ts">
import { onMounted } from 'vue';
import * as L from 'leaflet';

// internal application code imports
import { MapService } from '@/features/maps/services/MapService';

onMounted(() => {
  const map = L.map('map').setView([37.8, -96], 4);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const statesData = MapService.getGeoData();

  L.geoJSON(statesData as any).addTo(map);
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

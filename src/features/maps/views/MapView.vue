<script setup lang="ts">
// external libraries imports
import { onMounted } from 'vue';
import * as L from 'leaflet';

// internal application code imports
import { MapService } from '@/features/maps/services/MapService';

onMounted(() => {
  const map = L.map('map').setView([4.5709, -74.2973], 5);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const mapData = MapService.getMapData();

  L.geoJSON(mapData).addTo(map);
});
</script>

<template>
  <div id="map" class="map-container"></div>
</template>

<style scoped>
.map-container {
  height: 100%;
  width: 100%;
}
</style>

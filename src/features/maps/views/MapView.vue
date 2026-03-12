<script setup lang="ts">
// external libraries imports
import { onMounted } from 'vue';
import * as L from 'leaflet';

// internal application code imports
import { MapService } from '@/features/maps/services/MapService';
import { MapUtils } from '@/features/maps/utils/MapUtils';

onMounted(() => {
  const map = L.map('map').setView([4.5709, -74.2973], 5);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const mapData = MapService.getMapData();

  const mapUtils = new MapUtils(map);

  mapUtils.createGeoJsonLayer(mapData).addTo(map);
  mapUtils.createInfoControl().addTo(map);
  mapUtils.createLegend().addTo(map);
});
</script>

<template>
  <div class="map-wrapper rounded-3 overflow-hidden border border-secondary border-opacity-25 shadow-sm">
    <div id="map" class="map-container"></div>
  </div>
</template>

<style scoped>
.map-wrapper {
  height: 100%;
  min-height: 400px;
}

.map-container {
  height: 100%;
  width: 100%;
}
</style>

<style>
/* Estilo zip: paneles blancos, rounded-xl, shadow-lg */
.info {
  padding: 0;
  font: 14px/1.4 system-ui, -apple-system, sans-serif;
  background: #fff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.06);
  min-width: 140px;
}

.info-panel {
  padding: 10px 12px;
}

.info-panel__title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #64748b;
  margin-bottom: 6px;
}

.info-panel__content {
  border-top: 1px solid #e2e8f0;
  padding-top: 8px;
}

.info-panel__name {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
}

.info-panel__meta {
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
}

.info-panel__hint {
  font-size: 12px;
  color: #94a3b8;
  font-style: italic;
}

.legend {
  line-height: 18px;
  color: #374151;
  background: #fff;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.legend .legend__title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #111827;
  margin-bottom: 0.75rem;
}

.legend__row {
  margin-bottom: 4px;
}

.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.85;
  border-radius: 2px;
}
</style>

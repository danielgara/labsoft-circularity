import { defineStore } from 'pinia';
import type { MapFeatureCollection } from '@/features/maps/interfaces/MapInterface';
import { mapSeeder } from '@/features/maps/stores/mapseeder';

export const useMapStore = defineStore('map', {
  state: (): { geoData: MapFeatureCollection } => ({
    geoData: mapSeeder,
  }),
});

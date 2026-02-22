// internal application code imports
import { useMapStore } from '@/features/maps/stores/mapstore';
import type { MapFeatureCollection } from '@/features/maps/interfaces/MapInterface';

export class MapService {
  static getMapData(): MapFeatureCollection {
    return useMapStore().mapData;
  }
}

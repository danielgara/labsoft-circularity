// internal application code imports
import { useMapStore } from '@/features/maps/stores/mapstore';
import type { MapInterface } from '@/features/maps/interfaces/MapInterface';

export class MapService {
  static getMapData(): MapInterface {
    return useMapStore().mapData;
  }
}

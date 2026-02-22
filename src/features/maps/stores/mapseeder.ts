// internal application code imports
import type { MapFeature, MapFeatureCollection, MapGeometry } from '@/features/maps/interfaces/MapInterface';
import colombiaGeo from '@/features/maps/data/colombia-geo.json';


type ColombiaGeoFeature = {
  type: 'Feature';
  properties: { DPTO: string; NOMBRE_DPT: string };
  geometry: MapGeometry;
};

function toMapFeature(feature: ColombiaGeoFeature): MapFeature {
  return {
    type: 'Feature',
    properties: {
      code: feature.properties.DPTO,
      name: feature.properties.NOMBRE_DPT,
    },
    geometry: feature.geometry,
  };
}

const rawFeatures = (colombiaGeo as { features: ColombiaGeoFeature[] }).features;
const features: MapFeature[] = rawFeatures.map(toMapFeature);

export const mapSeeder: MapFeatureCollection = {
  type: 'FeatureCollection',
  features,
};

// main interface
export interface MapProperties {
  name: string;
  density: number;
}

export interface MapGeometry {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][];
}

export interface MapFeature {
  type: 'Feature';
  properties: MapProperties;
  geometry: MapGeometry;
}

export interface MapFeatureCollection {
  type: 'FeatureCollection';
  features: MapFeature[];
}

export interface MapInterface {
  type: 'FeatureCollection';
  // departments
  features: {
    type: 'Feature';
    // name, area, hectares
    properties: {
      [key: string]: unknown;
    };
    // shape: polygon(s) and their coordinate rings
    geometry: {
      type: 'Polygon' | 'MultiPolygon';
      coordinates: number[][][] | number[][][][];
    };
  }[];
}

// external libraries imports
import * as L from 'leaflet';
import { useMapStore } from '@/features/maps/stores/mapstore';

// internal application code imports
import type {
  MapFeature,
  MapFeatureCollection,
  MapProperties,
} from '@/features/maps/interfaces/MapInterface';

const DENSITY_GRADES = [0, 10, 20, 50, 100, 200, 500, 1000] as const;

let geojsonLayerRef: L.GeoJSON | null = null;
let infoControlRef: (L.Control & { update: (props?: MapProperties) => void }) | null = null;

export type LeafletLayerWithFeature = L.Path & { feature?: MapFeature };

export class MapService {
  static getGeoData(): MapFeatureCollection {
    return useMapStore().geoData;
  }

  static getColor(d: number): string {
    return d > 1000
      ? '#800026'
      : d > 500
        ? '#BD0026'
        : d > 200
          ? '#E31A1C'
          : d > 100
            ? '#FC4E2A'
            : d > 50
              ? '#FD8D3C'
              : d > 20
                ? '#FEB24C'
                : d > 10
                  ? '#FED976'
                  : '#FFEDA0';
  }
}

export function getColor(d: number): string {
  return MapService.getColor(d);
}

export function style(feature: MapFeature): L.PathOptions {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  };
}

export function highlightFeature(e: L.LeafletMouseEvent): void {
  const layer = e.target as LeafletLayerWithFeature;

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7,
  });

  layer.bringToFront();

  if (infoControlRef?.update && layer.feature?.properties) {
    infoControlRef.update(layer.feature.properties);
  }
}

export function resetHighlight(e: L.LeafletMouseEvent): void {
  if (geojsonLayerRef) {
    geojsonLayerRef.resetStyle(e.target as L.Path);
  }
  if (infoControlRef?.update) {
    infoControlRef.update();
  }
}

export function zoomToFeature(e: L.LeafletMouseEvent, map: L.Map): void {
  const layer = e.target as L.Path & { getBounds: () => L.LatLngBounds };
  if (layer.getBounds) {
    map.fitBounds(layer.getBounds());
  }
}

export function onEachFeature(
  feature: GeoJSON.Feature,
  layer: L.Layer,
  map: L.Map
): void {
  (layer as LeafletLayerWithFeature).feature = feature as MapFeature;
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: (e: L.LeafletMouseEvent) => zoomToFeature(e, map),
  });
}

function leafletControl(options?: L.ControlOptions): L.Control {
  return (L as unknown as { control: (opts?: L.ControlOptions) => L.Control }).control(options);
}

export function createInfoControl(): L.Control & {
  update: (props?: MapProperties) => void;
} {
  const info = leafletControl() as L.Control & {
    update: (props?: MapProperties) => void;
  };

  info.onAdd = function () {
    const div = L.DomUtil.create('div', 'info');
    info.update = function (props?: MapProperties) {
      div.innerHTML =
        '<h4>US Population Density</h4>' +
        (props
          ? `<b>${props.name}</b><br/>${props.density} people / mi<sup>2</sup>`
          : 'Hover over a state');
    };
    info.update();
    return div;
  };

  infoControlRef = info;
  return info;
}

export function createLegend(): L.Control {
  const legend = leafletControl({ position: 'bottomright' });

  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');

    for (let i = 0; i < DENSITY_GRADES.length; i++) {
      const lo = DENSITY_GRADES[i];
      const hi = DENSITY_GRADES[i + 1];
      if (lo == null) continue;
      div.innerHTML +=
        `<i style="background:${getColor(lo + 1)}"></i> ` +
        lo +
        (hi != null ? `&ndash;${hi}<br>` : '+');
    }
    return div;
  };

  return legend;
}

export function createGeoJsonLayer(
  data: MapFeatureCollection,
  map: L.Map
): L.GeoJSON {
  geojsonLayerRef = L.geoJSON(data as GeoJSON.GeoJsonObject, {
    style: (feature) => style((feature ?? {}) as MapFeature),
    onEachFeature: (feature, layer) => onEachFeature(feature, layer, map),
  });

  return geojsonLayerRef;
}

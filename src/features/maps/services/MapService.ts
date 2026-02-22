
// internal application code imports
// external libraries imports
import * as L from 'leaflet';
import { useMapStore } from '@/features/maps/stores/mapstore';
import type {
  MapFeature,
  MapFeatureCollection,
  MapProperties,
} from '@/features/maps/interfaces/MapInterface';

const FILL_COLOR = '#41B6C4';

let geojsonLayerRef: L.GeoJSON | null = null;
let infoControlRef: (L.Control & { update: (props?: MapProperties) => void }) | null = null;

type LeafletLayerWithFeature = L.Path & { feature?: MapFeature };


export class MapService {
  static getGeoData(): MapFeatureCollection {

    return useMapStore().geoData;
  }
}

function style(_feature: MapFeature): L.PathOptions {
  return {
    fillColor: FILL_COLOR,
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  };
}

function highlightFeature(e: L.LeafletMouseEvent): void {
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

function resetHighlight(e: L.LeafletMouseEvent): void {
  if (geojsonLayerRef) {
    geojsonLayerRef.resetStyle(e.target as L.Path);
  }
  if (infoControlRef?.update) {
    infoControlRef.update();
  }
}

function zoomToFeature(e: L.LeafletMouseEvent, map: L.Map): void {
  const layer = e.target as L.Path & { getBounds: () => L.LatLngBounds };
  if (layer.getBounds) {
    map.fitBounds(layer.getBounds());
  }
}

function onEachFeature(
  feature: GeoJSON.Feature,
  layer: L.Layer,
  map: L.Map
): void {
      let extra = '';
      if (props.hectares != null) {
        extra += `<br/>${(props.hectares / 1000).toFixed(1)} km²`;
      }
      if (props.density != null) {
        extra += `<br/>${props.density} hab/km²`;
      }
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
      if (!props) {
        div.innerHTML =
          '<h4>Colombia - Departamentos</h4>Pase el cursor sobre un departamento';
        return;
      }
      div.innerHTML =
        '<h4>Colombia - Departamentos</h4>' +
        `<b>${props.name}</b> (${props.code})`;
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
    div.innerHTML = `<i style="background:${FILL_COLOR}"></i> Departamentos de Colombia`;
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

import * as L from 'leaflet';

let geojsonLayer: L.GeoJSON;
let infoControl: (L.Control & { update(props?: Record<string, unknown>): void }) | undefined;

export function getColor() {
  return '#3388ff'; // base color for departments
}

export function style() {
  return {
    fillColor: getColor(),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.6,
  };
}

export function highlightFeature(e: L.LeafletMouseEvent) {
  const layer = e.target as L.Path;

  layer.setStyle({
    weight: 4,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7,
  });

  layer.bringToFront();

  const feature = (layer as unknown as { feature?: GeoJSON.Feature }).feature;
  if (infoControl && feature?.properties) {
    infoControl.update(feature.properties as Record<string, unknown>);
  }
}

export function resetHighlight(e: L.LeafletMouseEvent) {
  geojsonLayer.resetStyle(e.target);

  infoControl?.update();
}

export function zoomToFeature(e: L.LeafletMouseEvent, map: L.Map) {
  map.fitBounds(e.target.getBounds());
}

export function onEachFeature(feature: any, layer: L.Layer, map: L.Map) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: (e) => zoomToFeature(e, map),
  });
}

const createControl = L.control as unknown as (options?: L.ControlOptions) => L.Control;

export function createInfoControl(): L.Control & { update(props?: Record<string, unknown>): void } {
  const info = createControl() as L.Control & { _div: HTMLDivElement; update(props?: Record<string, unknown>): void };

  info.onAdd = function (this: typeof info) {
    this._div = L.DomUtil.create('div', 'info') as HTMLDivElement;
    this.update();
    return this._div;
  };

  info.update = function (this: typeof info, props?: Record<string, unknown>) {
    const p = props as { NOMBRE_DPT?: string; name?: string; AREA?: number; HECTARES?: number } | undefined;
    const name = p?.NOMBRE_DPT ?? p?.name ?? '';
    const areaKm2 = p?.AREA != null ? (p.AREA / 1e6).toLocaleString('en', { maximumFractionDigits: 0 }) + ' km²' : null;
    const hectares = p?.HECTARES != null ? (p.HECTARES / 1e3).toLocaleString('en', { maximumFractionDigits: 0 }) + 'k ha' : null;

    this._div.innerHTML =
      '<div class="info-panel">' +
        '<div class="info-panel__title">Colombia</div>' +
        (name
          ? '<div class="info-panel__content">' +
              '<div class="info-panel__name">' + name + '</div>' +
              (areaKm2 ? '<div class="info-panel__meta">Area: ' + areaKm2 + '</div>' : '') +
              (hectares ? '<div class="info-panel__meta">' + hectares + '</div>' : '') +
            '</div>'
          : '<div class="info-panel__hint">Hover over a department</div>') +
      '</div>';
  };

  infoControl = info;
  return info;
}

export function createLegend(): L.Control {
  const legend = createControl({ position: 'bottomright' });

  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<b>Colombia</b><br/><i style="background:#3388ff"></i> Departments';
    return div;
  };

  return legend;
}

export function createGeoJsonLayer(data: any, map: L.Map) {
  geojsonLayer = L.geoJSON(data, {
    style,
    onEachFeature: (feature, layer) =>
      onEachFeature(feature, layer, map),
  });

  return geojsonLayer;
}
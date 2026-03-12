import * as L from 'leaflet';
import type { MapInterface } from '@/features/maps/interfaces/MapInterface';

type InfoControl = L.Control & {
  _div: HTMLDivElement;
  update(props?: Record<string, unknown>): void;
};

export class MapUtils {
  private map: L.Map;
  private geojsonLayer: L.GeoJSON | undefined;
  private infoControl: InfoControl | undefined;
  private readonly createControl = L.control as unknown as (
    options?: L.ControlOptions,
  ) => L.Control;

  constructor(map: L.Map) {
    this.map = map;
  }

  getColor(): string {
    // base color for departments
    return '#3388ff';
  }

  style(): L.PathOptions {
    return {
      fillColor: this.getColor(),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.6,
    };
  }

  private highlightFeature = (e: L.LeafletMouseEvent) => {
    const layer = e.target as L.Path;

    layer.setStyle({
      weight: 4,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7,
    });

    layer.bringToFront();

    const feature = (layer as unknown as { feature?: GeoJSON.Feature }).feature;
    if (this.infoControl && feature?.properties) {
      this.infoControl.update(feature.properties as Record<string, unknown>);
    }
  };

  private resetHighlight = (e: L.LeafletMouseEvent) => {
    if (this.geojsonLayer) {
      this.geojsonLayer.resetStyle(e.target);
    }

    this.infoControl?.update();
  };

  private zoomToFeature = (e: L.LeafletMouseEvent) => {
    this.map.fitBounds((e.target as L.Layer & { getBounds(): L.LatLngBounds }).getBounds());
  };

  private onEachFeature = (feature: GeoJSON.Feature, layer: L.Layer) => {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.zoomToFeature,
    });
  };

  createInfoControl(): InfoControl {
    const info = this.createControl() as InfoControl;

    info.onAdd = function (this: InfoControl) {
      this._div = L.DomUtil.create('div', 'info') as HTMLDivElement;
      this.update();
      return this._div;
    };

    info.update = function (
      this: InfoControl,
      props?: Record<string, unknown>,
    ) {
      const p = props as
        | { NOMBRE_DPT?: string; name?: string; AREA?: number; HECTARES?: number }
        | undefined;
      const name = p?.NOMBRE_DPT ?? p?.name ?? '';
      const areaKm2 =
        p?.AREA != null
          ? (p.AREA / 1e6).toLocaleString('en', { maximumFractionDigits: 0 }) +
            ' km²'
          : null;
      const hectares =
        p?.HECTARES != null
          ? (p.HECTARES / 1e3).toLocaleString('en', {
              maximumFractionDigits: 0,
            }) + 'k ha'
          : null;

      this._div.innerHTML =
        '<div class="info-panel">' +
        '<div class="info-panel__title">Colombia</div>' +
        (name
          ? '<div class="info-panel__content">' +
            '<div class="info-panel__name">' +
            name +
            '</div>' +
            (areaKm2
              ? '<div class="info-panel__meta">Area: ' + areaKm2 + '</div>'
              : '') +
            (hectares
              ? '<div class="info-panel__meta">' + hectares + '</div>'
              : '') +
            '</div>'
          : '<div class="info-panel__hint">Hover over a department</div>') +
        '</div>';
    };

    this.infoControl = info;
    return info;
  }

  createLegend(): L.Control {
    const legend = this.createControl({ position: 'bottomright' });

    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML =
        '<b>Colombia</b><br/><i style="background:#3388ff"></i> Departments';
      return div;
    };

    return legend;
  }

  createGeoJsonLayer(data: MapInterface): L.GeoJSON {
    this.geojsonLayer = L.geoJSON(data as unknown as GeoJSON.GeoJsonObject, {
      style: () => this.style(),
      onEachFeature: (feature, layer) =>
        this.onEachFeature(feature as GeoJSON.Feature, layer),
    });

    return this.geojsonLayer;
  }
}


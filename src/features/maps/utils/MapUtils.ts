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

  private getColor(hectares?: number): string {
    if (hectares == null) return '#FFEDA0';

    if (hectares > 6_000_000) return '#800026';
    if (hectares > 4_500_000) return '#BD0026';
    if (hectares > 3_500_000) return '#E31A1C';
    if (hectares > 2_500_000) return '#FC4E2A';
    if (hectares > 1_500_000) return '#FD8D3C';
    if (hectares > 900_000) return '#FEB24C';
    if (hectares > 400_000) return '#FED976';
    return '#FFEDA0';
  }

  private style = (feature?: GeoJSON.Feature): L.PathOptions => {
    const props = feature?.properties as { HECTARES?: number } | undefined;
    const hectares = props?.HECTARES;

    return {
      fillColor: this.getColor(hectares),
      weight: 1.5,
      opacity: 1,
      color: '#ffffff',
      dashArray: '3',
      fillOpacity: 0.7,
    };
  };

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

    info.update = function (this: InfoControl, props?: Record<string, unknown>) {
      const p = props as
        | { NOMBRE_DPT?: string; name?: string; AREA?: number; HECTARES?: number }
        | undefined;
      const name = p?.NOMBRE_DPT ?? p?.name ?? '';
      const areaKm2 =
        p?.AREA != null
          ? (p.AREA / 1e6).toLocaleString('en', { maximumFractionDigits: 0 }) + ' km²'
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
            (areaKm2 ? '<div class="info-panel__meta">Area: ' + areaKm2 + '</div>' : '') +
            (hectares ? '<div class="info-panel__meta">' + hectares + '</div>' : '') +
            '</div>'
          : '<div class="info-panel__hint">Hover over a department</div>') +
        '</div>';
    };

    this.infoControl = info;
    return info;
  }

  createLegend(): L.Control {
    const legend = this.createControl({ position: 'bottomright' });

    const grades = [0, 750_000, 1_500_000, 3_000_000, 5_000_000];
    const labels: string[] = [];

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = '<div class="legend__title">Departments by hectares</div>';

      for (let i = 0; i < grades.length; i += 1) {
        const from = grades[i]!;
        const to = grades[i + 1];
        const color = this.getColor(to ?? from + 1);

        labels.push(
          `<div class="legend__row"><i style="background:${color}"></i>` +
            `${(from / 1_000_000).toFixed(1)}M` +
            (to ? ` &ndash; ${(to / 1_000_000).toFixed(1)}M ha` : '+ ha') +
            '</div>',
        );
      }

      div.innerHTML += labels.join('');
      return div;
    };

    return legend;
  }

  createGeoJsonLayer(data: MapInterface): L.GeoJSON {
    this.geojsonLayer = L.geoJSON(data as unknown as GeoJSON.GeoJsonObject, {
      style: (feature) => this.style(feature as GeoJSON.Feature),
      onEachFeature: (feature, layer) => this.onEachFeature(feature as GeoJSON.Feature, layer),
    });

    return this.geojsonLayer;
  }
}

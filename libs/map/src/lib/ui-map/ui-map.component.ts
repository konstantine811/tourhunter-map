import {
  Component,
  OnInit,
  Inject,
  Input,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';

// decision for a error of the not founding marker png
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});
Marker.prototype.options.icon = iconDefault;

import { MAP_CONFIG, MapConfig } from '../config/map.config';

export interface MapData {
  coord: GeoData;
  key: number;
  title: string;
  isLeaf: boolean;
  selected?: boolean;
}

export interface GeoData {
  longitude: number;
  latitude: number;
}

@Component({
  selector: 'tourhunter-ui-map',
  templateUrl: './ui-map.component.html',
  styleUrls: ['./ui-map.component.scss'],
})
export class UiMapComponent implements OnInit {
  @Output()
  pointedCoord: EventEmitter<GeoData | null> = new EventEmitter();
  @Output() hoveredMarker: EventEmitter<MapData> = new EventEmitter();
  @Input() pointMarker: boolean;
  @Input() data: MapData[];
  map: any;
  marker: any;
  selectedMarker = {};
  constructor(@Inject(MAP_CONFIG) private mapConfig: MapConfig) {}

  // create a map
  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });
  }

  // listen map click event and when we pointed marker we emit this data to outer listener
  // and checked if we had yet marker we deleted old it
  onMapClick(e) {
    const coord: GeoData = {
      latitude: 0,
      longitude: 0,
    };
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker(e.latlng).addTo(this.map);
    coord.latitude = e.latlng.lat;
    coord.longitude = e.latlng.lng;
    this.pointedCoord.emit(coord);
  }

  //checked current status from outer permission for showing a point marker
  // if status true we add click listener
  // or if status false and current marker exist we need deleting this and unsubscireb from listener event click
  showPointMarker(status) {
    if (status) {
      this.map.on('click', (e) => {
        this.onMapClick(e);
      });
    } else if (!status && this.marker) {
      this.map.removeLayer(this.marker);
      this.pointedCoord.emit(null);
      this.map.off('click');
    }
  }

  // when we hovered on a marker we deleting it and emit to outer a current deleted of the marker key
  onMarkerHover(marker) {
    this.map.removeLayer(this.selectedMarker[marker.key]);
    this.hoveredMarker.emit(marker);
  }

  // showing markers relativly to input data
  // if we has data yet we need deleting all this marker
  // then if data exist we loop all data and create marker from this
  // transfrom coord data to map interface
  // add mouseove event
  // store all selected marker by its key
  // push all new coord data to array for constructing bounding box
  // if our arr coords has only 1 item we use this to reposition camera to current view
  // or we bigger then 1 we calculate bounding box from coords and reposition camera
  showingCoorData(data) {
    const selectedKeys = Object.keys(this.selectedMarker);
    if (selectedKeys.length > 0) {
      selectedKeys.forEach((item) => {
        this.map.removeLayer(this.selectedMarker[item]);
      });
    }
    if (data) {
      const coords = [];
      data.forEach((item) => {
        const { coord } = item;
        if (coord) {
          const latlng = {
            lat: coord.latitude,
            lng: coord.longitude,
          };
          const marker = L.marker(latlng).addTo(this.map);
          marker.on('mouseover', () => {
            this.onMarkerHover(item);
          });
          this.selectedMarker[item.key] = marker;
          coords.push(latlng);
        }
      });

      if (coords.length > 1) {
        this.map.fitBounds(L.latLngBounds(coords));
      } else if (coords.length === 1) {
        this.map.fitBounds(coords);
      }
    }
  }

  // on init we are add a map
  ngOnInit() {
    this.initMap();
    const tiles = L.tileLayer(this.mapConfig.link, this.mapConfig.attr);

    tiles.addTo(this.map);
  }

  // on changes outer data we need fire this functions
  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.showingCoorData(changes.data.currentValue);
    }
    if (changes.pointMarker) {
      this.showPointMarker(changes.pointMarker.currentValue);
    }
  }
}

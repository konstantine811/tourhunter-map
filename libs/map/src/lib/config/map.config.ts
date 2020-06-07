import { InjectionToken } from '@angular/core';

export interface MapAttributes {
  attribution: string;
  maxZoom: number;
  id: string;
  tileSize: number;
  zoomOffset: number;
  accessToken: string;
}

export interface MapConfig {
  link: string;
  attr: MapAttributes;
}

export const MAP_CONFIG = new InjectionToken<MapConfig>('MAP_CONFIG');

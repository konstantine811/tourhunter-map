import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MAP_CONFIG, MapConfig } from './config/map.config';

import { UiMapComponent } from './ui-map/ui-map.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UiMapComponent],
  exports: [UiMapComponent],
})
export class MapModule {
  static forRoot(config?: MapConfig): ModuleWithProviders {
    return {
      ngModule: MapModule,
      providers: [
        {
          provide: MAP_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}

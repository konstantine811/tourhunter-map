import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@NgModule({
  imports: [
    CommonModule,
    NzIconModule,
    NzButtonModule,
    NzGridModule,
    NzDividerModule,
    NzTreeModule,
    NzAlertModule,
  ],
  exports: [
    NzIconModule,
    NzButtonModule,
    NzGridModule,
    NzDividerModule,
    NzTreeModule,
    NzAlertModule,
  ],
})
export class NgZorroModule {}

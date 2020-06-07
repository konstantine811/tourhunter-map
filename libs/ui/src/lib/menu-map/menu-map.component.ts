import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

import { fadeInScale } from '../animations/common-animaitons';

import { CoordData, ClusterData } from '@tourhunter/api-interface';

export interface SelectData {
  key: number;
  title: string;
}

@Component({
  selector: 'tourhunter-menu-map',
  templateUrl: './menu-map.component.html',
  styleUrls: ['./menu-map.component.scss'],
  animations: [fadeInScale],
})
export class MenuMapComponent implements OnInit {
  @Output() opened: EventEmitter<boolean> = new EventEmitter();
  @Output() geozoneSelected: EventEmitter<number> = new EventEmitter();
  @Output() submited: EventEmitter<ClusterData> = new EventEmitter();
  @Input() pointedCoord: CoordData | null;
  @Input() geozoneValue: SelectData[];
  @Input() massiveValue: SelectData[];
  @Input() pointValue: SelectData[];
  toggleGeozone = false;
  toggleMassive = false;
  ifPointed = true;
  validateForm!: FormGroup;
  showForm = false;
  constructor(private fb: FormBuilder) {}

  // sumbity and checked form
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.pointedCoord) {
      this.ifPointed = false;
    } else {
      this.ifPointed = true;
    }
    if (this.pointedCoord && this.validateForm.valid) {
      this.ifPointed = false;
      const data: ClusterData = {
        geozoneName: this.validateForm.controls.geozoneName.value,
        massiveName: this.validateForm.controls.massiveName.value,
        pointName: this.validateForm.controls.pointName.value,
        coord: this.pointedCoord,
      };
      this.submited.emit(data);
      this.showForm = false;
      this.opened.emit(false);
    }
    console.log(this.pointValue);
  }

  // emit status opened form for if we need point a marker on a map
  emitShowForm(status) {
    this.validateForm.reset();
    this.ifPointed = true;
    this.showForm = status;
    this.opened.emit(status);
  }

  // emit if we disabled switch from select current geozone
  geozoneSwitchChange(status) {
    if (!status) {
      this.geozoneSelected.emit(null);
    }
  }

  // emit geozone selected key for finding relativly current massives city
  geozoneSelect(title) {
    const { key } = this.geozoneValue.find((item) => item.title === title);
    this.geozoneSelected.emit(key);
  }

  // validation for unique point name for correctly indexing
  uniqPoints(value: SelectData[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (
        value.some((e) => control.value && e.title === control.value.trim())
      ) {
        return { notUnique: true };
      }
      return null;
    };
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      geozoneName: [null, [Validators.required]],
      massiveName: [null, [Validators.required]],
      pointName: [
        null,
        [Validators.required, this.uniqPoints(this.pointValue)],
      ],
    });
  }
}

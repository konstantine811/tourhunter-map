import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tourhunter-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isVisible = false;
  constructor() {}

  ngOnInit(): void {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}

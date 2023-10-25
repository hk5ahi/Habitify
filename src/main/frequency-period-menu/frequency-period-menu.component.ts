import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatMenu } from "@angular/material/menu";

@Component({
  selector: 'app-frequency-period-menu',
  templateUrl: './frequency-period-menu.component.html',
  styleUrls: ['./frequency-period-menu.component.scss']
})
export class FrequencyPeriodMenuComponent {
  @Output() frequencyPeriod: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(MatMenu) menu!: MatMenu;

  getMatMenu(): MatMenu {
    return this.menu;
  }

  updateFrequencyPeriod(perWeek: string) {
    this.frequencyPeriod.emit(perWeek);
  }
}

import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatMenu } from "@angular/material/menu";

@Component({
  selector: 'app-frequency-menu',
  templateUrl: './frequency-menu.component.html',
  styleUrls: ['./frequency-menu.component.scss']
})
export class FrequencyMenuComponent {
  @Output() frequency: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(MatMenu) menu!: MatMenu;

  getMatMenu(): MatMenu {
    return this.menu;
  }
  updateGoalFrequency(times: string) {
    this.frequency.emit(times);
  }
}

import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatMenu } from "@angular/material/menu";

@Component({
  selector: 'app-water-frequency-menu',
  templateUrl: './water-frequency-menu.component.html',
  styleUrls: ['./water-frequency-menu.component.scss']
})
export class WaterFrequencyMenuComponent {
  @Output() waterGoal: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(MatMenu) menu!: MatMenu;
  updateWaterGoalFrequency(times: string) {
    this.waterGoal.emit(times);
  }
  getMenu(): MatMenu {
    return this.menu;
  }

}

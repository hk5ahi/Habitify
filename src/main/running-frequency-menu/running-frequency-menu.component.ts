import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatMenu } from "@angular/material/menu";

@Component({
  selector: 'app-running-frequency-menu',
  templateUrl: './running-frequency-menu.component.html',
  styleUrls: ['./running-frequency-menu.component.scss']
})
export class RunningFrequencyMenuComponent {
  @Output() runningGoal: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(MatMenu) menu!: MatMenu;

  getMatMenu(): MatMenu {
    return this.menu;
  }
  updateRunningGoalFrequency(times: string) {
    this.runningGoal.emit(times);
  }


}

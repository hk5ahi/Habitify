import { Component } from '@angular/core';
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { AppConstants, TimeOfDay } from "../Constants/app-constant";
import { DisplayService } from "../Service/display.service";

@Component({
  selector: 'app-habit-modal-dialogue',
  templateUrl: './habit-modal-dialogue.component.html',
  styleUrls: ['./habit-modal-dialogue.component.scss']
})
export class HabitModalDialogueComponent {

  goalValue: number = 1;
  goalFrequency: string = AppConstants.Times;
  frequencyPerPeriod: string = AppConstants.Per_Day;
  repeat: string = AppConstants.Daily;
  timeOfDay: TimeOfDay = TimeOfDay.Anytime;
  showCalendar: boolean = false;
  selectedDate: Date = new Date();

  constructor(private ref: DynamicDialogRef, private displayService: DisplayService) {
  }

  close() {
    this.ref.close();
  }

  updateGoalFrequency(selectedFrequency: string) {
    this.goalFrequency = selectedFrequency;
  }

  getDisplayValue(date: Date | undefined): string {
    return this.displayService.getDisplayValue(date);
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

}

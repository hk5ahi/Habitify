import { Component } from '@angular/core';
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { AppConstants, TimeOfDay } from "../Constants/app-constant";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-habit-modal-dialogue',
  templateUrl: './habit-modal-dialogue.component.html',
  styleUrls: ['./habit-modal-dialogue.component.scss']
})
export class HabitModalDialogueComponent {

  goalValue: number = 1;
  goalFrequency: string = "Times";
  frequencyPerPeriod: string = "Per Day";
  repeat: string = "Daily";
  timeOfDay: TimeOfDay = TimeOfDay.Anytime;
  showCalendar: boolean = false;
  selectedDate: Date = new Date();

  constructor(private ref: DynamicDialogRef, private datePipe: DatePipe,) {
  }

  close() {
    this.ref.close();
  }

  updateGoalFrequency(selectedFrequency: string) {
    this.goalFrequency = selectedFrequency;
  }

  getDisplayValue(date: Date | undefined): string {
    if (!date) {
      return ''; // Handle the case when no date is selected
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (this.isSameDay(date, today)) {
      return AppConstants.Today;
    } else if (this.isSameDay(date, yesterday)) {
      return AppConstants.Yesterday;
    } else if (this.isSameDay(date, tomorrow)) {
      return AppConstants.Tomorrow;
    } else {
      return this.datePipe.transform(date, 'MMMM d') || '';
    }
  }

  isSameDay(firstDate: Date, secondDate: Date): boolean {
    return (
      firstDate.getDate() === secondDate.getDate() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getFullYear() === secondDate.getFullYear()
    );
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

}

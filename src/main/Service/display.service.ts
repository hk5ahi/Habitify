import { Injectable } from '@angular/core';
import { AppConstants } from "../Constants/app-constant";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  constructor(private datePipe: DatePipe) {
  }

  getCalenderDisplayValue(date: Date | undefined, format: string = 'MMMM d'): string {
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
      return this.datePipe.transform(date, format) || '';
    }
  }

  getCalenderDialogueDisplayValue(date: Date | undefined): string {
    return this.getCalenderDisplayValue(date, 'MMM dd, yyyy');
  }

  isSameDay(firstDate: Date, secondDate: Date): boolean {
    return (
      firstDate.getDate() === secondDate.getDate() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getFullYear() === secondDate.getFullYear()
    );
  }
}

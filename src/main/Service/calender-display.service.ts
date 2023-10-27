import { Injectable } from '@angular/core';
import { AppConstants } from "../Constants/app-constant";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CalenderDisplayService {
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

  isSameDay(firstDate: Date | string, secondDate: Date | string): boolean {
    // Convert string representations to Date instances
    const date1 = typeof firstDate === 'string' ? new Date(firstDate) : firstDate;
    const date2 = typeof secondDate === 'string' ? new Date(secondDate) : secondDate;
    // Check if they represent the same day
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

}

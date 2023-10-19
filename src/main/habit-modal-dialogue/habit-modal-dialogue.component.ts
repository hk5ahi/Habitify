import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { AppConstants, daysOfWeek, TimeOfDay } from "../Constants/app-constant";
import { DisplayService } from "../Service/display.service";



@Component({
  selector: 'app-habit-modal-dialogue',
  templateUrl: './habit-modal-dialogue.component.html',
  styleUrls: ['./habit-modal-dialogue.component.scss']
})
export class HabitModalDialogueComponent implements OnInit{

  @ViewChild('calender') calenderDialogue!: ElementRef;
  goalValue: number = 1;
  goalFrequency: string = AppConstants.Times;
  frequencyPerPeriod: string = AppConstants.Per_Day;
  timeOfDay: TimeOfDay[] = [TimeOfDay.Morning, TimeOfDay.Afternoon, TimeOfDay.Evening];
  showCalendar: boolean = false;
  selectedDate: Date = new Date();
  startSelectedDate: Date = new Date();
  selectedDates: Date[] = [];
  days: string[] = [daysOfWeek.Sunday, daysOfWeek.Monday, daysOfWeek.Tuesday, daysOfWeek.Wednesday, daysOfWeek.Thursday, daysOfWeek.Friday, daysOfWeek.Saturday];
  intervalPerDays: string = AppConstants.repeat;
  months: string = AppConstants.months;
  checkRepeat: string = 'days';
  protected readonly TimeOfDay = TimeOfDay;
  protected readonly daysOfWeek = daysOfWeek;

  constructor(private ref: DynamicDialogRef, private displayService: DisplayService) {
  }
  ngOnInit(): void {
    const today = new Date();
    const firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.selectedDates.push(firstDateOfMonth);
  }

  close() {
    this.ref.close();
  }

  checkDays(day: string) {
    return this.days.includes(day);
  }

  updateIntervalPerDays(selectedInterval: string) {
    this.intervalPerDays = selectedInterval;
    this.checkRepeat = 'interval';

  }

  toggleDay(day: string): void {
    const index = this.days.indexOf(day);

    if (index !== -1 && this.days.length > 1) {
      // If the day is present and there is more than one day, remove it
      this.days.splice(index, 1);
    } else if (index === -1) {
      // If the day is not present, add it
      this.days.push(day);
    }
    this.checkRepeat = 'days';
  }

  updateGoalFrequency(selectedFrequency: string) {
    this.goalFrequency = selectedFrequency;
  }

  getDayValue(): string {
    const allDays = Object.values(daysOfWeek);
    if (this.checkRepeat == 'days') {
      if (this.areArraysEqual(this.days, allDays)) {
        return 'Daily';
      } else {
        const selectedDays = this.days.map(day => day.substring(0, 3)); // Abbreviate to three letters
        return selectedDays.join(',');
      }
    } else if (this.checkRepeat == 'interval') {
      return this.intervalPerDays;
    }
    else {
      return this.months;
    }
  }

  areArraysEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }

    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    return sortedArr1.every((value, index) => value === sortedArr2[index]);
  }

  updateFrequencyPeriod(selectedFrequency: string) {
    this.frequencyPerPeriod = selectedFrequency;
  }

  updateTimeOfDay(selectedTime: TimeOfDay) {
    const index = this.timeOfDay.indexOf(selectedTime);

    if (index !== -1) {
      // If the time is already in the array, check if there are more than one item
      if (this.timeOfDay.length > 1) {
        // If there is more than one item, remove it
        this.timeOfDay.splice(index, 1);
      }
      // If there is only one item, do nothing (prevent removal)
    } else {
      // If the time is not in the array, add it
      this.timeOfDay.push(selectedTime);
    }
  }

  isTimeOfDaySelected(time: TimeOfDay): boolean {
    return this.timeOfDay.includes(time);
  }

  getTimeOfDayDisplayValue(timeOfDay: TimeOfDay[]): string {
    const allTimesIncluded = timeOfDay.length === 3 && timeOfDay.includes(TimeOfDay.Morning) && timeOfDay.includes(TimeOfDay.Afternoon) && timeOfDay.includes(TimeOfDay.Evening);

    if (allTimesIncluded) {
      return TimeOfDay.Anytime;
    } else {
      return timeOfDay.join(', ');
    }
  }

  getCalenderDisplayValue(date: Date | undefined): string {
    return this.displayService.getCalenderDialogueDisplayValue(date);

  }

  onCalendarClick(event: Event) {
    const clickedInside = this.calenderDialogue.nativeElement?.contains(event.target);
    if (!clickedInside) {
      event.stopPropagation();
    }
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

  onDateSelect(date: Date) {
    // Check if the date is already present in the array
    const isDateSelected = this.selectedDates.some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth());

    if (isDateSelected) {
      // If the date is already present, remove it only if there are more than one date
      if (this.selectedDates.length > 1) {
        this.selectedDates = this.selectedDates.filter(d => d.getDate() !== date.getDate() || d.getMonth() !== date.getMonth());
      }
    } else {
      // If the date is not present, add it
      this.selectedDates.push(date);
    }

   this.checkRepeat='months';
  }


  isSelected(date: any): boolean {
    return this.selectedDates.some(d => d.getDate() === date.day && d.getMonth() === date.month);
  }

  isStartDateSelected(): boolean {
    const currentDate = new Date();

    return this.startSelectedDate.getDate() === currentDate.getDate() && this.startSelectedDate.getMonth() === currentDate.getMonth();
  }
  checkDate(selectedDate: Date): boolean {
    const currentDate = new Date();

    // Check if the selected date and current date are not equal
    return !this.isSameDay(selectedDate, currentDate);
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

}

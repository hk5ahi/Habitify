import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { AppConstants, daysMapping, daysOfWeek, iconMap, TimeOfDay } from "../Constants/app-constant";
import { CalenderDisplayService } from "../Service/calender-display.service";
import { HabitService } from "../Service/habit.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Habit } from "../Data Types/habit";


@Component({
  selector: 'app-habit-modal-dialogue',
  templateUrl: './habit-modal-dialogue.component.html',
  styleUrls: ['./habit-modal-dialogue.component.scss']
})
export class HabitModalDialogueComponent implements OnInit {

  editModal: boolean = false;
  @ViewChild('calender') calenderDialogue!: ElementRef;
  receivedHabit!: Habit;
  habitName!: string;
  goal!: number;
  frequency!: string;
  goalValue = AppConstants.gaolValue;
  runningValue = AppConstants.runningValue;
  cyclingValue = AppConstants.cyclingValue;
  goalFrequency: string = AppConstants.Times;
  waterFrequency = AppConstants.waterFrequency;
  runningFrequency: string = AppConstants.runningFrequency;
  frequencyPerPeriod: string = AppConstants.Per_Day;
  timeOfDay: TimeOfDay[] = [TimeOfDay.Morning, TimeOfDay.Afternoon, TimeOfDay.Evening];
  showCalendar: boolean = false;
  selectedDate: Date = new Date();
  startSelectedDate: Date = new Date();
  selectedDates: Date[] = [];
  days: string[] = [daysOfWeek.Sunday, daysOfWeek.Monday, daysOfWeek.Tuesday, daysOfWeek.Wednesday, daysOfWeek.Thursday, daysOfWeek.Friday, daysOfWeek.Saturday];
  intervalPerDays: string = AppConstants.repeat;
  months: string = AppConstants.months;
  checkRepeat: string = AppConstants.days;
  goalWater: number = AppConstants.goalWater;
  repeatValue!: string;
  protected readonly TimeOfDay = TimeOfDay;
  protected readonly daysOfWeek = daysOfWeek;
  protected readonly AppConstants = AppConstants;

  constructor(
    private ref: DynamicDialogRef,
    private displayService: CalenderDisplayService,
    private habitService: HabitService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private config: DynamicDialogConfig, // Inject DynamicDialogConfig
    @Inject(MAT_DIALOG_DATA) public data: { habit: Habit, editModal: boolean }
  ) {
    this.receivedHabit = this.config.data?.habit;
    this.editModal = this.config.data?.editModal;
  }

  ngOnInit(): void {
    const today = new Date();
    const firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.selectedDates.push(firstDateOfMonth);

    const habit = this.receivedHabit;

    if (habit) {
      this.habitName = habit.name;
      this.goalValue = habit.goal;
      this.goalWater = habit.goal;
      this.runningValue = habit.goal;
      this.cyclingValue = habit.goal;
      this.goalFrequency = habit.Frequency;
      this.runningFrequency = habit.Frequency;
      this.waterFrequency = habit.Frequency;
      this.frequencyPerPeriod = habit.frequencyPerPeriod;
      this.timeOfDay = habit.timeOfDay;
      this.startSelectedDate = habit.startDate;
    }
  }

  close() {
    if (this.habitName) {
      this.confirmDialogue();
    } else {
      this.ref.close();
    }
  }

  confirmDialogue() {
    this.confirmationService.confirm({
      message: 'Do you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-check',
      accept: () => {
        // Confirmation accepted
        this.messageService.add({severity: 'success', summary: 'Confirmed', detail: 'You have accepted'});
        this.ref.close();
      },
      reject: () => {
        // Confirmation rejected
        this.messageService.add({severity: 'info', summary: 'Rejected', detail: 'You have rejected'});
      }
    });
  }

  getIconSource(): string {
    return iconMap[this.habitName] || 'assets/svg/mark.svg';
  }

  checkDays(day: string): boolean {
    if (this.editModal) {
      const repeat = (this.receivedHabit?.repeat as string).toLowerCase();
      const dayToCheck = day.toLowerCase();

      // Check if the repeat string contains either the abbreviated or full name of the day
      return repeat === 'daily' || repeat.includes(dayToCheck) || repeat.includes(dayToCheck.substring(0, 3));

    } else {
      return this.days.includes(day);
    }
  }


  updateIntervalPerDays(selectedInterval: string) {

    if (this.editModal) {
      this.receivedHabit.repeat = selectedInterval;
      this.intervalPerDays = selectedInterval;

    } else {
      this.intervalPerDays = selectedInterval;
      this.repeatValue = selectedInterval;
      this.checkRepeat = AppConstants.interval;
    }
  }

  toggleDay(day: string): void {
    const allDays = Object.values(daysOfWeek);

    if (this.editModal) {


      let daysArray: string[] = [];

      if (this.receivedHabit.repeat === AppConstants.Daily) {
        daysArray = [...allDays];
      } else {

        const isValidRepeat = this.receivedHabit.repeat
          .split(',')
          .map(day => day.trim())
          .some(day => Object.keys(daysMapping).includes(day) || Object.values(daysMapping).includes(day));

        if (isValidRepeat) {
          daysArray = this.receivedHabit.repeat.split(',').map(day => daysMapping[day.trim()]);
        }
      }

      daysArray = this.updateDaysArray(day, daysArray);
      this.checkRepeat = AppConstants.days;
      this.repeatValue = this.getRepeatValueForDays(allDays, daysArray);
      this.receivedHabit.repeat = this.repeatValue;
    } else {
      this.days = this.updateDaysArray(day, this.days);
      this.checkRepeat = AppConstants.days;
      this.repeatValue = this.getRepeatValueForDays(allDays, this.days);
    }
  }

  updateDaysArray(day: string, daysArray: string[]): string[] {
    const updatedDaysArray = [...daysArray]; // Create a copy of the array

    const index = updatedDaysArray.indexOf(day);

    if (index !== -1 && updatedDaysArray.length > 1) {
      // If the day is present and there is more than one day, remove it
      updatedDaysArray.splice(index, 1);

    } else if (index === -1) {
      // If the day is not present, add it
      updatedDaysArray.push(day);
    }

    return updatedDaysArray; // Return the modified array
  }


  updateGoalFrequency(selectedFrequency: string) {

    if (this.editModal) {
      this.receivedHabit.Frequency = selectedFrequency;
      this.goalFrequency = selectedFrequency;
    } else {
      this.frequency = selectedFrequency;
      this.goalFrequency = selectedFrequency;
    }

  }

  inferCheckRepeat(repeatValue: string): string {
    if (!repeatValue) {
      // If repeatValue is undefined or null, assume it's an interval
      return AppConstants.interval;
    }

    if (repeatValue === AppConstants.Daily) {
      return AppConstants.days;
    } else if (this.containsDaysOfWeek(repeatValue)) {
      // If repeatValue contains days of the week, assume it's a daily repeat
      return AppConstants.days;
    } else if (this.containsDateSeparator(repeatValue)) {
      // If repeatValue contains a forward slash, assume it's a date
      return AppConstants.Month;
    } else {
      // If none of the above conditions are met, assume it's an interval
      return AppConstants.interval;
    }
  }

  containsDaysOfWeek(repeatValue: string): boolean {

    return [...Object.keys(daysMapping), ...Object.values(daysMapping)].some(day => repeatValue.includes(day));
  }


  containsDateSeparator(repeatValue: string): boolean {
    return repeatValue.includes('/');
  }


  getDayValue(): string {
    if (this.editModal) {
      return this.getDayValueForEditModal();
    } else {
      return this.getDayValueForNonEditModal();
    }
  }

  getDayValueForEditModal(): string {
    this.checkRepeat = this.inferCheckRepeat(this.receivedHabit?.repeat);

    if (this.checkRepeat === AppConstants.days) {
      return this.getDayValueForDays();
    } else if (this.checkRepeat === AppConstants.interval) {
      return this.receivedHabit?.repeat as string;
    } else {
      this.receivedHabit.repeat = this.selectedDates.map(date => date.toLocaleDateString('en-US')).join(',');
      return this.months as string;
    }
  }

  getDayValueForNonEditModal(): string {
    const allDays = Object.values(daysOfWeek);

    if (this.checkRepeat === AppConstants.days) {
      return this.getRepeatValueForDays(allDays, this.days);
    } else if (this.checkRepeat === AppConstants.interval) {
      return this.intervalPerDays as string;
    } else {
      return this.getRepeatValueForMonths();
    }
  }

  getDayValueForDays(): string {

    return this.receivedHabit?.repeat === AppConstants.Daily
      ? AppConstants.Daily
      : this.getAbbreviatedDays();
  }

  // Returns the abbreviated days like 'Mon, Tue, Wed'
  getAbbreviatedDays(): string {
    const dayArray = (this.receivedHabit?.repeat as string).split(',');
    const abbreviatedDays = dayArray.map(day => {
      const trimmedDay = day.trim().toLowerCase(); // Convert to lowercase for case-insensitive comparison
      return trimmedDay.length === 3 ? trimmedDay : trimmedDay.substring(0, 3);
    });
    return abbreviatedDays.join(', ');
  }


  getRepeatValueForDays(allDays: string[], days: string[]): string {


    if (this.areArraysEqual(days, allDays)) {

      this.repeatValue = AppConstants.Daily;
      return this.repeatValue as string;
    } else {
      this.repeatValue = days.join(' ');
      return this.getAbbreviatedDaysForNonEditModal(days);
    }
  }

  getAbbreviatedDaysForNonEditModal(days: string[]): string {
    const selectedDays = days.map(day => day.substring(0, 3));
    return selectedDays.join(',');
  }

  getRepeatValueForMonths(): string {
    this.repeatValue = this.selectedDates.map(date => date.toLocaleDateString('en-US')).join(',');
    return this.months as string;
  }

  areArraysEqual(firstArray: string[], secondArray: string[]): boolean {
    if (firstArray.length !== secondArray.length) {
      return false;
    }
    const sortedArr1 = firstArray.slice().sort();
    const sortedArr2 = secondArray.slice().sort();
    return sortedArr1.every((value, index) => value === sortedArr2[index]);
  }

  updateFrequencyPeriod(selectedFrequency: string) {
    if (this.editModal) {
      this.receivedHabit.frequencyPerPeriod = selectedFrequency;
      this.frequencyPerPeriod = selectedFrequency;
    } else {
      this.frequencyPerPeriod = selectedFrequency;

    }
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

  // Returns true if the time is present in time of days array to display tick mark
  isTimeOfDaySelected(time: TimeOfDay): boolean {
    return this.timeOfDay.includes(time);
  }

  // Returns the display value for the time of day like 'Morning, Afternoon, Evening' or 'Anytime'
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

  onDateSelect(selectedDate: Date) {

    // Check if the date is already present in the array
    const isDateSelected = this.selectedDates.some(date => date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth());

    if (isDateSelected) {
      // If the date is already present, remove it only if there are more than one date
      if (this.selectedDates.length > 1) {
        this.selectedDates = this.selectedDates.filter(date => date.getDate() !== selectedDate.getDate() || date.getMonth() !== selectedDate.getMonth());
      }
    } else {
      // If the date is not present, add it
      this.selectedDates.push(selectedDate);
    }

    this.checkRepeat = AppConstants.Month;
    if (this.editModal) {
      this.receivedHabit.repeat = this.selectedDates.map(date => date.toLocaleDateString('en-US')).join(',');
    }
  }

  isSelected(selectedDate: any): boolean {
    return this.selectedDates.some(date => date.getDate() === selectedDate.day && date.getMonth() === selectedDate.month);
  }

  updateHabitName(value: string) {
    if (this.editModal) {
      this.receivedHabit.name = value;
    } else {
      this.habitName = value;
    }
  }

  updateWaterGoalFrequency(times: string) {
    if (this.editModal) {
      this.receivedHabit.Frequency = times;
    } else {
      this.waterFrequency = times;
    }
  }

  isWaterOrRunningOrCycling(): boolean {
    return this.habitName === AppConstants.drinkWater || this.habitName === AppConstants.running || this.habitName === AppConstants.cycling;
  }

  updateRunningGoalFrequency(value: string) {
    if (this.editModal) {
      this.receivedHabit.Frequency = value;
    } else {
      this.runningFrequency = value;
    }
  }

  saveHabit() {

    if (this.editModal) {
      this.receivedHabit.name = this.habitName;
      this.habitService.updateHabit(this.receivedHabit);

    } else {
      // Set goal if not provided
      this.goal = this.goal || this.getHabitGoalValue();

      // Set frequency if not provided
      this.frequency = this.frequency || this.getHabitFrequency();

      // Add habit to the service
      this.habitService.addHabit(this.habitName, this.goal, this.frequency, this.frequencyPerPeriod, this.repeatValue, this.timeOfDay, this.startSelectedDate);
    }
    // Close the dialog
    this.ref.close();
  }

  onGoalChange(value: number) {
    setTimeout(() => {
      this.updateGoal(value);
    });
  }

  updateGoal(value: number) {

    if (this.editModal) {
      this.receivedHabit.goal = value;
    } else {
      this.goal = value;
    }
  }

  updateFrequency(value: string) {

    if (this.editModal) {
      this.receivedHabit.Frequency = value;
    } else {
      this.frequency = value;
    }
  }

  deleteHabit(habit: Habit) {

    this.habitService.deleteHabit(habit);
    this.ref.close();
  }

  archiveHabit() {
    this.habitService.archiveHabit(this.receivedHabit);
    this.ref.close();
  }

  isEditModal() {
    return this.editModal;
  }

  checkIntervalPerDays(repeat: string) {
    if (this.editModal) {

      if (this.receivedHabit.repeat === repeat) {
        return true;
      }
    } else {
      if (this.intervalPerDays === repeat) {
        return true;
      }
    }
    return false;
  }

  onStartDateSelect(date: Date) {

    if (this.editModal) {
      this.receivedHabit.startDate = date;
    } else {
      this.selectedDate = date;
    }
  }

  private getHabitGoalValue(): number {
    switch (this.habitName) {
      case AppConstants.drinkWater:
        return this.goalWater;
      case AppConstants.running:
        return this.runningValue;
      case AppConstants.cycling:
        return this.cyclingValue;
      default:
        return this.goalValue;
    }
  }

  private getHabitFrequency(): string {
    switch (this.habitName) {
      case AppConstants.drinkWater:
        return this.waterFrequency;
      case AppConstants.running:
      case AppConstants.cycling:
        return this.runningFrequency;
      default:
        return this.goalFrequency;
    }
  }
}

import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { AppConstants, daysMapping, daysOfWeek, iconMap, TimeOfDay } from "../Constants/app-constant";
import { CalenderDisplayService } from "../Service/calender-display.service";
import { HabitService } from "../Service/habit.service";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Habit } from "../Data Types/habit";
import { TimeAndDayService } from "../Service/time-day.service";
import { Subscription } from "rxjs";
import { IntervalService } from "../Service/interval.service";
import { DeleteDialogueComponent } from "../delete-dialogue/delete-dialogue.component";
import { NavigationService } from "../Service/navigation.service";
import { MatMenuTrigger } from "@angular/material/menu";
import { AlertDialog } from "../alert-dialog/alert-dialog.component";
import * as _ from 'lodash';


@Component({
  selector: 'app-habit-modal-dialogue',
  templateUrl: './habit-modal-dialogue.component.html',
  styleUrls: ['./habit-modal-dialogue.component.scss']
})
export class HabitModalDialogueComponent implements OnInit, OnDestroy {

  @ViewChild('calender') calenderDialogue!: ElementRef;
  @ViewChild('habitDialog') habitDialog!: ElementRef;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  editModal: boolean = false;
  openMenuCheck: boolean = false;
  receivedHabit!: Habit;
  nameSelectCallback: ((value: boolean) => void) | null = null;
  daysSelectCallback: ((value: boolean) => void) | null = null;
  weekSelectCallback: ((value: boolean) => void) | null = null;
  intervalSelectCallback: ((value: boolean) => void) | null = null;
  timeDaySelectCallback: ((value: boolean) => void) | null = null;
  periodSelectCallback: ((value: boolean) => void) | null = null;
  runSelectCallback: ((value: boolean) => void) | null = null;
  drinkSelectCallback: ((value: boolean) => void) | null = null;
  monthSelectCallback: ((value: boolean) => void) | null = null;
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
  timeOfDay: TimeOfDay[] = [];
  showCalendar: boolean = false;
  startSelectedDate: Date = new Date();
  days: string[] = [];
  repeatDates!: Date[];
  isHabitDialogOpen = false;
  intervalPerDays!: string;
  months: string = AppConstants.months;
  checkRepeat: string = AppConstants.days;
  goalWater: number = AppConstants.goalWater;
  habitNameSelect: boolean = false;
  isClickedOnDeleteDialogue: boolean = false;
  isAlertOpen: boolean = false;
  habitDaysSelect: boolean = false;
  habitWeekSelect: boolean = false;
  habitIntervalSelect: boolean = false;
  habitPeriodSelect: boolean = false;
  timeDaySelect: boolean = false;
  runningSelect: boolean = false;
  drinkSelect: boolean = false;
  monthSelect: boolean = false;
  repeatValue!: string;
  matMenuTrigger!: MatMenuTrigger;
  firstDateOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  protected readonly AppConstants = AppConstants;
  private timeDaySubscription!: Subscription;
  private DaySubscription!: Subscription;
  private isClickedOnDeleteDialogueSubscription!: Subscription;
  private isAlertClickedSubscription!: Subscription;

  constructor(
    private ref: DynamicDialogRef,
    private displayService: CalenderDisplayService,
    private navigationService: NavigationService,
    private habitService: HabitService,
    private config: DynamicDialogConfig,
    private timeOfDayService: TimeAndDayService,
    private intervalService: IntervalService,
    private dialogService: DialogService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { habit: Habit, editModal: boolean }
  ) {
    this.receivedHabit = this.config.data?.habit;
    this.editModal = this.config.data?.editModal;
  }

  ngOnInit(): void {
    this.navigationService.addDialog(this.ref);
    setTimeout(() => {
      this.isHabitDialogOpen = true;
    }, 100);

    this.repeatDates = [this.firstDateOfMonth];
    this.timeOfDay = this.timeOfDayService.getTimeOfDay();
    this.timeDaySubscription = this.timeOfDayService.timeOfDay$.subscribe((data) => {
      this.timeOfDay = data;
    });
    this.DaySubscription = this.timeOfDayService.day$.subscribe((data) => {
      this.days = data;
    });

    const habit = this.receivedHabit;

    if (habit) {
      this.habitName = habit.name;
      this.goalValue = habit.goal;
      this.goalWater = habit.goal;
      this.goal = habit.goal;
      this.runningValue = habit.goal;
      this.cyclingValue = habit.goal;
      this.goalFrequency = habit.Frequency;
      this.runningFrequency = habit.Frequency;
      this.waterFrequency = habit.Frequency;
      this.frequency = habit.Frequency;
      this.frequencyPerPeriod = habit.frequencyPerPeriod;
      this.timeOfDay = _.cloneDeep(habit.timeOfDay);
      this.timeOfDayService.setTimeOfDay(this.timeOfDay);
      this.startSelectedDate = habit.startDate;
      if (habit.repeat == AppConstants.months) {
        this.repeatValue = AppConstants.months;
      } else {
        this.repeatValue = habit.repeat;
      }
    }
    if (this.receivedHabit) {
      this.intervalService.setReceivedHabit(this.receivedHabit);
      this.repeatDates = (this.receivedHabit.repeatDates.split(',') as string[]).map(dateString => {
        const match = dateString.match(/(\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2})/);
        return match ? new Date(match[0]) : null;
      }).filter((date): date is Date => date !== null);
    }
    this.isClickedOnDeleteDialogueSubscription = this.navigationService.isClickedOnDeleteDialogue$.subscribe((data) => {
      this.isClickedOnDeleteDialogue = data;
    });
  }

  close() {
    if (this.editModal && this.checkDifferenceBetweenHabits()) {
      this.openAlertDialog();
    } else if (this.habitName && !this.editModal) {
      this.openAlertDialog();
    } else {
      this.ref.close();
    }
  }

  checkDifferenceBetweenHabits(): boolean {
    if (this.repeatValue == AppConstants.months) {
      if (this.receivedHabit.repeatDates != this.repeatDates.toString()) {
        return true;
      }
    }
    return this.habitName != this.receivedHabit.name || this.goal != this.receivedHabit.goal || this.frequency != this.receivedHabit.Frequency || this.frequencyPerPeriod != this.receivedHabit.frequencyPerPeriod || this.repeatValue != this.receivedHabit.repeat || this.startSelectedDate != this.receivedHabit.startDate || this.timeOfDay.toString() != this.receivedHabit.timeOfDay.toString();
  }

  openMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }

  closeMenu(menuTrigger: MatMenuTrigger) {
    this.matMenuTrigger = menuTrigger;
    setTimeout(() => {
      if (!this.openMenuCheck) {
        menuTrigger.closeMenu();
      }
    }, 10);
  }


  updateOpenMenuCheck(value: boolean) {
    this.openMenuCheck = value;
    this.closeMenu(this.matMenuTrigger);

  }

  openAlertDialog() {
    this.isAlertOpen = true;
    if (!this.isWaterOrRunningOrCycling() && this.goalFrequency == 'Mins') {
      this.goalValue = this.goal = 5;
    }
    const dialogRef = this.dialog.open(AlertDialog, {
      width: '448px',
      disableClose: true,
    });
    dialogRef.updatePosition({top: '0', left: '737px'});
    dialogRef.afterClosed().subscribe(result => {
      this.isAlertOpen = false;
      if (this.intervalService.getIsAlertClicked()) {
        this.ref.close();
      }

    });
  }

  sendSelectedDates(): Date[] {
    if (this.editModal) {
      // return this.receivedHabit.repeatDates;
      return (this.receivedHabit.repeatDates.split(',') as string[]).map(dateString => {
        const match = dateString.match(/(\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2})/);
        return match ? new Date(match[0]) : null;
      }).filter((date): date is Date => date !== null);
    } else {
      return this.repeatDates;
    }
  }

  getHabitNameSelect(): Promise<boolean> {
    return new Promise((resolve) => {
      this.nameSelectCallback = resolve;
    });
  }

  getHabitMonthSelect(): Promise<boolean> {
    return new Promise((resolve) => {
      this.monthSelectCallback = resolve;
    });
  }

  getHabitDrinkSelect(): Promise<boolean> {
    return new Promise((resolve) => {
      this.drinkSelectCallback = resolve;
    });
  }

  getHabitRunSelect(): Promise<boolean> {
    return new Promise((resolve) => {
      this.runSelectCallback = resolve;
    });
  }

  getHabitPeriodSelect(): Promise<boolean> {
    return new Promise((resolve) => {
      this.periodSelectCallback = resolve;
    });
  }

  getHabitTimeDaySelect(): Promise<boolean> {
    return new Promise((resolve) => {
      this.timeDaySelectCallback = resolve;
    });
  }

  getHabitIntervalSelect(): Promise<boolean> {
    return new Promise((resolve) => {
      this.intervalSelectCallback = resolve;
    });
  }

  getHabitDaysSelect(): Promise<boolean> {
    return new Promise((resolve) => {
      this.daysSelectCallback = resolve;
    });
  }

  getHabitWeeksSelect(): Promise<boolean> {
    return new Promise((resolve) => {
      this.weekSelectCallback = resolve;
    });
  }

  updateHabitNameSelect(value: boolean) {
    this.habitNameSelect = value;
    this.invokeHabitNameSelectCallback(value);
  }

  updateHabitMonthSelect(value: boolean) {
    this.monthSelect = value;
    this.invokeHabitMonthSelectCallback(value);
  }

  updateHabitDrinkSelect(value: boolean) {
    this.drinkSelect = value;
    this.invokeHabitDrinkSelectCallback(value);
  }

  updateHabitRunSelect(value: boolean) {
    this.runningSelect = value;
    this.invokeHabitRunSelectCallback(value);
  }

  updateHabitPeriodSelect(value: boolean) {
    this.habitPeriodSelect = value;
    this.invokeHabitPeriodSelectCallback(value);
  }

  updateHabitTimeDaySelect(value: boolean) {
    this.timeDaySelect = value;
    this.invokeHabitTimeDaySelectCallback(value);
  }

  updateHabitIntervalSelect(value: boolean) {
    this.habitIntervalSelect = value;
    this.invokeHabitIntervalSelectCallback(value);
  }

  updateHabitWeekSelect(value: boolean) {
    this.habitWeekSelect = value;
    this.invokeHabitWeekSelectCallback(value);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const isHabitDialogClick = this.habitDialog?.nativeElement.contains(event.target);

    if (!isHabitDialogClick && this.isHabitDialogOpen && !this.isClickedOnDeleteDialogue && !this.isAlertOpen) {
      const promises = [
        this.getHabitNameSelect(),
        this.getHabitDaysSelect(),
        this.getHabitWeeksSelect(),
        this.getHabitIntervalSelect(),
        this.getHabitTimeDaySelect(),
        this.getHabitPeriodSelect(),
        this.getHabitRunSelect(),
        this.getHabitDrinkSelect(),
        this.getHabitMonthSelect()
      ];
      Promise.all(promises).then(
        ([
           habitItemSelect,
           habitDaysSelect,
           habitWeeksSelect,
           habitIntervalSelect,
           habitTimeDaySelect,
           habitPeriodSelect,
           habitRunSelect,
           habitDrinkSelect,
           habitMonthSelect
         ]) => {
          if (
            !habitItemSelect &&
            !habitDaysSelect &&
            !habitWeeksSelect &&
            !habitIntervalSelect &&
            !habitTimeDaySelect &&
            !habitPeriodSelect &&
            !habitRunSelect &&
            !habitDrinkSelect &&
            !habitMonthSelect
          ) {
            this.close();
          }
        }
      );
    }
  }

  getIconSource(): string {
    return iconMap[this.habitName] || 'assets/svg/mark.svg';
  }

  updateIntervalPerDays(selectedInterval: string) {

    if (this.editModal) {
      this.repeatValue = selectedInterval;
      if (this.receivedHabit) {
        this.intervalService.setReceivedHabit(this.receivedHabit);
      }
      this.checkRepeat = AppConstants.interval;
      this.intervalPerDays = selectedInterval;
      this.intervalService.setIntervalPerDays(this.intervalPerDays);

    } else {

      this.intervalPerDays = selectedInterval;
      this.repeatValue = selectedInterval;
      this.checkRepeat = AppConstants.interval;
      this.intervalService.setIntervalPerDays(this.intervalPerDays);
    }
  }

  toggleDay(day: string): void {
    const allDays = Object.values(daysOfWeek);

    if (this.editModal) {
      let daysArray: string[] = [];

      if (this.repeatValue === AppConstants.Daily) {
        daysArray = [...allDays];
      } else {
        daysArray = [allDays[1]];

        const isValidRepeat = this.repeatValue
          .split(',')
          .map(day => day.trim())
          .some(day => Object.keys(daysMapping).includes(day) || Object.values(daysMapping).includes(day));

        if (isValidRepeat) {
          daysArray = this.repeatValue.split(',').map(day => daysMapping[day.trim()]);
        }
      }
      daysArray = this.updateDaysArray(day, daysArray);
      this.checkRepeat = AppConstants.days;
      this.repeatValue = this.getRepeatValueForDays(allDays, daysArray);
      if (this.receivedHabit) {
        this.intervalService.setReceivedHabit(this.receivedHabit);
      }
    } else {
      this.days = this.updateDaysArray(day, this.days);
      this.timeOfDayService.setDay(this.days);
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
      if (this.receivedHabit) {
        this.intervalService.setReceivedHabit(this.receivedHabit);
      }
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
    } else if (repeatValue === AppConstants.months) {
      // If repeatValue contains a forward slash, assume it's a date
      return AppConstants.months;
    } else {
      // If none of the above conditions are met, assume it's an interval
      return AppConstants.interval;
    }
  }

  containsDaysOfWeek(repeatValue: string): boolean {
    return [...Object.keys(daysMapping), ...Object.values(daysMapping)].some(day => repeatValue.includes(day));
  }

  getDayValue(): string {
    if (this.editModal) {
      return this.getDayValueForEditModal();
    } else {
      return this.getDayValueForNonEditModal();
    }
  }

  getDayValueForEditModal(): string {

    this.checkRepeat = this.inferCheckRepeat(this.repeatValue);

    if (this.checkRepeat === AppConstants.days) {
      return this.getDayValueForDays();
    } else if (this.checkRepeat === AppConstants.interval) {
      return this.repeatValue as string;
    } else {
      this.receivedHabit.repeat = this.repeatDates.toString();
      if (this.receivedHabit) {
        this.intervalService.setReceivedHabit(this.receivedHabit);
      }
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
    if (this.repeatValue) {
      if (this.repeatValue.includes(',')) {
        return this.repeatValue === AppConstants.Daily
          ? AppConstants.Daily
          : this.getAbbreviatedDays();
      } else {
        return this.repeatValue;
      }
    } else {
      return this.repeatValue as string;
    }
  }


  // Returns the abbreviated days like 'Mon, Tue, Wed'
  getAbbreviatedDays(): string {

    const dayArray = (this.repeatValue).split(',');
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
    const selectedDays = (days ?? []).map(day => day.substring(0, 3));
    return selectedDays.join(',');
  }


  getRepeatValueForMonths(): string {
    this.repeatValue = this.months as string;
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
    this.timeOfDayService.setTimeOfDay(this.timeOfDay);
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

    const index = this.repeatDates.findIndex(date =>
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()
    );

    if (!this.editModal) {
      this.handleDateSelection(index, selectedDate);
    } else {
      // this.repeatDates = this.receivedHabit.repeatDates;
      this.repeatDates = (this.receivedHabit.repeatDates.split(',') as string[]).map(dateString => {
        const match = dateString.match(/(\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2})/);
        return match ? new Date(match[0]) : null;
      }).filter((date): date is Date => date !== null);

      this.handleDateSelection(index, selectedDate);
      this.receivedHabit.repeat = AppConstants.months;
    }
    this.repeatValue = AppConstants.months;
    this.checkRepeat = AppConstants.months;
  }

  updateHabitName(value: string) {
    this.habitDialog.nativeElement.click();
    if (this.editModal) {
      this.receivedHabit.name = value;
      if (this.receivedHabit) {
        this.intervalService.setReceivedHabit(this.receivedHabit);
      }
    } else {
      this.habitName = value;
    }
  }

  updateWaterGoalFrequency(times: string) {
    if (this.editModal) {
      this.receivedHabit.Frequency = times;
      if (this.receivedHabit) {
        this.intervalService.setReceivedHabit(this.receivedHabit);
      }
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
      if (this.receivedHabit) {
        this.intervalService.setReceivedHabit(this.receivedHabit);
      }
    } else {
      this.runningFrequency = value;
    }
  }

  saveHabit() {
    if (this.checkRepeat == AppConstants.interval) {
      this.intervalService.setIntervalPerDays(this.intervalPerDays);
    }
    if (this.editModal) {
      this.receivedHabit.name = this.habitName;
      this.receivedHabit.goal = this.goal;
      this.receivedHabit.startDate = this.startSelectedDate;
      this.receivedHabit.Frequency = this.frequency;
      this.receivedHabit.frequencyPerPeriod = this.frequencyPerPeriod;
      this.receivedHabit.repeat = this.repeatValue;
      this.receivedHabit.timeOfDay = this.timeOfDay;
      console.log(this.receivedHabit.timeOfDay);

      if (this.receivedHabit.repeat == AppConstants.months) {
        this.receivedHabit.repeatDates = this.repeatDates.toString();
      }
      this.habitService.updateHabit(this.receivedHabit);

    } else {
      // Set goal if not provided
      this.goal = this.goal || this.getHabitGoalValue();
      if (this.goalFrequency == 'Mins') {
        if (this.goal < 5) {
          this.goal = 5;
        }
      }
      // Set frequency if not provided
      this.frequency = this.frequency || this.getHabitFrequency();

      if (this.repeatValue != AppConstants.months) {
        this.repeatDates = [this.firstDateOfMonth];

      }
      // Add habit to the service
      this.habitService.addHabit(this.habitName, this.goal, this.frequency, this.frequencyPerPeriod, this.repeatValue, this.timeOfDay, this.startSelectedDate, this.repeatDates.toString());
    }
    // Close the dialog
    this.ref.close();
  }

  onGoalChange(value: number) {
    if (this.goalFrequency == 'Mins') {
      if (value < 5) {
        value = 5;
      }
    }
    setTimeout(() => {
      this.updateGoal(value);
    });
  }

  updateGoal(value: number) {
    this.goal = value;
  }

  updateFrequency(value: string) {
    this.frequency = value;
  }

  deleteHabit(habit: Habit) {
    this.navigationService.setIsClickedOnDeleteDialogue(true);
    const ref = this.dialogService.open(DeleteDialogueComponent,
      {
        width: '450px',
        height: '128px',
        data: {
          habit: habit,
        }
      });
    ref.onClose.subscribe(() => {
      setTimeout(() => {
        this.navigationService.setIsClickedOnDeleteDialogue(false);
      }, 100);
    });
  }

  archiveHabit() {
    if (!this.checkDifferenceBetweenHabits()) {
      this.habitService.toggleArchiveHabit(this.receivedHabit, true);
      this.ref.close();
    } else {
      this.openAlertDialog();
    }
  }

  unArchiveHabit() {
    this.habitService.toggleArchiveHabit(this.receivedHabit, false);
    this.ref.close();
  }

  isEditModal() {
    return this.editModal;
  }

  isEditModalAndIsArchived() {
    return this.editModal && this.receivedHabit.isArchived;
  }

  isEditModalAndIsNotArchived() {
    return this.editModal && !this.receivedHabit.isArchived;
  }

  onStartDateSelect(date: Date) {
    this.startSelectedDate = date;
  }

  updateHabitDaysSelect(value: boolean) {
    this.habitDaysSelect = value;
    this.invokeHabitDaysSelectCallback(value);
  }

  ngOnDestroy() {
    if (this.timeDaySubscription) {
      this.timeDaySubscription.unsubscribe();
    }
    if (this.DaySubscription) {
      this.DaySubscription.unsubscribe();
    }
    if (this.isClickedOnDeleteDialogueSubscription) {
      this.isClickedOnDeleteDialogueSubscription.unsubscribe();
    }
    if (this.isAlertClickedSubscription) {
      this.isAlertClickedSubscription.unsubscribe();
    }
  }

  private handleDateSelection(index: number, selectedDate: Date): void {
    if (index === -1) {
      // Date doesn't exist, add it
      this.repeatDates.push(selectedDate);
    } else if (this.repeatDates.length > 1) {
      // Date exists, remove it if there's more than one date
      this.repeatDates.splice(index, 1);
    }
  }

  private invokeHabitNameSelectCallback(value: boolean) {
    if (this.nameSelectCallback) {
      const callback = this.nameSelectCallback;
      this.nameSelectCallback = null;
      setTimeout(() => {
        callback(value);
      });
    }
  }

  private invokeHabitIntervalSelectCallback(value: boolean) {
    if (this.intervalSelectCallback) {
      const callback = this.intervalSelectCallback;
      this.intervalSelectCallback = null;
      setTimeout(() => {
        callback(value);
      });
    }
  }

  private invokeHabitWeekSelectCallback(value: boolean) {
    if (this.weekSelectCallback) {
      const callback = this.weekSelectCallback;
      this.weekSelectCallback = null;
      setTimeout(() => {
        callback(value);
      });
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

  private invokeHabitDaysSelectCallback(value: boolean) {
    if (this.daysSelectCallback) {
      const callback = this.daysSelectCallback;
      this.daysSelectCallback = null;
      setTimeout(() => {
        callback(value);
      });
    }
  }

  private invokeHabitTimeDaySelectCallback(value: boolean) {
    if (this.timeDaySelectCallback) {
      const callback = this.timeDaySelectCallback;
      this.timeDaySelectCallback = null;
      setTimeout(() => {
        callback(value);
      });
    }
  }

  private invokeHabitRunSelectCallback(value: boolean) {
    if (this.runSelectCallback) {
      const callback = this.runSelectCallback;
      this.runSelectCallback = null;
      setTimeout(() => {
        callback(value);
      });
    }
  }

  private invokeHabitPeriodSelectCallback(value: boolean) {
    if (this.periodSelectCallback) {
      const callback = this.periodSelectCallback;
      this.periodSelectCallback = null;
      setTimeout(() => {
        callback(value);
      });
    }
  }

  private invokeHabitDrinkSelectCallback(value: boolean) {
    if (this.drinkSelectCallback) {
      const callback = this.drinkSelectCallback;
      this.drinkSelectCallback = null;
      setTimeout(() => {
        callback(value);
      });
    }
  }

  private invokeHabitMonthSelectCallback(value: boolean) {
    if (this.monthSelectCallback) {
      const callback = this.monthSelectCallback;
      this.monthSelectCallback = null;
      setTimeout(() => {
        callback(value);
      });
    }
  }
}

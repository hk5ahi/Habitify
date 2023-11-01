import { Injectable } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { AppConstants, TimeOfDay } from "../Constants/app-constant";
import { BehaviorSubject } from "rxjs";
import { NavigationService } from "./navigation.service";

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  public habitSubject: BehaviorSubject<Habit[]> = new BehaviorSubject<Habit[]>([]);
  private habits: Habit[] = [];

  constructor(private navService: NavigationService) {
    this.loadHabitsFromLocalStorage();
  }

  addHabit(habit: string, goal: number, frequency: string, frequencyPerPeriod: string, repeat: string, timeOfDay: TimeOfDay[], startDate: Date) {
    const newHabit: Habit = {
      id: this.habits.length + 1,
      name: habit,
      goal: goal,
      Frequency: frequency,
      frequencyPerPeriod: frequencyPerPeriod,
      timeOfDay: timeOfDay,
      repeat: repeat,
      startDate: startDate,
      isArchived: false,
      isCompleted: false,
      isSkipped: false,
      isFailed: false,
      showLogValueBar: false,
      showOverLayPanel: false,
      showProgressView: false,
      goalProgress: 0
    };

    this.habits.push(newHabit);
    this.habitSubject.next(this.habits);
    this.saveHabitsToLocalStorage();
  }

  deleteHabit(habit: Habit) {
    this.habits = this.habits.filter((h: Habit) => h.id !== habit.id);
    this.habitSubject.next(this.habits);
    this.saveHabitsToLocalStorage();
  }

  toggleArchiveHabit(habit: Habit, value: boolean) {
    const index = this.habits.findIndex((h: Habit) => h.id === habit.id);
    this.habits[index].isArchived = value;
    this.habitSubject.next(this.habits);
    this.saveHabitsToLocalStorage();
  }


  updateHabit(receivedHabit: Habit) {
    const index = this.habits.findIndex((h: Habit) => h.id === receivedHabit.id);

    if (index !== -1) {
      // Update the properties of the existing object
      this.habits[index].name = receivedHabit.name;
      this.habits[index].goal = receivedHabit.goal;
      this.habits[index].Frequency = receivedHabit.Frequency;
      this.habits[index].frequencyPerPeriod = receivedHabit.frequencyPerPeriod;
      this.habits[index].timeOfDay = receivedHabit.timeOfDay;
      this.habits[index].repeat = receivedHabit.repeat;
      this.habits[index].startDate = receivedHabit.startDate;
      this.habits[index].isArchived = receivedHabit.isArchived;
      this.habits[index].goalProgress = receivedHabit.goalProgress;
      // Notify subscribers about the change
      this.habitSubject.next(this.habits);
      // Save updated habits to localStorage
      this.saveHabitsToLocalStorage();
    }
  }

  toggleCompleteHabit(habit: Habit, status: boolean) {
    const index = this.habits.findIndex((h: Habit) => h.id === habit.id);
    this.habits[index].isCompleted = status;
    this.habitSubject.next(this.habits);
    this.saveHabitsToLocalStorage();
  }

  toggleSkipHabit(habit: Habit, status: boolean) {
    const index = this.habits.findIndex((h: Habit) => h.id === habit.id);
    this.habits[index].isSkipped = status;
    this.habitSubject.next(this.habits);
    this.saveHabitsToLocalStorage();
  }

  toggleFailHabit(habit: Habit, status: boolean) {
    const index = this.habits.findIndex((h: Habit) => h.id === habit.id);
    this.habits[index].isFailed = status;
    this.habitSubject.next(this.habits);
    this.saveHabitsToLocalStorage();
  }

  updateTimeOfDay(habit: Habit, timeOfDay: TimeOfDay) {
    const index = this.habits.findIndex((h: Habit) => h.id === habit.id);
    this.habits[index].timeOfDay = [];
    this.habits[index].timeOfDay.push(timeOfDay);
    this.habitSubject.next(this.habits);
    this.saveHabitsToLocalStorage();
  }

  toggleLogValueBar() {
    this.habits.forEach((habit: Habit) => {
      habit.showLogValueBar = false;
    });
  }

  filterHabitsByStartDate(habits: Habit[]): Habit[] {
    return habits.filter(habit => {
      return (
        (habit.repeat.toLowerCase() === 'daily' && this.isAfterStartDate(habit)) ||
        this.doesRepeatMatchEvery(habit) ||
        this.doesRepeatMatchSpecific(habit)
      );
    });
  }

  filterHabitsBySearch(habits: Habit[], searchValue: string): Habit[] {
    let filteredHabits: Habit[] = [];

    if (searchValue) {
      const lowerCaseSearch = searchValue.toLowerCase();
      filteredHabits = habits.filter(habit =>
        habit.name.toLowerCase().includes(lowerCaseSearch)
      );
    } else {
      return habits;
    }
    return filteredHabits;
  }

  isHabitsCompleted(habits: Habit[]): boolean {

    let filteredHabits = this.filterHabitsByStartDate(habits);
    let searchValue = this.navService.getHabitSearchValue();
    let searchHabits = this.filterHabitsBySearch(filteredHabits, searchValue);
    return searchHabits.some(habit => habit.isCompleted);
  }

  getCompletedHabitsCount(habits: Habit[]): number {
    let filteredHabits = this.filterHabitsByStartDate(habits);
    let searchValue = this.navService.getHabitSearchValue();
    let searchHabits = this.filterHabitsBySearch(filteredHabits, searchValue);
    return searchHabits.filter(habit => habit.isCompleted).length;
  }

  isHabitsSkipped(habits: Habit[]): boolean {
    let filteredHabits = this.filterHabitsByStartDate(habits);
    let searchValue = this.navService.getHabitSearchValue();
    let searchHabits = this.filterHabitsBySearch(filteredHabits, searchValue);
    return searchHabits.some(habit => habit.isSkipped);
  }

  getSkippedHabitsCount(habits: Habit[]): number {
    let filteredHabits = this.filterHabitsByStartDate(habits);
    let searchValue = this.navService.getHabitSearchValue();
    let searchHabits = this.filterHabitsBySearch(filteredHabits, searchValue);
    return searchHabits.filter(habit => habit.isSkipped).length;
  }

  isHabitsFailed(habits: Habit[]): boolean {
    let filteredHabits = this.filterHabitsByStartDate(habits);
    let searchValue = this.navService.getHabitSearchValue();
    let searchHabits = this.filterHabitsBySearch(filteredHabits, searchValue);
    return searchHabits.some(habit => habit.isFailed);
  }

  getFailedHabitsCount(habits: Habit[]): number {
    let filteredHabits = this.filterHabitsByStartDate(habits);
    let searchValue = this.navService.getHabitSearchValue();
    let searchHabits = this.filterHabitsBySearch(filteredHabits, searchValue);
    return searchHabits.filter(habit => habit.isFailed).length;
  }

  sortHabits(habits: Habit[], text: string, unsorted: Habit[]): Habit[] {

    if (text == 'A-Z') {
      return [...habits].sort((a, b) => (a.name > b.name) ? 1 : -1);
    } else if (text == 'Z-A') {
      return [...habits].sort((a, b) => (a.name < b.name) ? 1 : -1);
    } else {
      return unsorted;
    }
  }

  sendHabits(habits: Habit[]): Habit[] {
    let filteredHabits = this.filterHabitsByStartDate(habits);
    let searchValue = this.navService.getHabitSearchValue();
    let searchHabits = this.filterHabitsBySearch(filteredHabits, searchValue);
    return searchHabits.filter(habit => !habit.isCompleted && !habit.isSkipped && !habit.isFailed);
  }

  sendCompletedHabits(habits: Habit[]): Habit[] {
    let filteredHabits = this.filterHabitsByStartDate(habits);
    let searchValue = this.navService.getHabitSearchValue();
    let searchHabits = this.filterHabitsBySearch(filteredHabits, searchValue);
    return searchHabits.filter(habit => habit.isCompleted);
  }

  sendSkippedHabits(habits: Habit[]): Habit[] {
    let filteredHabits = this.filterHabitsByStartDate(habits);
    let searchValue = this.navService.getHabitSearchValue();
    let searchHabits = this.filterHabitsBySearch(filteredHabits, searchValue);
    return searchHabits.filter(habit => habit.isSkipped);
  }

  sendFailedHabits(habits: Habit[]): Habit[] {
    let filteredHabits = this.filterHabitsByStartDate(habits);
    let searchValue = this.navService.getHabitSearchValue();
    let searchHabits = this.filterHabitsBySearch(filteredHabits, searchValue);
    return searchHabits.filter(habit => habit.isFailed);
  }

  hasHabits(habits: Habit[]): boolean {

    let filteredHabits = this.filterHabitsByStartDate(habits);
    let searchValue = this.navService.getHabitSearchValue();
    let searchHabits = this.filterHabitsBySearch(filteredHabits, searchValue);
    return searchHabits.length > 0;
  }

  updateShowProgress(habit: Habit) {
    this.habits.forEach((h: Habit) => {
      h.showProgressView = false;
    });
    const index = this.habits.findIndex((h: Habit) => h.id === habit.id);
    this.habits[index].showProgressView = !this.habits[index].showProgressView;
    this.habitSubject.next(this.habits);
    this.saveHabitsToLocalStorage();

    return this.habits[index];
  }

  // Check if the selected date is after the habit start date
  private isAfterStartDate(habit: Habit): boolean {
    let selectedDate = this.navService.getSelectedDateValue();

    // Extract year, month, and day from habit.startDate and selectedDate
    const habitStartDate = new Date(habit.startDate);
    const selectedDateWithoutTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    const habitStartDateWithoutTime = new Date(
      habitStartDate.getFullYear(),
      habitStartDate.getMonth(),
      habitStartDate.getDate()
    );
    // Compare the extracted components without considering time
    return selectedDateWithoutTime >= habitStartDateWithoutTime;
  }


  private doesRepeatMatchEvery(habit: Habit): boolean {
    const repeatFrequency = habit.repeat.toLowerCase();
    let selectedDate = this.navService.getSelectedDateValue();
    if (repeatFrequency.includes('every')) {
      const everyIndex = repeatFrequency.indexOf('every');
      const repeatInterval = parseInt(repeatFrequency.slice(everyIndex + 5).trim(), 10);
      // Calculate the expected repeat date based on the repeat interval
      const startDate = new Date(habit.startDate);
      const daysDifference = Math.floor((selectedDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
      // Check if the difference in days is a multiple of the repeat interval or it's the start date
      return (daysDifference >= 0) && (daysDifference % repeatInterval === 0);
    }
    return false;
  }

  private doesRepeatMatchSpecific(habit: Habit): boolean {
    const repeatFrequency = habit.repeat.toLowerCase();
    let selectedDate = this.navService.getSelectedDateValue();
    const repeatDates = repeatFrequency.split(',');
    const repeatDateObjects = repeatDates.map(dateStr => new Date(dateStr.trim()));

    return repeatDateObjects.some(repeatDate => {
      if (isNaN(repeatDate.getTime()) || isNaN(selectedDate.getTime())) {
        // Invalid date, handle error
        return false;
      }

      const repeatDateUTC = new Date(repeatDate.toISOString());
      const selectedDateUTC = new Date(selectedDate.toISOString());

      return (
        selectedDateUTC.getUTCFullYear() === repeatDateUTC.getUTCFullYear() &&
        selectedDateUTC.getUTCMonth() === repeatDateUTC.getUTCMonth() &&
        selectedDateUTC.getUTCDate() === repeatDateUTC.getUTCDate()
      );
    });
  }

  private loadHabitsFromLocalStorage(): void {
    const storedHabits = localStorage.getItem(AppConstants.habitsKey);
    if (storedHabits) {
      this.habits = JSON.parse(storedHabits);
      this.habitSubject.next(this.habits);
    }
  }

  private saveHabitsToLocalStorage(): void {
    localStorage.setItem(AppConstants.habitsKey, JSON.stringify(this.habits));
  }
}

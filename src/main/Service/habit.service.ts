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

  addHabit(habit: string, goal: number, frequency: string, frequencyPerPeriod: string, repeat: string, timeOfDay: TimeOfDay[], startDate: Date, repeatDates: string) {

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
      goalProgress: 0,
      repeatDates: repeatDates,
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
    if (!this.habits[index].isSkipped && !this.habits[index].isFailed) {
      this.habits[index].isCompleted = status;
      this.habitSubject.next(this.habits);
      this.saveHabitsToLocalStorage();
    }
  }

  toggleSkipHabit(habit: Habit, status: boolean) {
    const index = this.habits.findIndex((h: Habit) => h.id === habit.id);
    if (!this.habits[index].isCompleted && !this.habits[index].isFailed) {
      this.habits[index].isSkipped = status;
      this.habitSubject.next(this.habits);
      this.saveHabitsToLocalStorage();
    }
    if (this.habits[index].goalProgress >= this.habits[index].goal && !this.habits[index].isSkipped) {
      this.habits[index].isCompleted = true;
      this.habitSubject.next(this.habits);
      this.saveHabitsToLocalStorage();
    }
  }

  toggleFailHabit(habit: Habit, status: boolean) {
    const index = this.habits.findIndex((h: Habit) => h.id === habit.id);
    if (!this.habits[index].isSkipped && !this.habits[index].isCompleted) {
      this.habits[index].isFailed = status;
      this.habitSubject.next(this.habits);
      this.saveHabitsToLocalStorage();
    }
    if (this.habits[index].goalProgress >= this.habits[index].goal && !this.habits[index].isFailed) {
      this.habits[index].isCompleted = true;
      this.habitSubject.next(this.habits);
      this.saveHabitsToLocalStorage();
    }
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
        (habit.repeat && habit.repeat.toLowerCase() === 'daily' && this.isAfterStartDate(habit)) ||
        this.doesRepeatMatchEvery(habit) ||
        this.doesRepeatMatchSpecific(habit) || this.doesRepeatMatchDays(habit)
      );
    });
  }

  doesRepeatMatchDays(habit: Habit): boolean {
    const selectedDate = this.navService.getSelectedDateValue();
    const selectedDay = selectedDate.toLocaleDateString('en-US', {weekday: 'short'});
    const habitDays = habit.repeat.split(',').map(day => day.trim().slice(0, 3)); // Take the first 3 characters
    return habitDays.includes(selectedDay);
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

  closeProgressView(habit: Habit) {
    this.habits.forEach((otherHabit) => {
      if (habit.id !== otherHabit.id && otherHabit.showProgressView) {
        otherHabit.showProgressView = false;
      }
    });
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
    if (habit.repeat) {

      const repeatFrequency = habit.repeat.toLowerCase();
      let selectedDate = this.navService.getSelectedDateValue();
      if (repeatFrequency.includes('every')) {
        const everyIndex = repeatFrequency.indexOf('every');
        const repeatInterval = parseInt(repeatFrequency.slice(everyIndex + 5).trim(), 10);

        // Calculate the expected repeat date based on the repeat interval
        const startDate = new Date(habit.startDate);
        const daysDifference = Math.floor((selectedDate.getDate() - startDate.getDate()));
        // Check if the difference in days is a multiple of the repeat interval or it's the start date
        return (daysDifference >= 0) && (daysDifference % repeatInterval === 0);
      }
    }
    return false;
  }

  private doesRepeatMatchSpecific(habit: Habit): boolean {
    const datePattern = /[a-zA-Z]{3} [a-zA-Z]{3} \d{1,2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \(.*\)/;
    const selectedDate = this.navService.getSelectedDateValue();

    if (habit.repeat) {
      // Check if habit repeats on the 1st of the month
      const repeatsOnFirst = habit.repeat.toLowerCase().includes('1st');

      // Check if habit.repeat is not equal to "Every month on 1st"
      if (repeatsOnFirst && habit.repeat.toLowerCase() !== 'every month on 1st') {
        // Split the string into an array of date strings
        const repeatDates = habit.repeatDates.split(',');

        // Check if at least one date in the array matches the pattern
        if (repeatDates.some(date => datePattern.test(date))) {
          // Convert each date string to a Date object and check for a match
          return repeatDates.some(dateStr => {
            const date = new Date(dateStr);
            return (
              date.getFullYear() === selectedDate.getFullYear() &&
              date.getMonth() === selectedDate.getMonth() &&
              date.getDate() === selectedDate.getDate()
            );
          });
        }
      }
    }

    return false;
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

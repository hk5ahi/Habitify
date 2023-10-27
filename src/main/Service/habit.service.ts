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
      showOverLayPanel: false
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
    let selectedDate = this.navService.getSelectedDateValue();

    // Check if the selected date is after the habit start date
    const isAfterStartDate = (habit: Habit) => {
      const habitStartDate = new Date(habit.startDate);
      return selectedDate >= habitStartDate;
    };

    // Check if the selected date matches the repeat day of the habit
    const doesRepeatMatch = (habit: Habit) => {
      const repeatDay = habit.repeat.toLowerCase();
      return repeatDay && selectedDate.toLocaleString('en-us', { weekday: 'long' }).toLowerCase() === repeatDay;
    };

    return habits.filter(habit => {
      // Assuming habit.startDate is a Date object

      // Check if the habit is visible based on repeat and start date
      return (habit.repeat.toLowerCase() === 'daily' && isAfterStartDate(habit)) ||
        (doesRepeatMatch(habit) && isAfterStartDate(habit));
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
      // console.log(habits);
      return habits;
    }
    // console.log(filteredHabits);
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

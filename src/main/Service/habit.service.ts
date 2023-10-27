import { Injectable } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { AppConstants, TimeOfDay } from "../Constants/app-constant";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  public habitSubject: BehaviorSubject<Habit[]> = new BehaviorSubject<Habit[]>([]);
  private habits: Habit[] = [];

  constructor() {
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

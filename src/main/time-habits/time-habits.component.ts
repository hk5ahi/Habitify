import { Component, OnDestroy, OnInit } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { Subscription } from "rxjs";
import { HabitService } from "../Service/habit.service";
import { NavigationService } from "../Service/navigation.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-time-habits',
  templateUrl: './time-habits.component.html',
  styleUrls: ['./time-habits.component.scss']
})
export class TimeHabitsComponent implements OnInit, OnDestroy {

  habits: Habit[] = [];
  currentTimeOfDay!: string;
  private habitsSubscription!: Subscription;
  private timeOfDaySubscription!: Subscription;

  constructor(private habitService: HabitService, private navigationService: NavigationService, private titleService: Title) {
  }

  ngOnInit(): void {
    this.timeOfDaySubscription = this.navigationService.timeOfDay$.subscribe((timeOfDay) => {
      this.currentTimeOfDay = timeOfDay;
    });
    this.habitsSubscription = this.habitService.habitSubject.subscribe((habits: Habit[]) => {
      // Filter habits with isArchived === false
      this.habits = habits.filter(habit =>
        habit.timeOfDay.some(time => time === this.currentTimeOfDay) && !habit.isArchived
      );
    });
  }

  ngOnDestroy() {
    if (this.habitsSubscription) {
      this.habitsSubscription.unsubscribe();
    }
    if (this.timeOfDaySubscription) {
      this.timeOfDaySubscription.unsubscribe();
    }
  }
}

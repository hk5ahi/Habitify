import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { SidebarService } from "../Service/sidebar.service";
import { Subscription } from "rxjs";
import { AppConstants, TimeOfDay } from "../Constants/app-constant";
import { Habit } from "../Data Types/habit";
import { HabitService } from "../Service/habit.service";

@Component({
  selector: 'app-manage-habits-sidebar',
  templateUrl: './manage-habits-sidebar.component.html',
  styleUrls: ['./manage-habits-sidebar.component.scss']
})
export class ManageHabitsSidebarComponent implements OnInit, OnDestroy {

  showManageHabits!: boolean;
  selectedItem!: string;
  showManageHabitsSubscription!: Subscription;
  habitsSubscription!: Subscription;
  habits: Habit[] = [];
  filterHabits: Habit[] = [];
  protected readonly AppConstants = AppConstants;
  protected readonly TimeOfDay = TimeOfDay;

  constructor(private sidebarService: SidebarService, private habitService: HabitService,private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.showManageHabitsSubscription = this.sidebarService.showManageHabits$.subscribe(value => {
      this.showManageHabits = value;
    });
    this.habitsSubscription = this.habitService.habitSubject.subscribe((habits: Habit[]) => {
      // Filter habits with isArchived === false
      this.habits = habits;
    });
    this.selectedItem = AppConstants.active;

  }

  updateSelectedItem(item: string) {
    this.selectedItem = item;
    this.sendHabits();

  }

  getLengthOfActiveHabits(): number {
    const activeHabits = this.habits.filter(habit => !habit.isArchived);
    return activeHabits.length;
  }

  getLengthOfArchiveHabits(): number {
    const activeHabits = this.habits.filter(habit => habit.isArchived);
    return activeHabits.length;
  }

  getLengthOfAnyTimeHabits(): number {
    const requiredTimeOfDayValues = [TimeOfDay.Morning, TimeOfDay.Afternoon, TimeOfDay.Evening];
    const habitsWithRequiredTimeOfDay = this.habits.filter(habit => {
      return requiredTimeOfDayValues.every(time => habit.timeOfDay.includes(<TimeOfDay>time) && !habit.isArchived);
    });

    return habitsWithRequiredTimeOfDay.length;
  }

  getLengthOfMorningHabits(): number {
    const habitsWithMorningTime = this.habits.filter(habit => habit.timeOfDay.includes(TimeOfDay.Morning) && habit.timeOfDay.length === 1 && !habit.isArchived);
    return habitsWithMorningTime.length;
  }

  getLengthOfAfternoonHabits(): number {
    const habitsWithAfternoonTime = this.habits.filter(habit => habit.timeOfDay.includes(TimeOfDay.Afternoon) && habit.timeOfDay.length === 1 && !habit.isArchived);
    return habitsWithAfternoonTime.length;
  }

  getLengthOfEveningHabits(): number {
    const habitsWithEveningTime = this.habits.filter(habit => habit.timeOfDay.includes(TimeOfDay.Evening) && habit.timeOfDay.length === 1 && !habit.isArchived);
    return habitsWithEveningTime.length;
  }

  sendHabits(): void {
    const requiredTimeOfDayValues = [TimeOfDay.Morning, TimeOfDay.Afternoon, TimeOfDay.Evening];

    this.ngZone.run(() => {
      switch (this.selectedItem) {
        case AppConstants.active:
          this.filterHabits = this.habits.filter(habit => !habit.isArchived);
          break;

        case AppConstants.archived:
          this.filterHabits = this.habits.filter(habit => habit.isArchived);
          break;

        case TimeOfDay.Anytime:
          this.filterHabits = this.habits.filter(habit => requiredTimeOfDayValues.every(time => habit.timeOfDay.includes(time) && !habit.isArchived));
          break;

        case TimeOfDay.Morning:
        case TimeOfDay.Afternoon:
        case TimeOfDay.Evening:
          this.filterHabits = this.habits.filter(habit => habit.timeOfDay.includes(<TimeOfDay>this.selectedItem) && habit.timeOfDay.length === 1 && !habit.isArchived);
          break;

        default:
          this.filterHabits = this.habits.filter(habit => !habit.isArchived);
          break;
      }
    });

  }


  ngOnDestroy(): void {
    if (this.showManageHabitsSubscription) {
      this.showManageHabitsSubscription.unsubscribe();
    }
  }
}

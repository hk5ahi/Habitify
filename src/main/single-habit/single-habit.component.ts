import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HabitService } from "../Service/habit.service";
import { Habit } from "../Data Types/habit";
import { AppConstants, iconMap } from "../Constants/app-constant";
import { MatMenuTrigger } from "@angular/material/menu";
import { OverlayPanel } from "primeng/overlaypanel";
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-single-habit',
  templateUrl: './single-habit.component.html',
  styleUrls: ['./single-habit.component.scss'],
  providers: [OverlayPanel]
})
export class SingleHabitComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) editHabitTrigger!: MatMenuTrigger;
  @Input() habits: Habit[] = [];
  searchValue!: string;
  filteredHabits: Habit[] = [];
  unSortedHabits: Habit[] = [];
  selectedDate!: Date;
  sortText!: string;
  searchValueSubscription!: Subscription;
  sortSubscription!: Subscription;
  selectedDateSubscription!: Subscription;

  constructor(private habitService: HabitService, private navService: NavigationService) {
  }

  ngOnInit(): void {
    this.filteredHabits = this.habits;
    this.searchValueSubscription = this.navService.habitSearchValue$.subscribe((value) => {
      this.searchValue = value;
      this.filteredHabits = this.habitService.filterHabitsBySearch(this.filteredHabits, this.searchValue);
      this.unSortedHabits = this.filteredHabits;
    });

    this.sortSubscription = this.navService.sortText.subscribe((value) => {
      this.sortText = value;
      this.filteredHabits = this.habitService.sortHabits(this.filteredHabits, this.sortText, this.habits);

    });
    this.selectedDateSubscription = this.navService.selectedDate$.subscribe((value) => {
      this.selectedDate = value;
      this.filteredHabits = this.habitService.filterHabitsByStartDate(this.habits);

    });
  }

  getFilteredHabits(): Habit[] {
    return this.filteredHabits;
  }

  getHabitIcon(habit: Habit): string {
    return iconMap[habit.name] || 'assets/svg/mark.svg';
  }

  openEditHabitMenu(event: MouseEvent) {
    event.preventDefault();
    this.editHabitTrigger.openMenu();
  }

  completeHabit(habit: Habit) {
    this.habitService.toggleCompleteHabit(habit, true);
  }

  getSingleNumber(habit: Habit): number {
    if (habit.isCompleted) {
      return 1;
    } else {
      return 0;
    }
  }

  showDoneButton(habit: Habit) {
    return (!habit.isCompleted && !habit.isSkipped && !habit.isFailed) && (habit.name != AppConstants.cycling && habit.name != AppConstants.running);
  }

  toggleLogValueBar(habit: Habit) {
    this.habitService.toggleLogValueBar();
    habit.showLogValueBar = true;
  }

  showLogButton(habit: Habit) {
    return !habit.showLogValueBar && (habit.name == AppConstants.cycling || habit.name == AppConstants.running);
  }

  closeLogValueBar(habit: Habit) {
    habit.showLogValueBar = false;
  }

  ngOnDestroy(): void {
    if (this.searchValueSubscription) {
      this.searchValueSubscription.unsubscribe();
    }
    if (this.sortSubscription) {
      this.sortSubscription.unsubscribe();
    }
  }

}

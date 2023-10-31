import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('more') moreButton!: ElementRef;
  @Input() habits: Habit[] = [];
  selectedHabit: Habit | null = null;
  isResize!: boolean;
  searchValue!: string;
  filteredHabits: Habit[] = [];
  unSortedHabits: Habit[] = [];
  selectedDate!: Date;
  sortText!: string;
  searchValueSubscription!: Subscription;
  sortSubscription!: Subscription;
  selectedDateSubscription!: Subscription;
  resizeNavigationSubscription!: Subscription;

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
    this.resizeNavigationSubscription = this.navService.resizeNavigation$.subscribe((data) => {
      this.isResize = data;
    });
  }

  getFilteredHabits(): Habit[] {
    return this.filteredHabits;
  }

  getHabitIcon(habit: Habit): string {
    return iconMap[habit.name] || 'assets/svg/mark.svg';
  }

  updateSelectedHabit(habit: Habit) {

    this.selectedHabit = habit;
    this.habitService.updateShowProgress(habit);
  }

  openEditHabitMenu(event: MouseEvent) {
    event.preventDefault();
    this.editHabitTrigger.openMenu();
  }

  completeHabit(habit: Habit) {
    this.habitService.toggleCompleteHabit(habit, true);
  }

  getSingleNumber(habit: Habit): number {
    return habit.isCompleted ? 1 : 0;
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

  updateProgressView(habit: Habit, event: MouseEvent) {

    // Check if the click target is the "More" button
    const isMoreButtonClick = this.moreButton?.nativeElement?.contains(event.target);

    if (!isMoreButtonClick) {


      // Set showProgressView to false for all habits
      this.habits.forEach((otherHabit) => {
        if (habit.id !== otherHabit.id && otherHabit.showProgressView) {
          otherHabit.showProgressView = false;
        }
      });
      // habit.showProgressView = !habit.showProgressView;
      habit.showProgressView = !habit.showProgressView;
      this.selectedHabit = this.habitService.updateShowProgress(habit);
    }
  }

  ngOnDestroy(): void {
    if (this.searchValueSubscription) {
      this.searchValueSubscription.unsubscribe();
    }
    if (this.sortSubscription) {
      this.sortSubscription.unsubscribe();
    }
    if (this.selectedDateSubscription) {
      this.selectedDateSubscription.unsubscribe();
    }
    if (this.resizeNavigationSubscription) {
      this.resizeNavigationSubscription.unsubscribe();
    }
  }

}

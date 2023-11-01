import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { HabitService } from "../Service/habit.service";
import { Habit } from "../Data Types/habit";
import { AppConstants, iconMap } from "../Constants/app-constant";
import { MatMenuTrigger } from "@angular/material/menu";
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-single-habit',
  templateUrl: './single-habit.component.html',
  styleUrls: ['./single-habit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SingleHabitComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(MatMenuTrigger) editHabitTrigger!: MatMenuTrigger;
  @ViewChild('more') moreButton!: ElementRef;
  @Input() habits: Habit[] = [];
  @Input() habit!: Habit;
  selectedHabit: Habit | null = null;
  goalProgress!: number;
  isResize!: boolean;
  searchValue!: string;
  filteredHabits: Habit[] = [];
  unSortedHabits: Habit[] = [];
  selectedDate!: Date;
  sortText!: string;
  isInputFocused = false;
  searchValueSubscription!: Subscription;
  sortSubscription!: Subscription;
  selectedDateSubscription!: Subscription;
  resizeNavigationSubscription!: Subscription;

  constructor(private habitService: HabitService, private navService: NavigationService) {
  }

  ngOnInit(): void {
    this.filteredHabits = this.habits;
    this.subscribeToSearchValue();
    this.subscribeToSortText();
    this.subscribeToSelectedDate();
    this.subscribeToResizeNavigation();
    this.setSelectedHabit();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['habits'] && !changes['habits'].firstChange) {
      this.filteredHabits = this.habits;
    }
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

  showDoneButton(habit: Habit) {
    return (!habit.isCompleted && !habit.isSkipped && !habit.isFailed) && (habit.name != AppConstants.cycling && habit.name != AppConstants.running && habit.name != 'Go for a walk' && habit.name != AppConstants.drinkWater);
  }

  toggleLogValueBar(habit: Habit) {
    this.habitService.toggleLogValueBar();
    habit.showLogValueBar = true;
  }

  showLogButton(habit: Habit) {
    return !habit.showLogValueBar && (habit.name == AppConstants.cycling || habit.name == AppConstants.running || habit.name == 'Go for a walk' || habit.name == AppConstants.drinkWater);
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

  getGoalData(habit: Habit) {
    if (habit.name == AppConstants.drinkWater) {
      return habit.goalProgress + " / " + habit.goal + " " + AppConstants.ml;
    } else if (habit.name == AppConstants.running || habit.name == AppConstants.cycling || habit.name == AppConstants.walk) {
      return habit.goalProgress + " / " + habit.goal + " " + AppConstants.km;
    } else {
      return habit.goalProgress + " / " + habit.goal + " " + AppConstants.times;
    }
  }

  getHabitGoalUnit(habit: Habit) {
    if (habit.name == AppConstants.drinkWater) {
      return AppConstants.ml;
    } else if (habit.name == AppConstants.running || habit.name == AppConstants.cycling || habit.name == AppConstants.walk) {
      return AppConstants.km;
    } else {
      return AppConstants.times;
    }
  }

  updateGoalProgress(habit: Habit) {

    habit.goalProgress += parseInt(String(this.goalProgress), 10);
    if (habit.goalProgress >= habit.goal) {
      this.habitService.toggleCompleteHabit(habit, true);
    }
    this.habitService.updateHabit(habit);
    habit.showLogValueBar = false;
  }

  private subscribeToSearchValue(): void {
    this.searchValueSubscription = this.navService.habitSearchValue$.subscribe(value => {
      this.searchValue = value;
      this.filteredHabits = this.habitService.filterHabitsBySearch(this.filteredHabits, this.searchValue);
      this.unSortedHabits = this.filteredHabits;
    });
  }
  private subscribeToSortText(): void {
    this.sortSubscription = this.navService.sortText.subscribe(value => {
      this.sortText = value;
      this.filteredHabits = this.habitService.sortHabits(this.filteredHabits, this.sortText, this.habits);
    });
  }
  private subscribeToSelectedDate(): void {
    this.selectedDateSubscription = this.navService.selectedDate$.subscribe(value => {
      this.selectedDate = value;
      this.filteredHabits = this.habitService.filterHabitsByStartDate(this.habits);
    });
  }

  private subscribeToResizeNavigation(): void {
    this.resizeNavigationSubscription = this.navService.resizeNavigation$.subscribe(data => {
      this.isResize = data;
    });
  }

  private setSelectedHabit(): void {
    if (this.habit) {
      this.selectedHabit = this.habit;
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

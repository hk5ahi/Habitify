import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
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
  changeDetection: ChangeDetectionStrategy.Default

})
export class SingleHabitComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(MatMenuTrigger) editHabitTrigger!: MatMenuTrigger;
  @ViewChild('logHabit') logHabit!: ElementRef;
  @ViewChild('logHabitData') logHabitData!: ElementRef;
  @ViewChildren('more') moreButtons!: QueryList<ElementRef>;
  @Input() habits: Habit[] = [];
  @Input() habit!: Habit;
  selectedHabit: Habit | null = null;
  goalProgress?: number;
  isResize!: boolean;
  searchValue!: string;
  filteredHabits: Habit[] = [];
  sortedHabits: Habit[] = [];
  searchedHabits: Habit[] = [];
  selectedDate!: Date;
  sortText!: string;
  isOverlayPanelOpen = false;
  isInputFocused = false;
  searchValueSubscription!: Subscription;
  sortSubscription!: Subscription;
  selectedDateSubscription!: Subscription;
  resizeNavigationSubscription!: Subscription;

  constructor(private habitService: HabitService, private navService: NavigationService) {
  }

  ngOnInit(): void {
    this.searchValueSubscription = this.navService.habitSearchValue$.subscribe(value => {
      this.searchValue = value;
      this.searchedHabits = this.habitService.filterHabitsBySearch(this.filteredHabits, this.searchValue);
    });
    this.sortSubscription = this.navService.sortText.subscribe(value => {
      this.sortText = value;
      this.sortedHabits = this.habitService.sortHabits([...this.filteredHabits], this.sortText, this.habits);
    });
    this.selectedDateSubscription = this.navService.selectedDate$.subscribe(value => {
      this.selectedDate = value;
      this.filteredHabits = this.habitService.filterHabitsByStartDate(this.habits);
    });
    this.resizeNavigationSubscription = this.navService.resizeNavigation$.subscribe(data => {
      this.isResize = data;
    });
    if (this.habit) {
      this.selectedHabit = this.habit;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['habits'] && !changes['habits'].firstChange) {
      this.filteredHabits = [...this.habits];
      this.sortedHabits = this.habitService.sortHabits([...this.habits], this.sortText, this.habits);
    }
    if ((this.sortText == 'A-Z' || this.sortText == 'Z-A') && this.searchValue == '') {
      this.filteredHabits = this.sortedHabits;
    }
    if (this.searchValue != '') {
      this.filteredHabits = this.habitService.filterHabitsBySearch(this.sortedHabits, this.searchValue);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const isDeleteDialogClick = this.logHabitData?.nativeElement.contains(event.target);
    if (!isDeleteDialogClick) {
      this.closeLogValueBarsWithDelay();
    }
  }

  closeLogValueBarsWithDelay() {
    this.habits.forEach((habit) => {
      if (habit.showLogValueBar) {
        habit.showLogValueBar = false;
        this.goalProgress = undefined;
      }
    });
  }

  getHabitIcon(habit: Habit): string {
    return iconMap[habit.name] || 'assets/svg/mark.svg';
  }

  updateSelectedHabit(habit: Habit) {
    this.selectedHabit = habit;
    this.habitService.updateShowProgress(habit);
  }

  updateIsOverlayPanelOpen(isOverlayPanelOpen: boolean) {
    setTimeout(() => {
      this.isOverlayPanelOpen = isOverlayPanelOpen;
    }, 100);
  }

  openEditHabitMenu(event: MouseEvent) {
    event.preventDefault();
    this.editHabitTrigger.openMenu();
  }

  completeHabit(habit: Habit) {
    this.habitService.toggleCompleteHabit(habit, true);
    habit.goalProgress = habit.goal;
  }

  showDoneButton(habit: Habit) {
    return (!habit.isCompleted && !habit.isSkipped && !habit.isFailed) && (habit.name != AppConstants.cycling && habit.name != AppConstants.running && habit.name != 'Go for a walk' && habit.name != AppConstants.drinkWater);
  }

  toggleLogValueBar(habit: Habit) {
    this.habitService.toggleLogValueBar();
    setTimeout(() => {
      habit.showLogValueBar = true;
    }, 100);
  }

  showLogButton(habit: Habit) {
    return !habit.showLogValueBar && !habit.isCompleted && (habit.name == AppConstants.cycling || habit.name == AppConstants.running || habit.name == AppConstants.walk || habit.name == AppConstants.drinkWater);
  }

  closeLogValueBar(habit: Habit, event: MouseEvent) {
    habit.showLogValueBar = false;
    this.goalProgress = undefined;
    event.stopPropagation();
  }

  updateProgressView(habit: Habit, event: MouseEvent) {
    // Check if the click target is one of the "More" buttons
    const isMoreButtonClick = this.moreButtons?.toArray().some(button => button.nativeElement.contains(event.target));
    const isLogHabitClick = this.logHabit?.nativeElement.contains(event.target);

    if (!isMoreButtonClick && !this.isOverlayPanelOpen && !isLogHabitClick) {
      // Toggle showProgressView for the clicked habit
      const index = this.habits.findIndex((h: Habit) => h.id === habit.id);
      this.habits[index].showProgressView = !this.habits[index].showProgressView;

      if (this.selectedHabit && this.selectedHabit.id === habit.id) {
        // If the clicked habit is already selected, reset selectedHabit
        this.selectedHabit = null;
      } else {
        // If a different habit is clicked, set showProgressView to false for all other habits
        this.habits.forEach((otherHabit) => {
          if (habit.id !== otherHabit.id && otherHabit.showProgressView) {
            otherHabit.showProgressView = false;
          }
        });
        this.selectedHabit = this.habitService.updateShowProgress(this.habits[index]);
      }
    }
  }

  getGoalData(habit: Habit) {

    if (habit.name == AppConstants.drinkWater) {
      return habit.goalProgress + " / " + habit.goal + " " + AppConstants.ml;
    } else if (habit.name == AppConstants.running || habit.name == AppConstants.cycling || habit.name == AppConstants.walk) {
      return habit.goalProgress + " / " + habit.goal + " " + AppConstants.km;
    } else {
      if (habit.Frequency == "Times") {
        return habit.goalProgress + " / " + habit.goal + " " + AppConstants.times;
      } else {
        return habit.goalProgress + " / " + habit.goal + " min";
      }
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

  updateGoalProgress(habit: Habit, event: MouseEvent) {
    if (this.goalProgress) {
      // Attempt to convert the goalProgress to a number
      const progressToAdd = parseInt(String(this.goalProgress), 10);

      // Check if the conversion resulted in a valid number
      if (!isNaN(progressToAdd)) {
        habit.goalProgress += progressToAdd;

        if (habit.goalProgress >= habit.goal) {
          this.habitService.toggleCompleteHabit(habit, true);
        }

        this.habitService.updateHabit(habit);
        habit.showLogValueBar = false;
      } else {
        // Handle the case where goalProgress is not a valid number (NaN)
        console.error('Invalid goalProgress value. Please enter a valid number.');
      }
      // Reset goalProgress in any case
      this.goalProgress = undefined;
    }

    this.closeLogValueBar(habit, event);
    event.stopPropagation();
  }
  stopEvent(event: MouseEvent) {
    event.stopPropagation();
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

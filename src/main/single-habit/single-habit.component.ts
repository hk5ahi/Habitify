import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { HabitService } from "../Service/habit.service";
import { Habit } from "../Data Types/habit";
import { AppConstants, iconMap } from "../Constants/app-constant";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { DialogService } from "primeng/dynamicdialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { OverlayPanel } from "primeng/overlaypanel";
import { CalenderDisplayService } from "../Service/calender-display.service";
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-single-habit',
  templateUrl: './single-habit.component.html',
  styleUrls: ['./single-habit.component.scss'],
  providers: [OverlayPanel]
})
export class SingleHabitComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(MatMenuTrigger) editHabitTrigger!: MatMenuTrigger;
  @Input() habits: Habit[] = [];
  @Output() showEmpty: EventEmitter<boolean> = new EventEmitter<boolean>();
  searchValue!: string;
  filteredHabits: Habit[] = [];
  unSortedHabits: Habit[] = [];
  searchValueSubscription!: Subscription;
  sortText!: string;
  private sortSubscription!: Subscription;

  constructor(private habitService: HabitService, private dialogService: DialogService, private displayService: CalenderDisplayService, private navService: NavigationService) {
  }

  ngOnInit(): void {
    this.filteredHabits = this.habits;
    this.searchValueSubscription = this.navService.habitSearchValue$.subscribe((value) => {
      this.searchValue = value;
      this.filterHabits();
      this.unSortedHabits = this.filteredHabits;
    });
    this.sortSubscription = this.navService.sortText.subscribe((value) => {
      this.sortText = value;
      this.sortHabits();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['habits'] && !changes['habits'].firstChange) {
      const prevHabitsLength = changes['habits'].previousValue.length;
      const currentHabitsLength = changes['habits'].currentValue.length;
      // Check if the length of habits array has not changed
      if (prevHabitsLength != currentHabitsLength) {
        // habits array has not changed in length, update filteredHabits
        this.filteredHabits = changes['habits'].currentValue;
      }
    }
  }

  sortHabits() {

    if (this.sortText == 'A-Z') {
      this.filteredHabits = [...this.filteredHabits].sort((a, b) => (a.name > b.name) ? 1 : -1);
    } else if (this.sortText == 'Z-A') {
      this.filteredHabits = [...this.filteredHabits].sort((a, b) => (a.name < b.name) ? 1 : -1);
    } else {
      this.filteredHabits = this.unSortedHabits;
    }
  }

  filterHabits(): void {
    if (this.searchValue) {
      const lowerCaseSearch = this.searchValue.toLowerCase();
      this.filteredHabits = this.habits.filter(habit =>
        habit.name.toLowerCase().includes(lowerCaseSearch)
      );
    } else {
      this.filteredHabits = this.habits;
    }
    if (this.filteredHabits.length == 0) {
      this.showEmpty.emit(true);
    } else {
      this.showEmpty.emit(false);
    }
  }

  getHabitIcon(habit: Habit): string {
    return iconMap[habit.name] || 'assets/svg/mark.svg';
  }

  openEditHabitMenu(event: MouseEvent) {
    event.preventDefault();
    this.editHabitTrigger.openMenu();
  }

  openEditModal(habit: Habit) {
    this.dialogService.open(HabitModalDialogueComponent, {
      data: {
        habit: habit,
        editModal: true
      }
    });
  }

  completeHabit(habit: Habit) {
    this.habitService.toggleCompleteHabit(habit, true);
  }

  undoComplete(habit: Habit) {
    this.habitService.toggleCompleteHabit(habit, false);
  }

  undoSkip(habit: Habit) {
    this.habitService.toggleSkipHabit(habit, false);
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

import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { AppConstants, iconMap, TimeOfDay } from "../Constants/app-constant";
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";
import { MatMenuTrigger } from "@angular/material/menu";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { DialogService } from "primeng/dynamicdialog";
import { HabitService } from "../Service/habit.service";

@Component({
  selector: 'app-manage-habits',
  templateUrl: './manage-habits.component.html',
  styleUrls: ['./manage-habits.component.scss']
})
export class ManageHabitsComponent implements OnInit, OnDestroy, OnChanges {

  @Input() habits: Habit[] = [];
  @ViewChild(MatMenuTrigger) manageHabitTrigger!: MatMenuTrigger;
  selectedHabit!: number;
  searchValue!: string;
  searchValueSubscription!: Subscription;
  protected readonly AppConstants = AppConstants;

  constructor(private NavigationService: NavigationService,private dialogService: DialogService,private habitService: HabitService) {
  }

  ngOnInit(): void {
    this.searchValueSubscription = this.NavigationService.manageSearchValue.subscribe((value) => {
      this.searchValue = value;
    });
  }

  filterHabits(): void {

    if (this.searchValue) {
      const lowerCaseSearch = this.searchValue.toLowerCase();
      this.habits = this.habits.filter(habit =>
        habit.name.toLowerCase().includes(lowerCaseSearch)
      );
    }
  }
  openEditModal(habit: Habit) {

    this.dialogService.open(HabitModalDialogueComponent, {
      data: {
        habit: habit,
        editModal: true
      }
    });
  }

  getIconSource(habit: Habit): string {
    return iconMap[habit.name] || 'assets/svg/mark.svg';
  }

  updateSelectedHabit(habit: Habit) {
    this.selectedHabit = habit.id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['habits'] && !changes['habits'].isFirstChange()) {
      this.filterHabits();
    }
  }
  openEditHabitMenu(event: MouseEvent) {
    event.preventDefault();
    this.manageHabitTrigger.openMenu();
  }

  ngOnDestroy(): void {
    if (this.searchValueSubscription) {
      this.searchValueSubscription.unsubscribe();
    }
  }

  archiveHabit(habit: Habit) {
    this.habitService.toggleArchiveHabit(habit,true);
  }

  deleteHabit(habit: Habit) {
    this.habitService.deleteHabit(habit);
  }

  updateTimeOfDay(habit: Habit,timeOfDay: TimeOfDay) {
    this.habitService.updateTimeOfDay(habit,timeOfDay);
  }

  protected readonly TimeOfDay = TimeOfDay;
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { DialogService } from "primeng/dynamicdialog";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { HabitService } from "../Service/habit.service";
import { Subscription } from "rxjs";
import { iconMap } from "../Constants/app-constant";
import { MatMenuTrigger } from "@angular/material/menu";


@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.scss']
})
export class HabitsComponent implements OnInit, OnDestroy {

  @ViewChild(MatMenuTrigger) editHabitTrigger!: MatMenuTrigger;

  habits: Habit[] = [];
  private habitsSubscription!: Subscription;

  constructor(private dialogService: DialogService, private habitService: HabitService) {
  }

  ngOnInit(): void {
    this.habitsSubscription = this.habitService.habitSubject.subscribe((habits: Habit[]) => {
      // Filter habits with isArchived === false
      this.habits = habits.filter(habit => !habit.isArchived);
    });
  }


  hasHabits(): boolean {
    return this.habits.length > 0;
  }

  openDialog(): void {
    this.dialogService.open(HabitModalDialogueComponent, {});
  }

  ngOnDestroy() {
    this.habitsSubscription.unsubscribe();
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
}

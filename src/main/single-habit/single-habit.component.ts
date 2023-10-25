import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { HabitService } from "../Service/habit.service";
import { Habit } from "../Data Types/habit";
import { AppConstants, disabledDates, iconMap } from "../Constants/app-constant";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { DialogService } from "primeng/dynamicdialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { OverlayPanel } from "primeng/overlaypanel";
import { CalenderDisplayService } from "../Service/calender-display.service";

@Component({
  selector: 'app-single-habit',
  templateUrl: './single-habit.component.html',
  styleUrls: ['./single-habit.component.scss'],
  providers: [OverlayPanel]
})
export class SingleHabitComponent {
  @ViewChild(MatMenuTrigger) editHabitTrigger!: MatMenuTrigger;
  @ViewChild('calendar') calender!: ElementRef;
  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;
  @Input() habits: Habit[] = [];
  progressData!: string;
  protected readonly disabledDates = disabledDates;
  showCalendar = false;
  selectedDate: Date= new Date();

  constructor(private habitService: HabitService, private dialogService: DialogService, private displayService: CalenderDisplayService, private cdr: ChangeDetectorRef) {
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

  showOverlayPanel(event: Event, habit: Habit) {
    this.overlayPanel.show(event);

    if (habit.name == AppConstants.cycling || habit.name == AppConstants.running) {
      this.progressData = AppConstants.runningFrequency;
    } else {
      this.progressData = AppConstants.Times;
    }

  }

  getDisplayValue(date: Date | undefined): string {
    return this.displayService.getCalenderDisplayValue(date);
  }

  undoComplete(habit: Habit) {
    this.habitService.toggleCompleteHabit(habit, false);
  }

  skipHabit(habit: Habit) {
    this.habitService.toggleSkipHabit(habit, true);
  }

  failHabit(habit: Habit) {
    this.habitService.toggleFailHabit(habit, true);
  }

  undoFailHabit(habit: Habit) {
    this.habitService.toggleFailHabit(habit, false);
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

  closeOverLay() {
    if (this.overlayPanel) {
      this.overlayPanel.hide();
     this.showCalendar = false;
    }
  }

  toggleCalendarDisplay(habit: Habit) {
   this.showCalendar = !this.showCalendar;
  }

  onDateClick(event: any) {

    this.overlayPanel.show(event);
  }
}

import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CalenderDisplayService } from "../Service/calender-display.service";
import { OverlayPanel } from "primeng/overlaypanel";
import { AppConstants, disabledDates } from "../Constants/app-constant";
import { OverlayPanelService } from "../Service/overlay-panel.service";
import { Habit } from "../Data Types/habit";
import { HabitService } from "../Service/habit.service";


@Component({
  selector: 'app-overlay-panel-menu',
  templateUrl: './overlay-panel-menu.component.html',
  styleUrls: ['./overlay-panel-menu.component.scss']
})
export class OverlayPanelMenuComponent implements AfterViewInit {

  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;
  @Input() habit!: Habit;
  showCalendar = false;
  selectedDate: Date = new Date();
  progressData!: number;
  receivedEvent!: Event;
  protected readonly disabledDates = disabledDates;

  constructor(private displayService: CalenderDisplayService, private overlayPanelService: OverlayPanelService, private habitService: HabitService) {
  }

  ngAfterViewInit(): void {
    this.receivedEvent = this.overlayPanelService.getEvent();
    if (this.overlayPanelService.getShowPanelOverlay()) {
      this.showOverlayPanel(this.receivedEvent);
    }
  }

  getDisplayValue(date: Date | undefined): string {
    return this.displayService.getCalenderDisplayValue(date);
  }

  closeOverLay() {
    if (this.overlayPanel) {
      this.overlayPanel.hide();
      this.showCalendar = false;
      this.habit.showOverLayPanel = false;
    }
  }

  onDateClick(event: any) {
    this.overlayPanel.show(event);
  }

  toggleCalendarDisplay() {
    this.showCalendar = !this.showCalendar;
  }

  showOverlayPanel(event: Event) {

    this.overlayPanel.show(event);
    this.overlayPanelService.setShowPanelOverlay(false);
  }

  updateProgressData(habit: Habit) {
    habit.goalProgress += parseInt(String(this.progressData), 10);

    if (habit.goalProgress >= habit.goal) {
      this.habitService.toggleCompleteHabit(habit, true);
    }
    this.habitService.updateHabit(habit);
    this.closeOverLay();
  }

  getGoalHabitUnit(habit: Habit) {
    if (habit.name == AppConstants.drinkWater) {
      return AppConstants.ml;
    } else if (habit.name == AppConstants.running || habit.name == AppConstants.cycling || habit.name == AppConstants.walk) {
      return AppConstants.km
    } else {
      return AppConstants.times;
    }
  }
}

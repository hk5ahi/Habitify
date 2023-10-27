import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CalenderDisplayService } from "../Service/calender-display.service";
import { OverlayPanel } from "primeng/overlaypanel";
import { AppConstants, disabledDates } from "../Constants/app-constant";
import { OverlayPanelService } from "../Service/overlay-panel.service";
import { Habit } from "../Data Types/habit";


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
  progressData!: string;
  receivedEvent!: Event;
  protected readonly disabledDates = disabledDates;

  constructor(private displayService: CalenderDisplayService, private overlayPanelService: OverlayPanelService) {
  }

  ngAfterViewInit(): void {
    this.receivedEvent = this.overlayPanelService.getEvent();
    if (this.overlayPanelService.getShowPanelOverlay()) {
      this.showOverlayPanel(this.receivedEvent, this.habit);
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

  showOverlayPanel(event: Event, habit: Habit) {

    this.overlayPanel.show(event);
    if (habit.name == AppConstants.cycling || habit.name == AppConstants.running) {
      this.progressData = AppConstants.runningFrequency;
    } else {
      this.progressData = AppConstants.Times;
    }
    this.overlayPanelService.setShowPanelOverlay(false);
  }
}

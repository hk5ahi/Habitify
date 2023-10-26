import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
export class OverlayPanelMenuComponent implements OnInit{

  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;
  @Input () habit!: Habit;
  showCalendar = false;
  selectedDate: Date = new Date();
  progressData!: string;
  receivedEvent!: Event;
  protected readonly disabledDates = disabledDates;

  constructor(private displayService: CalenderDisplayService,private overlayPanelService: OverlayPanelService) {
  }
  ngOnInit(): void {
      // Subscribe to the event here
      // this.overlayPanelService.getEvent().subscribe((event) => {
      //   this.receivedEvent = event;
      // });
    this.receivedEvent = this.overlayPanelService.getEvent();
    console.log(this.receivedEvent);
    if(this.overlayPanelService.showPanel){
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
  }
}

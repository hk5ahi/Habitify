import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { TimeOfDay } from "../Constants/app-constant";
import { MatMenu } from "@angular/material/menu";
import { TimeAndDayService } from "../Service/time-day.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-time-day-menu',
  templateUrl: './time-day-menu.component.html',
  styleUrls: ['./time-day-menu.component.scss']
})
export class TimeDayMenuComponent implements OnInit, OnDestroy {

  @Output() timeDay: EventEmitter<TimeOfDay> = new EventEmitter<TimeOfDay>();
  @ViewChild(MatMenu) menu!: MatMenu;
  timeOfDay: TimeOfDay[] = [];
  protected readonly TimeOfDay = TimeOfDay;
  private timeDaySubscription!: Subscription;

  constructor(private timeOfDayService: TimeAndDayService) {
  }

  ngOnInit(): void {
    this.timeOfDay = this.timeOfDayService.getTimeOfDay();
    this.timeDaySubscription = this.timeOfDayService.timeOfDay$.subscribe((data) => {
      this.timeOfDay = data;
    });
  }

  getMatMenu(): MatMenu {
    return this.menu;
  }

  updateTimeOfDay(timeDay: TimeOfDay) {
    this.timeDay.emit(timeDay);
  }

  // Returns true if the time is present in time of days array to display tick mark
  isTimeOfDaySelected(time: TimeOfDay): boolean {
    return this.timeOfDay.includes(time);
  }

  ngOnDestroy() {
    if (this.timeDaySubscription) {
      this.timeDaySubscription.unsubscribe();
    }
  }
}

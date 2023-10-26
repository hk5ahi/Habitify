import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { daysOfWeek } from "../Constants/app-constant";
import { MatMenu } from "@angular/material/menu";
import { Habit } from "../Data Types/habit";
import { TimeAndDayService } from "../Service/time-day.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-days-menu',
  templateUrl: './days-menu.component.html',
  styleUrls: ['./days-menu.component.scss']
})
export class DaysMenuComponent implements OnInit, OnDestroy {

  @Output() timeDay: EventEmitter<string> = new EventEmitter<string>();
  @Input() editModal: boolean = false;
  @Input() receivedHabit!: Habit;
  @ViewChild(MatMenu) menu!: MatMenu;
  days: string[] = [];
  protected readonly daysOfWeek = daysOfWeek;
  private DaySubscription!: Subscription;

  constructor(private timeOfDayService: TimeAndDayService) {
  }

  ngOnInit(): void {
    this.DaySubscription = this.timeOfDayService.day$.subscribe((data) => {
      this.days = data;
    });
  }

  getMenu(): MatMenu {
    return this.menu;
  }

  toggleDay(day: string) {
    this.timeDay.emit(day);
  }

  checkDays(day: string): boolean {
    if (this.editModal) {
      const repeat = (this.receivedHabit?.repeat as string).toLowerCase();
      const dayToCheck = day.toLowerCase();

      // Check if the repeat string contains either the abbreviated or full name of the day
      return repeat === 'daily' || repeat.includes(dayToCheck) || repeat.includes(dayToCheck.substring(0, 3));

    } else {
      return this.days.includes(day);
    }
  }

  ngOnDestroy() {
    if (this.DaySubscription) {
      this.DaySubscription.unsubscribe();
    }
  }
}

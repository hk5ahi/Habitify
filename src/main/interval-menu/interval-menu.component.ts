import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenu } from "@angular/material/menu";
import { IntervalService } from "../Service/interval.service";
import { Subscription } from "rxjs";
import { Habit } from "../Data Types/habit";

@Component({
  selector: 'app-interval-menu',
  templateUrl: './interval-menu.component.html',
  styleUrls: ['./interval-menu.component.scss']
})
export class IntervalMenuComponent implements OnInit, OnDestroy {

  @Output() interval: EventEmitter<string> = new EventEmitter<string>();
  @Input() editModal: boolean = false;
  @ViewChild(MatMenu) menu!: MatMenu;
  intervalPerDays!: string;
  intervalSubscription!: Subscription;
  receivedHabitSubscription!: Subscription;
  receivedHabit!: Habit;

  constructor(private intervalService: IntervalService) {
  }

  ngOnInit(): void {
    this.intervalSubscription = this.intervalService.interval$.subscribe(interval => {
      this.intervalPerDays = interval;
    });
    this.receivedHabitSubscription = this.intervalService.receivedHabit$.subscribe(habit => {
      this.receivedHabit = habit!;
    });

  }

  getMenu(): MatMenu {
    return this.menu;
  }

  updateIntervalPerDays(interval: string) {
    this.interval.emit(interval);
  }

  checkIntervalPerDays(interval: string) {
    if (this.editModal) {

      if (this.receivedHabit.repeat === interval) {
        return true;
      }
    } else {
      if (this.intervalPerDays === interval) {
        return true;
      }
    }
    return false;
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

}

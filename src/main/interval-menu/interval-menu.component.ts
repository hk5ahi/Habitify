import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
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
  @Output() habitItemSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('Interval') editHabit!: ElementRef;
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
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const isHabitDialogClick = this.editHabit?.nativeElement?.contains(event.target);

    if (isHabitDialogClick) {
      this.habitItemSelected.emit(true);
    }
    else {
      this.habitItemSelected.emit(false);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

}

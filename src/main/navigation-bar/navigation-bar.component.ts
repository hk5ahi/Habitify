import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  @ViewChild('Calender') calendar!: ElementRef;
  currentTimeOfDay!: string;
  searchValue!: string;
  showCalendar: boolean = false;
  selectedDate!: Date;
  minDate!: Date;
  maxDate!: Date;
  private timeOfDaySubscription!: Subscription;

  constructor(private navService: NavigationService) {

  }

  ngOnInit() {
    // Subscribe to the observable to get updates
    this.timeOfDaySubscription = this.navService.timeOfDay$.subscribe((timeOfDay) => {
      this.currentTimeOfDay = timeOfDay;
    });
    this.calculateMinMaxDates();
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  onDateSelect(event: any) {
    this.selectedDate = event;
  }

  calculateMinMaxDates() {
    const today = new Date();
    // Set minDate to the first date of the next month
    this.minDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() + 1);
    // Set maxDate to the last date of the current month
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  }

  onMonthChange(event: any) {
    const selectedDate = new Date(event.year, event.month, 1);
    if (selectedDate > this.maxDate) {
      // If the selected month is in the future, prevent navigation
      event.originalEvent.preventDefault();
    }
  }

  ngOnDestroy(): void {
    if (this.timeOfDaySubscription) {
      this.timeOfDaySubscription.unsubscribe();
    }
  }

}

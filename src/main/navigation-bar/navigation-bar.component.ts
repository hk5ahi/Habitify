import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";
import { DatePipe } from '@angular/common';
import { MatMenuTrigger } from "@angular/material/menu";
import { AppConstants } from "../Constants/app-constant";
import { DialogService } from "primeng/dynamicdialog";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { DisplayService } from "../Service/display.service";


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  providers: [DatePipe]
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  @ViewChild('Calender') calendar!: ElementRef;
  @ViewChild('Search') search!: ElementRef;
  @ViewChild('SearchIcon') searchIcon!: ElementRef;
  @ViewChild('alphamenu') alphaMenu!: MatMenuTrigger;
  currentTimeOfDay!: string;
  searchValue!: string;
  showCalendar: boolean = false;
  selectedDate: Date = new Date();
  minDate!: Date;
  maxDate!: Date;
  sortText: string = AppConstants.habits_Order;
  menuText: string = AppConstants.habits_Order;
  showSearch: boolean = false;
  isPrevious: boolean = false;
  isCurrent: boolean = true;
  private timeOfDaySubscription!: Subscription;

  constructor(private navService: NavigationService, private dialogService: DialogService, private displayService: DisplayService) {
  }

  ngOnInit() {
    // Subscribe to the observable to get updates
    this.timeOfDaySubscription = this.navService.timeOfDay$.subscribe((timeOfDay) => {
      this.currentTimeOfDay = timeOfDay;
    });
    this.calculateMinMaxDates();
  }


  onDateSelect() {
    this.showCalendar = false;
  }

  openDialog(): void {
    this.dialogService.open(HabitModalDialogueComponent, {});
  }

  isCurrentMonth(): boolean {
    const currentDate = new Date();
    return currentDate.getMonth() === this.selectedDate.getMonth() && currentDate.getFullYear() === this.selectedDate.getFullYear();
  }

  isPreviousMonth(event: any): boolean {
    const currentDate = new Date();
    const selectedMonth = event.month;
    const selectedYear = event.year;

    // Check if the selected month is the previous month
    return (
      currentDate.getFullYear() === selectedYear &&
      currentDate.getMonth() === selectedMonth
    );
  }

  onMonthChange(event: any) {
    // Update isCurrentMonth based on the current month and the newly selected month
    this.isPrevious = this.isPreviousMonth(event);
    this.isCurrent = this.isCurrentMonth();
    if (this.isPrevious) {
      this.isCurrent = false;
    }
  }

  getDisplayValue(date: Date | undefined): string {
    return this.displayService.getDisplayValue(date);
  }

  menuItemClicked(item: string): void {
    if (item === 'A-Z' || item === 'Z-A') {
      this.sortText = AppConstants.Alphabetical;
    } else if (item !== AppConstants.Alphabetical) {
      this.sortText = item;
    }
    this.menuText = item;
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;

  }

  calculateMinMaxDates() {
    const today = new Date();
    // Set minDate to the first date of the next month
    this.minDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() + 1);
    // Set maxDate to the last date of the current month
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  }

  showSearchArea() {
    this.showSearch = !this.showSearch;
  }

  showCalenderIcon() {
    this.showSearch = false;
    this.showCalendar = true;
  }

  showSortIcon() {
    this.showSearch = false;
  }

  ngOnDestroy(): void {
    if (this.timeOfDaySubscription) {
      this.timeOfDaySubscription.unsubscribe();
    }
  }

}

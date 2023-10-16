import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";
import { DatePipe } from '@angular/common';
import { MatMenuTrigger } from "@angular/material/menu";
import { AppConstants } from "../Constants/app-constant";


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
  sortText: string = 'My Habits Order';
  menuText: string = 'My Habits Order';
  showSearch: boolean = false;
  private timeOfDaySubscription!: Subscription;

  constructor(private navService: NavigationService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    // Subscribe to the observable to get updates
    this.timeOfDaySubscription = this.navService.timeOfDay$.subscribe((timeOfDay) => {
      this.currentTimeOfDay = timeOfDay;
    });
    this.calculateMinMaxDates();
  }

  openAlphaMenu(open: boolean): void {
    if (open) {
      this.alphaMenu.openMenu();
    } else {
      this.alphaMenu.closeMenu();
    }
  }

  getDisplayValue(date: Date | undefined): string {
    if (!date) {
      return ''; // Handle the case when no date is selected
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (this.isSameDay(date, today)) {
      return AppConstants.Today;
    } else if (this.isSameDay(date, yesterday)) {
      return AppConstants.Yesterday;
    } else if (this.isSameDay(date, tomorrow)) {
      return AppConstants.Tomorrow;
    } else {
      return this.datePipe.transform(date, 'MMMM d') || '';
    }
  }

  isSameDay(firstDate: Date, secondDate: Date): boolean {
    return (
      firstDate.getDate() === secondDate.getDate() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getFullYear() === secondDate.getFullYear()
    );
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

  hideCalender() {
    this.showCalendar = false;
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

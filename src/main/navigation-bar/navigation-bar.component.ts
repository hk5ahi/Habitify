import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";
import { DatePipe } from '@angular/common';
import { MatMenuTrigger } from "@angular/material/menu";
import { AppConstants } from "../Constants/app-constant";
import { DialogService } from "primeng/dynamicdialog";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { CalenderDisplayService } from "../Service/calender-display.service";
import { SidebarService } from "../Service/sidebar.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  providers: [DatePipe]
})
export class NavigationBarComponent implements OnInit, OnDestroy {

  @ViewChild('Calender') calendar!: ElementRef;
  @ViewChild('inputCalender') inputCalender!: ElementRef;
  @ViewChild('SimpleCalender') simpleCalender!: ElementRef;
  @ViewChild('Search') search!: ElementRef;
  @ViewChild('sortButton') sortButton!: ElementRef;
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
  isPrevious!: boolean;
  isCurrent!: boolean;
  isResize: boolean = false;
  private timeOfDaySubscription!: Subscription;
  private resizeNavigationSubscription!: Subscription;

  constructor(private navService: NavigationService, private dialogService: DialogService, private displayService: CalenderDisplayService, private sidebarService: SidebarService, private titleService: Title) {
  }

  ngOnInit() {
    // Subscribe to the observable to get updates
    this.timeOfDaySubscription = this.navService.timeOfDay$.subscribe((timeOfDay) => {
      this.currentTimeOfDay = timeOfDay;
    });
    this.resizeNavigationSubscription = this.navService.resizeNavigation$.subscribe((data) => {
      this.isResize = data;
    });
    this.calculateMinMaxDates();
    this.isPrevious = false;
    this.isCurrent = true;
  }

  onDateSelect() {
    this.navService.setSelectedDate(this.selectedDate);
    this.showCalendar = false;
    if (this.sidebarService.getIsAllHabitsValue()) {
      this.titleService.setTitle('All Habits, ' + this.getDisplayValue(this.selectedDate) + ' - Habitify');
    } else {
      this.titleService.setTitle(this.navService.getTimeOfDayValue() + ' Habits, ' + this.getDisplayValue(this.selectedDate) + ' - Habitify');
    }
  }

  openDialog(): void {
    this.dialogService.open(HabitModalDialogueComponent, {
    });

  }

  onMonthChange(event: any) {
    const selectedDate = new Date(event.year, event.month - 1);
    const currentDate = new Date();  // Current date

    if (currentDate.getMonth() - 1 === selectedDate.getMonth()) {
      this.isPrevious = true;
      this.isCurrent = false;
    } else if (currentDate.getMonth() === selectedDate.getMonth() && currentDate.getFullYear() === selectedDate.getFullYear()) {
      this.isPrevious = false;
      this.isCurrent = true;
    } else {
      this.isPrevious = false;
      this.isCurrent = false;
    }
  }


  getDisplayValue(date: Date | undefined): string {
    return this.displayService.getCalenderDisplayValue(date);
  }

  menuItemClicked(item: string): void {
    if (item === 'A-Z' || item === 'Z-A') {
      this.sortText = 'Alphabetical';
      this.navService.setSortText(item);
      this.menuText = item;
    } else if (item !== AppConstants.Alphabetical) {
      this.sortText = item;
      this.navService.setSortText(item);
      this.menuText = item;
    }
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar && this.selectedDate.getMonth() === new Date().getMonth()) {
      this.isCurrent = true;
      this.isPrevious = false;
    } else if (this.showCalendar && this.selectedDate.getMonth() == new Date().getMonth() - 1) {
      this.isCurrent = false;
      this.isPrevious = true;
    }
  }

  calculateMinMaxDates() {
    const today = new Date();
    // Set minDate to the first date of the next month
    this.minDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() + 2);
    // Set maxDate to the last date of the current month
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  }

  showSearchArea() {
    this.showSearch = !this.showSearch;
  }

  showCalenderIcon() {

    this.showSearch = false;
    setTimeout(() => {
      this.showCalendar = !this.showCalendar;
      if (this.showCalendar && this.selectedDate.getMonth() === new Date().getMonth()) {
        this.isCurrent = true;
        this.isPrevious = false;
      } else if (this.showCalendar && this.selectedDate.getMonth() == new Date().getMonth() - 1) {
        this.isCurrent = false;
        this.isPrevious = true;
      }
    }, 10);
  }

  showSortIcon() {
    this.showSearch = false;
    setTimeout(() => {
      this.sortButton.nativeElement.click();
    }, 1); // 1 millisecond delay to avoid the click event on the search icon
  }

  getData() {
    if (this.sidebarService.getIsAllHabitsValue())
      return AppConstants.allHabits;
    else {
      return this.navService.getTimeOfDayValue();
    }
  }

  updateSearchValue() {
    this.navService.setHabitSearchValue(this.searchValue);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const isCalendarClicked = this.calendar?.nativeElement?.contains(event.target);
    const isInputCalenderClicked = this.inputCalender?.nativeElement?.contains(event.target);
    const isSimpleCalenderClicked = this.simpleCalender?.nativeElement?.contains(event.target);
    // Check if the clicked element or any of its ancestors contains the .p-datepicker-header class
    const isClickInsideHeader = this.hasClass(event.target, 'p-datepicker-header');
    const isClickInsideMonth = this.hasClass(event.target, 'p-datepicker-month');
    const isClickInsideYear = this.hasClass(event.target, 'p-datepicker-year');

    if (!isCalendarClicked && !isClickInsideHeader && !isInputCalenderClicked && !isSimpleCalenderClicked && !isClickInsideMonth && !isClickInsideYear) {
      // Clicked outside the calendar or header, close the calendar or perform other actions
      this.showCalendar = false;
    }
  }

  hasClass(element: any, className: string): boolean {
    return element.classList.contains(className) || element.closest(`.${className}`) !== null;
  }

  ngOnDestroy(): void {
    if (this.timeOfDaySubscription) {
      this.timeOfDaySubscription.unsubscribe();
    }
    if (this.resizeNavigationSubscription) {
      this.resizeNavigationSubscription.unsubscribe();
    }
  }
}

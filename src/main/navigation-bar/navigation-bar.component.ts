import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationService } from "../Service/navigation.service";


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @ViewChild('Calender') calendar!: ElementRef;
  currentTimeOfDay!: string;
  searchValue!: string;
  showCalendar: boolean = false;
  selectedDate!: Date;
  minDate!: Date;
  maxDate!: Date;


  constructor(private navService: NavigationService) {

  }

  ngOnInit() {
    // Subscribe to the observable to get updates
    this.navService.timeOfDay$.subscribe((timeOfDay) => {
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

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    if (this.calendar) {
      const clickedInsideCalender = this.calendar?.nativeElement?.contains(event.target);

      // Check if the click is inside the calendar
      if (!clickedInsideCalender) {
        // Clicked outside the calendar, close the calendar
        this.showCalendar = !this.showCalendar;
        console.log('Clicked  the calendar');

      } else {
        // Clicked outside the calendar, close the calendar
        this.showCalendar = true;

      }
    }
    else{
      this.showCalendar = false;
    }
  }


  onMonthChange(event: any) {
    const selectedDate = new Date(event.year, event.month, 1);
    if (selectedDate > this.maxDate) {
      // If the selected month is in the future, prevent navigation
      event.originalEvent.preventDefault();
    }
  }

}

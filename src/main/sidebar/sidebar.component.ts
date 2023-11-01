import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";
import { AppConstants } from "../Constants/app-constant";
import { SidebarService } from "../Service/sidebar.service";
import { Router } from "@angular/router";
import { CalenderDisplayService } from "../Service/calender-display.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isAllHabits: boolean = true;
  isTimeHabits: boolean = false;
  timeOfDay!: string;
  showManageHabits!: boolean;
  private isAllHabitsSubscription!: Subscription;
  private isTimeHabitsSubscription!: Subscription;
  private timeOfDaySubscription!: Subscription;
  private showManageHabitsSubscription!: Subscription;

  constructor(private navService: NavigationService, private sidebarService: SidebarService, private router: Router, private displayService: CalenderDisplayService, private titleService: Title) {
  }

  ngOnInit() {
    this.timeOfDaySubscription = this.navService.timeOfDay$.subscribe((timeOfDay) => {
      this.timeOfDay = timeOfDay;
    });
    this.isAllHabitsSubscription = this.sidebarService.isAllHabits$.subscribe(value => {
      this.isAllHabits = value;
    });

    this.isTimeHabitsSubscription = this.sidebarService.isTimeHabits$.subscribe(value => {
      this.isTimeHabits = value;
    });
    this.showManageHabitsSubscription = this.sidebarService.showManageHabits$.subscribe(value => {
      this.showManageHabits = value;
    });
  }

  calculateTimeOfDay() {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 12) {
      this.timeOfDay = AppConstants.Morning;
      this.navService.setTimeOfDay(this.timeOfDay);
      return this.timeOfDay;
    } else if (currentHour >= 12 && currentHour < 18) {
      this.timeOfDay = AppConstants.Afternoon;
      this.navService.setTimeOfDay(this.timeOfDay);
      return this.timeOfDay;
    } else {
      this.timeOfDay = AppConstants.Evening;
      this.navService.setTimeOfDay(this.timeOfDay);
      return this.timeOfDay;
    }
  }

  updateIsAllHabits() {
    const selectedDate = this.navService.getSelectedDateValue();
    this.sidebarService.updateIsAllHabits();
    this.sidebarService.setShowManageHabits(false);
    const calendarDisplay = this.displayService.getCalenderDisplayValue(selectedDate);
    const pageTitle = `All Habits, ${calendarDisplay} - Habitify`;
    this.navService.setResizeNavigation(false);
    this.titleService.setTitle(pageTitle);
  }

  updateIsTimeHabits() {
    const timeOfDay = this.navService.getTimeOfDayValue();
    const selectedDate = this.navService.getSelectedDateValue();
    this.navService.setResizeNavigation(false);
    this.sidebarService.updateIsTimeHabits();
    this.sidebarService.setShowManageHabits(false);
    const calendarDisplay = this.displayService.getCalenderDisplayValue(selectedDate);
    const pageTitle = `${timeOfDay}, ${calendarDisplay} - Habitify`;

    this.titleService.setTitle(pageTitle);
  }


  routeToManageHabits() {
    this.sidebarService.setShowManageHabits(true);
    this.sidebarService.setIsTimeHabitsAndAllHabits(false);
    this.navService.setResizeNavigation(false);
    this.router.navigate(['/manage-habits-sidebar']);
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.timeOfDaySubscription) {
      this.timeOfDaySubscription.unsubscribe();
    }
    if (this.isAllHabitsSubscription) {
      this.isAllHabitsSubscription.unsubscribe();
    }
    if (this.isTimeHabitsSubscription) {
      this.isTimeHabitsSubscription.unsubscribe();
    }
    if (this.showManageHabitsSubscription) {
      this.showManageHabitsSubscription.unsubscribe();
    }
  }
}

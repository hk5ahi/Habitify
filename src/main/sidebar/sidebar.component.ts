import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";
import { AppConstants } from "../Constants/app-constant";
import { SidebarService } from "../Service/sidebar.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isAllHabits: boolean = true;
  isTimeHabits: boolean = false;
  timeOfDay!: string;
  showManageHabits: boolean = false;
  private isAllHabitsSubscription!: Subscription;
  private isTimeHabitsSubscription!: Subscription;
  private timeOfDaySubscription!: Subscription;

  constructor(private navService: NavigationService, private sidebarService: SidebarService,private router: Router) {
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
    this.sidebarService.updateIsAllHabits();
    this.showManageHabits = false;
  }

  updateIsTimeHabits() {
    this.sidebarService.updateIsTimeHabits();
    this.showManageHabits = false;
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
  }

  routeToManageHabits() {
    this.router.navigate(['/manage-habits-sidebar']);
    this.showManageHabits = true;
  }
}

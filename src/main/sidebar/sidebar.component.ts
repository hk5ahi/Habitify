import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";
import { AppConstants } from "../Constants/app-constant";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  sidebarVisible = true;
  timeOfDay!: string;
  private timeOfDaySubscription!: Subscription;

  constructor(private navService: NavigationService) {
  }

  ngOnInit() {
    this.timeOfDaySubscription = this.navService.timeOfDay$.subscribe((timeOfDay) => {
      this.timeOfDay = timeOfDay;
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

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.timeOfDaySubscription) {
      this.timeOfDaySubscription.unsubscribe();
    }

  }

}

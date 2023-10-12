import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from "../Service/navigation.service";


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,OnDestroy{
    sidebarVisible = true;
    timeOfDay!:string ;
    constructor(private navService: NavigationService) {

    }

  ngOnInit() {
    this.navService.timeOfDay$.subscribe((timeOfDay) => {
      this.timeOfDay = timeOfDay;
    });
  }

    calculateTimeOfDay() {
        const currentHour = new Date().getHours();

        if (currentHour >= 0 && currentHour < 12) {
            this.timeOfDay= 'Morning';
            this.navService.setTimeOfDay(this.timeOfDay);
            return this.timeOfDay;
        } else if (currentHour >= 12 && currentHour < 18) {
          this.timeOfDay= 'Afternoon';
          this.navService.setTimeOfDay(this.timeOfDay);
          return this.timeOfDay;

        } else {
            this.timeOfDay= 'Evening';
          this.navService.setTimeOfDay(this.timeOfDay);
            return this.timeOfDay;
        }
    }

  ngOnDestroy(): void {
  }

}

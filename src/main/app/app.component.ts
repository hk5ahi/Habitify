import { Component, OnInit } from '@angular/core';
import { SidebarService } from "../Service/sidebar.service";
import { Title } from "@angular/platform-browser";
import { AppConstants } from "../Constants/app-constant";
import { NavigationService } from "../Service/navigation.service";
import { CalenderDisplayService } from "../Service/calender-display.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  timeOfDay!: string;

  constructor(private sidebarService: SidebarService, private titleService: Title, private navService: NavigationService, private displayService: CalenderDisplayService) {
  }

  ngOnInit(): void {
    const selectedDate = this.navService.getSelectedDateValue();
    const calendarDisplay = this.displayService.getCalenderDisplayValue(selectedDate);
    const timeOfDay = this.calculateTimeOfDay();
    const pageTitle = `${timeOfDay}, ${calendarDisplay} - Habitify`;
    this.titleService.setTitle(pageTitle);
  }

  getManageHabitsValue(): boolean {
    return this.sidebarService.getShowManageHabitsValue();
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
}

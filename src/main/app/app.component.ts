import { Component, OnInit } from '@angular/core';
import { SidebarService } from "../Service/sidebar.service";
import { Title } from "@angular/platform-browser";
import { AppConstants } from "../Constants/app-constant";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private sidebarService: SidebarService, private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(AppConstants.introTitle);
  }

  getManageHabitsValue(): boolean {
    return this.sidebarService.getShowManageHabitsValue();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-manage-habits-navbar',
  templateUrl: './manage-habits-navbar.component.html',
  styleUrls: ['./manage-habits-navbar.component.scss']
})
export class ManageHabitsNavbarComponent implements OnInit, OnDestroy {

  searchValue!: string;
  searchValueSubscription!: Subscription;

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit(): void {
    this.searchValueSubscription = this.navigationService.manageSearchValue.subscribe((value) => {
      this.searchValue = value;
    });
  }

  sendSearchValue() {
    this.navigationService.setSearchValue(this.searchValue);
  }

  ngOnDestroy(): void {
    if (this.searchValueSubscription) {
      this.searchValueSubscription.unsubscribe();
    }
  }
}


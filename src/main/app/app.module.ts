import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarModule } from "primeng/sidebar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { SplitButtonModule } from "primeng/splitbutton";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { HabitsComponent } from "../habits/habits.component";


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavigationBarComponent,
    HabitsComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SidebarModule,
        InputTextModule,
        FormsModule,
        ButtonModule,
        CalendarModule,
        SplitButtonModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

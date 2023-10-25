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
import { DialogModule } from "primeng/dialog";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { DialogService } from "primeng/dynamicdialog";
import { InputNumberModule } from "primeng/inputnumber";
import { DatePipe } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { AllHabitsComponent } from "../all-habits/all-habits.component";
import { TimeHabitsComponent } from "../time-habits/time-habits.component";
import { ToastModule } from "primeng/toast";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { AccordionModule } from "primeng/accordion";
import { SingleHabitComponent } from "../single-habit/single-habit.component";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { WaterFrequencyMenuComponent } from "../water-frequency-menu/water-frequency-menu.component";
import { RunningFrequencyMenuComponent } from "../running-frequency-menu/running-frequency-menu.component";
import { FrequencyMenuComponent } from "../frequency-menu/frequency-menu.component";
import { FrequencyPeriodMenuComponent } from "../frequency-period-menu/frequency-period-menu.component";
import { TimeDayMenuComponent } from "../time-day-menu/time-day-menu.component";
import { DaysMenuComponent } from "../days-menu/days-menu.component";
import { HabitMenuComponent } from "../habit-menu/habit-menu.component";
import { IntervalMenuComponent } from "../interval-menu/interval-menu.component";
import { ManageHabitsSidebarComponent } from "../manage-habits-sidebar/manage-habits-sidebar.component";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavigationBarComponent,
    HabitsComponent,
    HabitModalDialogueComponent,
    AllHabitsComponent,
    TimeHabitsComponent,
    SingleHabitComponent,
    WaterFrequencyMenuComponent,
    WaterFrequencyMenuComponent,
    RunningFrequencyMenuComponent,
    RunningFrequencyMenuComponent,
    FrequencyMenuComponent,
    FrequencyPeriodMenuComponent,
    TimeDayMenuComponent,
    TimeDayMenuComponent,
    TimeDayMenuComponent,
    FrequencyPeriodMenuComponent,
    DaysMenuComponent,
    HabitMenuComponent,
    HabitMenuComponent,
    IntervalMenuComponent,
    ManageHabitsSidebarComponent,
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
        MatDialogModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        DialogModule,
        InputNumberModule,
        InputTextModule,
        MatSelectModule,
        ToastModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        AccordionModule,
        OverlayPanelModule,
    ],
  providers: [DialogService, DatePipe, MessageService, ConfirmationService, {provide: MAT_DIALOG_DATA, useValue: {}},],
  bootstrap: [AppComponent]
})
export class AppModule {
}

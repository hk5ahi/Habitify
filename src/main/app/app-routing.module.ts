import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllHabitsComponent } from "../all-habits/all-habits.component";
import { TimeHabitsComponent } from "../time-habits/time-habits.component";
import { ManageHabitsSidebarComponent } from "../manage-habits-sidebar/manage-habits-sidebar.component";

const routes: Routes = [
  {path: 'all-habits', component: AllHabitsComponent},
  {path: 'time-of-day', component: TimeHabitsComponent},
  {path: 'manage-habits-sidebar', component: ManageHabitsSidebarComponent},
  {path: '', redirectTo: '/time-of-day', pathMatch: 'full'}, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllHabitsComponent } from "../all-habits/all-habits.component";
import { TimeHabitsComponent } from "../time-habits/time-habits.component";

const routes: Routes = [
  {path: 'all-habits', component: AllHabitsComponent},
  { path: 'time-of-day', component: TimeHabitsComponent },
  {path: '', redirectTo: '/all-habits', pathMatch: 'full'}, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { HabitService } from "../Service/habit.service";
import { Habit } from "../Data Types/habit";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NavigationService } from "../Service/navigation.service";

@Component({
  selector: 'app-delete-dialogue',
  templateUrl: './delete-dialogue.component.html',
  styleUrls: ['./delete-dialogue.component.scss']
})
export class DeleteDialogueComponent implements OnInit {

  @ViewChild('deleteDialogue') deleteDialogue!: ElementRef;
  habit!: Habit;
  isDeleteDialogueOpen = false;

  constructor(private ref: DynamicDialogRef, private habitService: HabitService, private config: DynamicDialogConfig, @Inject(MAT_DIALOG_DATA) public data: {
    habit: Habit
  }, private navigationService: NavigationService) {
    this.habit = this.config.data.habit;
  }

  ngOnInit(): void {
    this.navigationService.addDialog(this.ref);
    setTimeout(() => {
      this.isDeleteDialogueOpen = true;
    }, 100);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const isLogHabitClick = this.deleteDialogue?.nativeElement.contains(event.target);
    if (!isLogHabitClick && this.isDeleteDialogueOpen) {
      this.closeDialog();
    }
  }

  closeDialog() {
    this.ref.close();
  }

  closeAllDialogs() {
    this.navigationService.closeAllDialogs();
  }

  deleteHabit() {
    this.habitService.deleteHabit(this.habit);
    this.closeAllDialogs();
  }
}

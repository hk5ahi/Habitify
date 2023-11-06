import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenu } from "@angular/material/menu";

@Component({
  selector: 'app-month-menu',
  templateUrl: './month-menu.component.html',
  styleUrls: ['./month-menu.component.scss']
})
export class MonthMenuComponent implements OnInit {

  @Input() selectedDates!: Date[];
  @ViewChild('days') editHabit!: ElementRef;
  @Output() onSelect = new EventEmitter<Date>();
  @ViewChild(MatMenu) menu!: MatMenu;
  @Output() habitItemSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  numberRows: number[][] = [];
  selectedNumbers: number[] = [];

  constructor() {
    this.populateNumberRows();
    this.selectedNumbers.push(1);
  }

  ngOnInit(): void {
    this.selectedNumbers = this.selectedDates.map(date => date.getDate());
  }

  getMenu(): MatMenu {
    return this.menu;
  }

  addSelectedDate(number: number, event: MouseEvent): void {
    event.preventDefault();
    const index = this.selectedNumbers.indexOf(number);

    if (index !== -1) {
      // Number is already present, remove it
      this.selectedNumbers.splice(index, 1);
    } else {
      // Number is not present, add it
      this.selectedNumbers.push(number);
    }
    const currentDate = new Date();
    currentDate.setDate(number);
    this.onSelect.emit(currentDate);
  }

  isDateIncluded(number: number) {
    return this.selectedNumbers.includes(number)
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const isHabitDialogClick = this.editHabit?.nativeElement?.contains(event.target);

    if (isHabitDialogClick) {
      this.habitItemSelected.emit(true);
    } else {
      this.habitItemSelected.emit(false);
    }
  }

  private populateNumberRows(): void {
    const totalNumbers = 31;
    const numbersPerRow = 7;

    for (let i = 1; i <= totalNumbers; i += numbersPerRow) {
      const row: number[] = [];

      for (let j = 0; j < numbersPerRow && i + j <= totalNumbers; j++) {
        row.push(i + j);
      }
      this.numberRows.push(row);
    }
  }
}

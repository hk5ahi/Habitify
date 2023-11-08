import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IntervalService } from "../Service/interval.service";

@Component({
    selector: 'app-alert-dialog',
    templateUrl: './alert-dialog.component.html'
})
export class AlertDialog {
    @ViewChild('alert') alertDialog!: ElementRef;

    constructor(
        private intervalService: IntervalService,
        public dialogRef: MatDialogRef<AlertDialog>) {
    }

    closeDialog() {
        this.dialogRef.close();
        this.intervalService.setIsAlertClicked(false);
    }

    // @HostListener('document:click', ['$event'])
    // onDocumentClick(event: Event) {
    //     if (this.alertDialog.nativeElement.contains(event.target)) {
    //         console.log('clicked inside');
    //     }
    // }

    closeAllDialog() {
        this.dialogRef.close();
        this.intervalService.setIsAlertClicked(true);
    }
}

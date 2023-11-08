import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { daysOfWeek } from "../Constants/app-constant";
import { MatMenu } from "@angular/material/menu";
import { TimeAndDayService } from "../Service/time-day.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-days-menu',
    templateUrl: './days-menu.component.html',
    styleUrls: ['./days-menu.component.scss']
})
export class DaysMenuComponent implements OnInit, OnDestroy {

    @Output() timeDay: EventEmitter<string> = new EventEmitter<string>();
    @Output() habitItemSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('Days') editHabit!: ElementRef;
    @Input() editModal: boolean = false;
    @Input() repeatValue!: string;
    @ViewChild(MatMenu) menu!: MatMenu;
    days: string[] = [];
    protected readonly daysOfWeek = daysOfWeek;
    private DaySubscription!: Subscription;

    constructor(private timeOfDayService: TimeAndDayService) {
    }

    ngOnInit(): void {
        this.DaySubscription = this.timeOfDayService.day$.subscribe((data) => {
            this.days = data;
        });
    }

    getMenu(): MatMenu {
        return this.menu;
    }

    toggleDay(day: string) {
        this.timeDay.emit(day);
    }

    checkDays(day: string): boolean {
        if (this.editModal && this.repeatValue) {
            const repeat = this.repeatValue.toLowerCase();
            const dayToCheck = day.toLowerCase();
            // Check if the repeat string contains either the abbreviated or full name of the day
            return repeat === 'daily' || repeat.includes(dayToCheck) || repeat.includes(dayToCheck.substring(0, 3));

        } else {
            return this.days.includes(day);
        }
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

    ngOnDestroy() {
        if (this.DaySubscription) {
            this.DaySubscription.unsubscribe();
        }
    }
}

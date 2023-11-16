import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Habit } from "../Data Types/habit";
import { AppConstants, iconMap, TimeOfDay } from "../Constants/app-constant";
import { NavigationService } from "../Service/navigation.service";
import { Subscription } from "rxjs";
import { MatMenuTrigger } from "@angular/material/menu";
import { HabitModalDialogueComponent } from "../habit-modal-dialogue/habit-modal-dialogue.component";
import { DialogService } from "primeng/dynamicdialog";
import { HabitService } from "../Service/habit.service";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { SidebarService } from "../Service/sidebar.service";
import { DeleteDialogueComponent } from "../delete-dialogue/delete-dialogue.component";

@Component({
    selector: 'app-manage-habits',
    templateUrl: './manage-habits.component.html',
    styleUrls: ['./manage-habits.component.scss']
})
export class ManageHabitsComponent implements OnInit, OnDestroy, OnChanges {

    @Input() habits: Habit[] = [];
    @ViewChild(MatMenuTrigger) manageHabitTrigger!: MatMenuTrigger;
    filteredHabits: Habit[] = [];
    selectedHabit!: number;
    searchValue!: string;
    searchValueSubscription!: Subscription;
    protected readonly AppConstants = AppConstants;
    protected readonly TimeOfDay = TimeOfDay;

    constructor(private NavigationService: NavigationService, private dialogService: DialogService, private habitService: HabitService, private titleService: Title, private router: Router, private sidebarService: SidebarService) {
    }

    ngOnInit(): void {
        this.filteredHabits = this.habits.filter(habit => !habit.isArchived);
        this.searchValueSubscription = this.NavigationService.manageSearchValue.subscribe((value) => {
            this.searchValue = value;
            this.filterHabits();
        });
        this.titleService.setTitle(AppConstants.manageHabitsTitle);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['habits'] && !changes['habits'].isFirstChange()) {
            this.filterHabits();
        }
    }

    filterHabits(): void {

        if (this.searchValue) {
            const lowerCaseSearch = this.searchValue.toLowerCase();
            this.filteredHabits = this.habits.filter(habit =>
                habit.name.toLowerCase().includes(lowerCaseSearch)
            );
        } else {
            this.filteredHabits = [...this.habits];
        }
    }

    openEditModal(habit: Habit) {
        this.dialogService.open(HabitModalDialogueComponent, {
            data: {
                habit: habit,
                editModal: true
            }
        });
    }

    getIconSource(habit: Habit): string {
        return iconMap[habit.name] || 'assets/svg/mark.svg';
    }

    updateSelectedHabit(habit: Habit, event: MouseEvent) {
        if (event.button !== 2) {
            this.selectedHabit = habit.id;
        }
        event.preventDefault();
    }

    openEditHabitMenu(event: MouseEvent) {
        if (event.button == 2) {
            event.preventDefault();
            this.manageHabitTrigger.openMenu();
        }
    }

    archiveHabit(habit: Habit) {
        this.habitService.toggleArchiveHabit(habit, true);
    }

    deleteHabit(habit: Habit) {
        this.dialogService.open(DeleteDialogueComponent,
            {
                width: '450px',
                height: '128px',
                data: {
                    habit: habit,
                }
            });
    }

    updateTimeOfDay(habit: Habit, timeOfDay: TimeOfDay) {
        this.habitService.updateTimeOfDay(habit, timeOfDay);
    }

    openProgressView(habit: Habit) {
        habit.showProgressView = true;
        this.habitService.updateHabit(habit);
        const navigationExtras = {
            state: {
                habit: habit,
            },
        };
        this.sidebarService.updateIsAllHabits();
        this.sidebarService.setShowManageHabits(false);
        this.router.navigate(['/all-habits'], navigationExtras);
    }

    ngOnDestroy(): void {
        if (this.searchValueSubscription) {
            this.searchValueSubscription.unsubscribe();
        }
    }

}

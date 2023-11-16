import { TimeOfDay } from "../Constants/app-constant";

export interface Habit {
  id: number;
  name: string;
  goalProgress: number;
  goal: number;
  Frequency: string;
  frequencyPerPeriod: string;
  timeOfDay: TimeOfDay[];
  repeat: string;
  repeatDates: string;
  startDate: Date;
  isArchived: boolean;
  isCompleted: boolean;
  isSkipped: boolean;
  isFailed: boolean;
  showLogValueBar: boolean;
  showOverLayPanel: boolean;
  showProgressView: boolean;
}

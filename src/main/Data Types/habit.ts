import { TimeOfDay } from "../Constants/app-constant";

export interface Habit {
  id: number;
  name: string;
  goal: number;
  Frequency: string;
  frequencyPerPeriod: string;
  timeOfDay: TimeOfDay[];
  repeat: string;
  startDate: Date;
  isArchived: boolean;
  isCompleted: boolean;
  isSkipped: boolean;
  isFailed: boolean;
  showLogValueBar: boolean;
}

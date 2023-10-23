export const AppConstants = {
  Morning: 'Morning',
  Afternoon: 'Afternoon',
  Evening: 'Evening',
  Today: 'Today',
  Yesterday: 'Yesterday',
  Tomorrow: 'Tomorrow',
  Alphabetical: 'Alphabetical',
  Times: 'Times',
  Daily: 'Daily',
  Per_Day: 'Per Day',
  allHabits: 'All Habits',
  habits_Order: 'My Habits Order',
  repeat: 'Repeat Every 2',
  months: 'Every month on the 1th',
  days: 'days',
  interval: 'interval',
  Month: 'months',
  habitsKey: 'habits',
};

export enum TimeOfDay {
  Morning = 'Morning',
  Afternoon = 'Afternoon',
  Evening = 'Evening',
  Anytime = 'Anytime',
}

type IconMap = {
  [key: string]: string;
};

export enum daysOfWeek {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday'
}

export const iconMap: IconMap = {
  "Meditate": "assets/svg/meditate-blue.svg",
  "Set A To-Do List": "assets/svg/to-do-blue.svg",
  "Drink Water": "assets/svg/drink-water-blue.svg",
  "Read Books": "assets/svg/read-books-blue.svg",
  "Running": "assets/svg/running-blue.svg",
  "Quick Stretch": "assets/svg/stretch-blue.svg",
  "Hit The Gym": "assets/svg/gym-blue.svg",
  "Swimming": "assets/svg/swimming-blue.svg",
  "Core Training": "assets/svg/training-blue.svg",
  "Practice Yoga": "assets/svg/yoga-blue.svg",
  "HIIT Cardio": "assets/svg/cardio-blue.svg",
  "Cycling": "assets/svg/cycling-blue.svg",
  "Go For A Walk": "assets/svg/cycling-blue.svg",
  "Get Good Sleep": "assets/svg/sleep-blue.svg",
  "Take A Cold Shower": "assets/svg/sleep-blue.svg",
}

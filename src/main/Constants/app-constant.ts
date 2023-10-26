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
  months: 'Every month on the 1st',
  days: 'days',
  interval: 'interval',
  Month: 'months',
  habitsKey: 'habits',
  gaolValue: 1,
  goalWater: 2000,
  runningValue: 3,
  cyclingValue: 5,
  waterFrequency: 'MI',
  runningFrequency: 'Km',
  drinkWater: 'Drink Water',
  running: 'Running',
  cycling: 'Cycling',
  active: 'Active',
  archived: 'Archived',

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
export const daysMapping: { [key: string]: string } = {
  'Mon': 'Monday',
  'Tue': 'Tuesday',
  'Wed': 'Wednesday',
  'Thu': 'Thursday',
  'Fri': 'Friday',
  'Sat': 'Saturday',
  'Sun': 'Sunday'
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
export const activeTabIndices = [0, 1, 2]

export const disabledDates: Date[] = (() => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Calculate the first day of the current month
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  // Calculate the last day of the current month
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Generate an array of all dates in the current month
  const allDatesInMonth = [];
  for (let d = new Date(firstDayOfMonth); d <= lastDayOfMonth; d.setDate(d.getDate() + 1)) {
    allDatesInMonth.push(new Date(d));
  }

  // Filter out today, yesterday, and tomorrow
  return allDatesInMonth.filter(
    date => !(
      date.toDateString() === today.toDateString() ||
      date.toDateString() === yesterday.toDateString() ||
      date.toDateString() === tomorrow.toDateString()
    )
  );
})();



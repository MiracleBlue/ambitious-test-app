import Ember from 'ember';

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function isValid24HourTime(time) {
  const isValidTime = !!time &&
                      !Ember.isEmpty(time) &&
                      time.length === 4 &&
                      isNumeric(time);

  return isValidTime;
}

export function getDayPeriod(hours) {
  if (hours >= 12) return 'pm';
  return 'am';
}

export function convertHoursTo12(hours) {
  if (hours > 12) return hours - 12;
  return hours;
}

// input 2310 -> output 11:10 pm
// input 0930 -> 9:30 am
export function convertTimeTo12({timeIn24, capitals}) {
  const hoursIn24 = parseInt(timeIn24.slice(0, 2));

  const hours = convertHoursTo12(hoursIn24);
  const minutes = timeIn24.slice(2, 4);
  const period = getDayPeriod(hoursIn24);

  const timeIn12 = `${hours}:${minutes} ${period}`;

  if (capitals) return timeIn12.toUpperCase();

  return timeIn12;
}

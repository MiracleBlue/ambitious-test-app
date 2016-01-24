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

// input 2310 -> output 11:10 pm
// input 0930 -> 9:30 am
export function convertTimeTo12({timeIn24, capitals}) {
  let suffix = 'am';
  let hours = parseInt(timeIn24.slice(0, 2));
  const minutes = timeIn24.slice(2, 4);

  if (hours >= 12) suffix = 'pm';

  if (hours > 12) hours = hours - 12;

  const timeIn12 = `${hours}:${minutes} ${suffix}`;

  if (capitals) return timeIn12.toUpperCase();

  return timeIn12;
}

export default Ember.Helper.extend({
  compute([timeIn24], {capitals}) {
    if (!isValid24HourTime(timeIn24)) return null;

    const timeIn12 = convertTimeTo12({timeIn24, capitals});

    return timeIn12;
  }
});

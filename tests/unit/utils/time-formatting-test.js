/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {convertTimeTo12, isValid24HourTime} from 'ambitious-app/utils/time-formatting';

import _ from 'lodash/lodash';
const {range, sample, times} = _;

const hoursAm = range(0, 11).map(num => num > 9 ? num.toString() : `0${num}`);
const hoursPm = range(13, 23).map(num => `${num}`);
const minutesRange = range(0, 59).map(num => `${num}`);

describe('TimeFormatHelper', function() {
  // We run these tests multiple times to make sure a good sample of inputs
  // gets run through the test process to weed out any odd bugs
  times(10, index => {
    it(`converts morning 24 hour time to 12 hour time with am suffix - round ${index + 1}`, function() {
      const hourIn24 = sample(hoursAm);
      const minuteIn24 = sample(minutesRange);
      const timeIn24 = `${hourIn24}${minuteIn24}`;

      const result = convertTimeTo12({timeIn24});

      const [hourIn12, minuteWithSuffix] = result.split(':');

      expect(parseInt(hourIn12)).to.equal(parseInt(hourIn24), `Hour in 12 (${hourIn12}) should equal hour in 24 (${hourIn24})`);
      expect(minuteWithSuffix).to.contain('am');
    });
  });

  times(10, index => {
    it(`converts afternoon 24 hour time to 12 hour time with pm suffix - round ${index + 1}`, function() {
      const hourIn24 = sample(hoursPm);
      const minuteIn24 = sample(minutesRange);
      const timeIn24 = `${hourIn24}${minuteIn24}`;

      const result = convertTimeTo12({timeIn24});

      const [hourIn12, minuteWithSuffix] = result.split(':');

      const hourIn24ToCompare = parseInt(hourIn24) - 12;
      const hourIn12ToCompare = parseInt(hourIn12);

      expect(hourIn12ToCompare).to.equal(hourIn24ToCompare, `Hour in 12 (${hourIn12}) should be hour in 24 minus 12 (${hourIn24ToCompare})`);
      expect(minuteWithSuffix).to.contain('pm');
    });
  });

  it(`converts noon 24 hour time to 12 hour time with pm suffix`, function() {
    const hourIn24 = '12';
    const minuteIn24 = sample(minutesRange);
    const timeIn24 = `${hourIn24}${minuteIn24}`;

    const result = convertTimeTo12({timeIn24});

    const [hourIn12, minuteWithSuffix] = result.split(':');

    const hourIn24ToCompare = parseInt(hourIn24);
    const hourIn12ToCompare = parseInt(hourIn12);

    expect(hourIn12ToCompare).to.equal(hourIn24ToCompare, `Hour in 12 (${hourIn12}) should be hour in 24 (${hourIn24ToCompare})`);
    expect(minuteWithSuffix).to.contain('pm');
  });
});

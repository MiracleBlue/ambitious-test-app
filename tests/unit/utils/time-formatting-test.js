/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {convertTimeTo12, isValid24HourTime} from 'ambitious-app/utils/time-formatting';

const testCases = [
  {input: {timeIn24: '0000', capitals: false}, output: '12:00 am'},
  {input: {timeIn24: '0001', capitals: false}, output: '12:01 am'},
  {input: {timeIn24: '0059', capitals: false}, output: '12:59 am'},
  {input: {timeIn24: '1159', capitals: false}, output: '11:59 am'},
  {input: {timeIn24: '1200', capitals: false}, output: '12:00 pm'},
  {input: {timeIn24: '1303', capitals: false}, output: '1:03 pm'},
  {input: {timeIn24: '1630', capitals: true}, output: '4:30 PM'},
  {input: {timeIn24: '2359', capitals: false}, output: '11:59 pm'}
];

describe('TimeFormattingUtils', function() {
  describe('#convertTimeTo12', () => {
    testCases.forEach(({input: {timeIn24, capitals}, output}) => {
      it(`should convert 24 hour time to 12 hour time (timeIn24: ${timeIn24}, capitals: ${capitals}, expected result: ${output})`, function() {
        const result = convertTimeTo12({timeIn24, capitals});

        expect(result).to.equal(output, `Result (${result}) should be equal to expected output (${output})`);
      });
    });
  });
});

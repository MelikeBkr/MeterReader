

const { questionOne, questionTwo} = require('./solutions');
'use strict';
const fs = require('fs');


test('find max diff in meter stream', () => {
    const streamData = fs.readFileSync('sample-input-readings.json');
    const meterReadingStream = JSON.parse(streamData);
    const exptectedObject = {
        cumulative :19667,
        readingDate : "2019-12-31T00:00:00.000Z"
    }
    
    expect(questionOne(meterReadingStream, 1)).toEqual(exptectedObject);
});


test('calculate an estimated reading at the end of each month', () => {
    const streamData2 = fs.readFileSync('sample-input-readings.json');
    const meterReadingStream2 = JSON.parse(streamData2);
    const resultArray = questionTwo(meterReadingStream2,1);
    
    expect(resultArray).toEqual(
    expect.arrayContaining([
    expect.objectContaining({estimatedRead:17609, date: '2019-03-31T00:00:00.000Z'}),
    expect.objectContaining({estimatedRead:17917, date: '2019-04-30T00:00:00.000Z'}),
    expect.objectContaining({estimatedRead:18152, date: '2019-05-31T00:00:00.000Z'}),
    expect.objectContaining({estimatedRead:18321, date: '2019-06-30T00:00:00.000Z'}),
    expect.objectContaining({estimatedRead:18453, date: '2019-07-31T00:00:00.000Z'}),
    expect.objectContaining({estimatedRead:18620, date: '2019-08-31T00:00:00.000Z'}),
    expect.objectContaining({estimatedRead:18776, date: '2019-09-30T00:00:00.000Z'}),
    expect.objectContaining({estimatedRead:19027, date: '2019-10-31T01:00:00.000Z'}),
    expect.objectContaining({estimatedRead:19385, date: '2019-11-30T00:00:00.000Z'}),
    expect.objectContaining({estimatedRead:19667, date: '2019-12-31T00:00:00.000Z'}),
    expect.objectContaining({estimatedRead:20006, date: '2020-01-31T00:00:00.000Z'}),
    expect.objectContaining({estimatedRead:20338, date: '2020-02-29T00:00:00.000Z'}),
    expect.objectContaining({estimatedRead:20533, date: '2020-03-30T23:00:00.000Z'})
    ]) 
    );  

  });

  
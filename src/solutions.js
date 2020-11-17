'use strict';
const fs = require('fs');

function questionOne(meterReadingArray,isSorted) 
  {
    if(meterReadingArray.length==1 || meterReadingArray==null)
    {
        return null;
    }

    if(!isSorted)
    {
        meterReadingArray.sort(function (a, b) 
        {
            return (Number(a.readingDate.match(/(\d+)/g)[0]) - Number((b.readingDate.match(/(\d+)/g)[0])));
        });
    }
    let maxValue = Number.MIN_VALUE;
    var maxRead = {
        cumulative :meterReadingArray[0].cumulative,
        readingDate :meterReadingArray[0].readingDate 
    }

    for (let i = 1; i < meterReadingArray.length; i++) 
    {
        let curr = meterReadingArray[i].cumulative;
        let prev = meterReadingArray[i-1].cumulative;
        if((curr - prev) > maxValue)
        {
            maxValue =  curr - prev;
            maxRead.cumulative = meterReadingArray[i].cumulative;
            maxRead.readingDate = meterReadingArray[i].readingDate; 
        }
    }

    return maxRead;
}


function questionTwo(meterReadingArray, isSorted) 
{
    var estimatedReadArray = [];
    if(meterReadingArray==null)
    {
        return null;
    }
  
    if(meterReadingArray.length==1)
    {
        let currDate = new Date(meterReadingArray[0].readingDate);
        let totalDaysInCurrMonth = daysInMonth(currDate);
        if(totalDaysInCurrMonth == currDate)
        {
            let currentEstimatedValue = 
            {
              estimatedRead :meterReadingArray[0].cumulative,
              date:currDate.toISOString()  
            }
            return currentEstimatedValue;
        }
        else
            return null; 
    }
  
    if(!isSorted)
    {
        meterReadingArray.sort(function (a, b) 
        {
            return (Number(a.readingDate.match(/(\d+)/g)[0]) - Number((b.readingDate.match(/(\d+)/g)[0])));
        });
    }
  
    for(let i=1; i<meterReadingArray.length; i++)
    {
        let currDate = new Date(meterReadingArray[i-1].readingDate);
        let nextDate = new Date(meterReadingArray[i].readingDate);
        let totalDaysInCurrMonth = daysInMonth(currDate);
        let currMonth = currDate.getMonth()+1;
        let nextMonth = nextDate.getMonth()+1;
        let currDay = currDate.getDate();
        let dayDistance = (totalDaysInCurrMonth-currDay)+nextDate.getDate();
        let readValueDiff = meterReadingArray[i].cumulative - meterReadingArray[i-1].cumulative;
        //finding unit value (estimation for one day energy consumption)
        let ratio = readValueDiff/dayDistance;
        
        //Calculte estimated value until current month and next month is same
        while(nextMonth != currMonth)
        {
            //the current cumulative value should be added to estimation as the cumulative will increase by adding prev. cumulative value
            let currEstimation = Math.floor((ratio*(totalDaysInCurrMonth-currDay))+meterReadingArray[i-1].cumulative);
		    
            currDate.setDate(totalDaysInCurrMonth);
            let currentEstimatedValue = 
            {
                estimatedRead :currEstimation,
                date:currDate.toISOString() 
            }
			
            estimatedReadArray.push(currentEstimatedValue);
		    
            currMonth++;
            //Modulo current month with 12
            if(currMonth>12) 
                currMonth =  1;
            //If currMonth and nextMonth values are consecutive
            //after incrementing the currMonth by 1 above
            //currMonth and nextMonth values ​​should be expected to be equal to each other
            //If nextMonth-currMonth>0, then  this means that currMonth and nextMonth are not consecutive
            if(nextMonth-currMonth>0)
            {
                //Updating day and month values ​​with appropriate values ​​for the next iteration
                let tmpMount = currMonth-1;
                //tmpMount = next month index
                currDate.setMonth((tmpMount));
                //first day of the month
                currDate.setDate(1);
                //how many days are in the relevant month
                totalDaysInCurrMonth = daysInMonth(currDate);
            }
  
        }
    }
    return estimatedReadArray;
}
  
///how many days are in the relevant month
function daysInMonth(currDate) 
{
    return new Date(currDate.getFullYear(), currDate.getMonth()+1, 0).getDate();
}

module.exports = {
    questionOne,
    questionTwo
};

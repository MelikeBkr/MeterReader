Tests cases are written to verify input and outputs by using Jest.
Test cases get sample streaming data as input and validate expected values for the requirements.


#Question 1

parameter 1: Pair containing cumulative and date data in the JSON array
parameter 2:  Flag for whether inputs are given as sorted based on dates or not.

Edge cases are evaluated for either the length of the given object array is 1 or the array of itself is null.

if isSorted flag is false -> Input array is sorted based on date.

I iterated in the input array from beginning to end and calculated the difference between the current value and the previous value and compared it with the global max value. 
When I complete the iteration by keeping my global max value always updated, I returned the meter reading object with the maximum increase.
Time spent: 30 minutes (Including tests)

------------------------------------------------------------------------------------------------------------------------------

#Question 2

parameter 1: Pair containing cumulative and date data in the JSON array
parameter 2:  Flag for whether inputs are given as sorted based on dates or not.

Firs edge cases are tested. If the input array is null, or length is 1 returns null. But if the length is 1 and it is the date of the last day of the month it returns it. 

if isSorted flag is false -> Input array is sorted based on date.

I started by simplifying the question and solving its simplified version first. 
So I treated it as if there were no months missing and the data in the JSON array was increasing at regular intervals.
By converting the dates in ISO format to Date format, I made the operations easier.
Since I will be dealing with a lot of data, and in order to increase readability and understandability, 
I created as many variables as possible, by giving understandable names.
By iterating the input array from beginning to end;
 - I assigned the day and month values ​​of the current date and the next date to separate variables
 - I calculated how many days the current date remains until the end of the relevant month. 
 - I summed up this value and the daily value for the next date and reached the total number of days between the two dates.
 - I calculated the amount of energy used in these two date ranges.
 - I calculated the unit value by dividing the total amount of energy used by the total number of days between these two dates.
 - Then, I used this unit value (ratio) to estimate how much energy will be consumed during the remaining period from the readDate value until the end of that month. 
 - The number of days remaining multiplied by this unit will give the amount of energy likely to be spent on the remaining days.
 - By adding this value to the current month reading, I found the estimated reading for the end of the month.


Finally, taking into account the corner cases (missing months, not making estimation for the last month), I completed the question.
missing months case-> I checked the month difference between the current date and the next date. If the month difference is more than one, 
I looped in while until the months are equal and calculated the estimated reading value for each upcoming month.

Not making estimation for the last month -> If the month value of the current date is equal to the month value of the next date, no estimation is made

Time spent: 80 minutes (Including tests)



Technologies and tools used: VS Code, Node.js, Jest

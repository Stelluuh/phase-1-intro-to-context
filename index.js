// Your code here

//takes an array of an employee's data and creates and object with key:value pairs Where teh values are given in array.
function createEmployeeRecord(array) {
   return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
   }
}

//takes an array of employee data(which is an array itself), use .map to loop through each array. and for each array, it will passed as an argument when createEmployeeRecord is invoked.

function createEmployeeRecords(arrOfEmployeeData) {
   return arrOfEmployeeData.map(employee => createEmployeeRecord(employee))
}


//it adds a timeIn event Object(punchIn) to an employee's record of timeInEvents(this is a key inside the record) when provided an employee record and Date/Time String and returns the updated record
/*  
goal:
firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [
         type: "TimeIn",
         hour: 8,
         date: 2022 14 2 06:00:00 
      ],
*/
function createTimeInEvent(empRecObj, dateStamp) {
   let [date, hour] = dateStamp.split(' ')
   let punchIn = {
      type: "TimeIn", 
      hour: parseInt(hour, 10),
      date: date
   };
   
   empRecObj.timeInEvents.push(punchIn)

   return empRecObj
}

function createTimeOutEvent (empRecObj, dateStamp) {
   let [date, hour] = dateStamp.split(' ')
   let punchOut = {
      type: "TimeOut", 
      hour: parseInt(hour, 10),
      date: date
   };
   
   empRecObj.timeOutEvents.push(punchOut)

   return empRecObj
}
  
function hoursWorkedOnDate(empRecObj, dateOnForm) {
   let dateIn = empRecObj.timeInEvents.find(element => element.date === dateOnForm)

   let dateOut = empRecObj.timeOutEvents.find(element => element.date === dateOnForm)

   return (dateOut.hour - dateIn.hour)/100
}

function wagesEarnedOnDate(empRecObj, dateOnForm) {
   return hoursWorkedOnDate(empRecObj, dateOnForm) * empRecObj.payPerHour
}


function allWagesFor(empRecObj) { 
   
   //grab the ARRAY of dates the employee worked
   // console.log(empRecObj)
   let eligibleDates = empRecObj.timeInEvents.map(element => element.date)
   console.log('eligible dates: ', eligibleDates)

   //with the dates, we use .reduce() to aggregate sum of wages owed on days/hours worked.
   let totalWages = eligibleDates.reduce((acc, date) => {
      // console.log('acc: ', acc);
      // console.log('date: ', date)
      return acc += wagesEarnedOnDate(empRecObj, date)
   }, 0)

   // function reducer(acc, date) {
   //    acc += wagesEarnedOnDate(employee, date)
   // }
return totalWages

}

function calculatePayroll(arrOfEmpRec) {
   // Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.
   //aggregate all dates' wages and adds them together => reduce()
   console.log('array of Employee: ', arrOfEmpRec)
   
   return arrOfEmpRec.reduce((acc, record) => acc += allWagesFor(record), 0)
} 
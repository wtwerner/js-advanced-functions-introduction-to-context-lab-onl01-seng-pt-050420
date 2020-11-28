function createEmployeeRecord(arr) {
    let record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return record
}

function createEmployeeRecords(data) {
    return data.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(record, time) {
    let event = {}
    event.type = "TimeIn"
    event.date = time.split(" ")[0]
    event.hour = parseInt(time.split(" ")[1])
    record.timeInEvents.push(event)
    return record
}

function createTimeOutEvent(record, time) {
    let event = {}
    event.type = "TimeOut"
    event.date = time.split(" ")[0]
    event.hour = parseInt(time.split(" ")[1])
    record.timeOutEvents.push(event)
    return record
}

function hoursWorkedOnDate(record, time) {
    let timeIn = record.timeInEvents.find(e => e.date == time)
    let timeOut = record.timeOutEvents.find(e => e.date === time)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(record, time) {
    return hoursWorkedOnDate(record, time) * record.payPerHour
}

function allWagesFor(record) {
    let dates = record.timeInEvents.map(r => r.date)
    return dates.reduce(function(total, date) {
        return wagesEarnedOnDate(record, date) + total
    }, 0)
}

function calculatePayroll(arr) {
    return arr.reduce(function(total, record) {
        return total + allWagesFor(record)
    }, 0)
}

function findEmployeeByFirstName(arr, name) {
    return arr.find(r => r.firstName === name)
}
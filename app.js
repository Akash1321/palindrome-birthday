/*

constituents of Palindrome check

// 1. reverse of the given string
// 2. check reverse of the given string
// 3. make the type to string for better reversing and not caught by type coersion add 0 before number less than 10
// 4. get all the date formats
// 5. check for all date formats
// 6. check for next palindrome to come
// 7. way to go to the next dates
8. check for palindrome with the enered date on click of the button and if not true check for the next one.




*/

function reverseInput(input) {

    var reversedInput = input.split("").reverse().join("");

    return reversedInput

}

function checkPalindrome(input) {

    var toCheck = reverseInput(input);

    return toCheck === input

}

function changeToString(date) {
    var dateStr = {
        day: "",
        month: "",
        year: ""
    }

    if (date.day < 10) {
        dateStr.day = "0" + date.day
    } else {
        dateStr.day = date.day.toString()
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function allDateFormats(date) {
    var dates = changeToString(date);

    let ddmmyyyy = dates.day + dates.month + dates.year;
    let mmddyyyy = dates.month + dates.day + dates.year;
    let yyyymmdd = dates.year + dates.month + dates.day;
    let ddmmyy = dates.day + dates.month + dates.year.slice(-2);
    let mmddyy = dates.month + dates.day + dates.year.slice(-2);
    let yymmdd = dates.year.slice(-2) + dates.month + dates.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]

}

function checkForAllDateFormats(date) {
    var allFormatDates = allDateFormats(date);
    var result = false;

    for (let i = 0; i < allFormatDates.length; i++) {
        if (checkPalindrome(allFormatDates[i])) {
            result = true;
            break;

        }

    }
    return result;

}

function checkLeapYear(year) {
    if (year % 400 === 0) {
        return true
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true
    }
    return false
}

var monthDayList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function goToNextDate(date) {

    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    if (month === 2) {
        if (checkLeapYear(year)) {

            if (day > 29) {
                day = 1;
                month++;
            }

        } else {

            if (day > 28) {
                day = 1;
                month++;
            }
        }

    } else {

        if (day > monthDayList[month - 1]) {
            day = 1;
            month++;
        }

    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day,
        month,
        year
    }

}

function goToPreviousDate(date) {

    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

        if (checkLeapYear(year) && month === 3){
            day = 29
            month--
        } if (day === 0){
            day = monthDayList[month-2]
            month--
        } if(month === 0 ){
            day = 31;
            month = 12;
            year--
        }
  
    return {
        day,
        month,
        year
    }

}



function checkNextPalindrome(date) {

    var plusCountDays = 0;
    var nextDay = goToNextDate(date);

    while(1) {
        plusCountDays++
        var isPalindrome = checkForAllDateFormats(nextDay);
        if (isPalindrome) {
            break;
        }

        nextDay = goToNextDate(nextDay);

    }

    return [plusCountDays, nextDay];

}

function checkPreviousPalindrome(date) {

    var minusCountDays = 0;
    var previousDay = goToPreviousDate(date);

    while(1){
        minusCountDays++
        let isPalindrome = checkForAllDateFormats(previousDay);
        if (isPalindrome) {
            break;
        }

        previousDay = goToPreviousDate(previousDay);

    }

    return [minusCountDays, previousDay];

}


var userInput = document.querySelector("#date-input");
var checkButton = document.querySelector("#check-button");
var displayOutput = document.querySelector("#output-box");



function checkButtonHandler() {
    var dateTaken = userInput.value;

    if (dateTaken !== "") {
        var splitDate = dateTaken.split("-");
        var date = {
            day: Number(splitDate[2]),
            month: Number(splitDate[1]),
            year: Number(splitDate[0])

        }

        var palindromeCheck = checkForAllDateFormats(date);
        if (palindromeCheck) {

            displayOutput.innerText = "Yay! Your Bithday is a palindrome"
            displayOutput.style.color = "green"
        } else {
            var [plusCountDays, nextDay] = checkNextPalindrome(date);
            var [minusCountDays, previousDay] = checkPreviousPalindrome(date);

            if(plusCountDays < minusCountDays){

                displayOutput.innerText = `It's not palindrome you missed it by ${plusCountDays} days which is exactly ${nextDay.day}-${nextDay.month}-${nextDay.year}`
            } else {
                displayOutput.innerText = `It's not palindrome you missed it by ${minusCountDays} days which is exactly ${previousDay.day}-${previousDay.month}-${previousDay.year}`
            }

            displayOutput.style.color = "red"

        }
    } else {
        displayOutput.innerText = "You have to enter a date" 
        displayOutput.style.color = "red"
    }



}

checkButton.addEventListener("click", checkButtonHandler)











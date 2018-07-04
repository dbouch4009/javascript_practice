//All of functions lesson goes here
function calculateAge(yearOfBirth){
    var age = 2018 - yearOfBirth;
    console.log("Age is: " + age);
    return age;
}

function calculateYearsTilRetirement(yearOfBirth, name){
    var timeUntil = 65 - (2018 - yearOfBirth);
    if(timeUntil < 0){
        console.log(name + " already retired");
        return null;
    } else{
        return timeUntil;
    }
}

var ageSam = calculateAge(1988);
console.log("Sam's age is: " + ageSam);

var retireSam = calculateYearsTilRetirement(1988,'Sam');
console.log(retireSam + " years  until Sam retires");

var ageMary = calculateAge(1948);
var retireMary = calculateYearsTilRetirement(1948,'Mary');
console.log(retireMary + " years until Mary retired");

//Statements vs Expressions
//These are statements
//function someFun(parameter){
    //code
//}

//var moreFun = function(param){
    //code
//}

//Expressiosn:
3 + 4;
var x = 3;

//Statements
if(x === 5){
    //do stuff
}

//Expression creates a value, statement just does actions

//Arrays
var myNames = ['John','Mary','Damian','Em'];
var birthYears = new Array(1990,1978,1991,1966);

console.log(myNames);
console.log(birthYears);

console.log(myNames[0] + ", " + myNames[1]);
console.log(birthYears[0]);

myNames[0] = 'Andrew';
console.log(myNames[0]);  //Now this element of the array is Andrew

//Arrays can have multiple types
var john = ['John','Barnes',1990,'banker',false];  //Many different types in one array

john.push('orange');  //push() adds elements to the end
console.log(john);

john.unshift('Mr');  //unshift() adds to the start
console.log(john);  

john.pop();  //removes final element
console.log(john);

john.shift();  //removes first element
console.log(john);

john.indexOf('Banres');  //returns index of a specified element

if(john.indexOf('banker') === 3){
    console.log("John is a banker");
} else{
    console.log("Jon is NOT a banker");
}

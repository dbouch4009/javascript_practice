/*
var userName = "John";
var stringOne = "Be safe:";
var stringTwo = "only use pink erasers";
var fullAge = true;
var age = 23;

console.log("Still busy, my friend");
console.log("Ultimate power");
console.log("Supreme overlord");
console.log("Name is: " + userName + " age is: " + age);
console.log(stringOne + " " + stringTwo);
console.log(fullAge);
age += 5;
console.log("Name is: " + userName + " age is: " + age);
var job, isMarried;

console.log(job);
console.log(isMarried);

isMarried = true;
job = "Banker";


console.log("Job: " + job);
console.log("Is Married: " + isMarried);

console.log("Name is: " + userName + " age is: " + age + " Job is: " + job + "Is married? " + isMarried);

age = 44;
job = "Driver";

console.log("Name is: " + userName + " age is: " + age + " Job is: " + job + "Is married? " + isMarried);

//var lastName = prompt("What is " + name + "'s last name?");
var lastName = "Sling";

console.log("Name is: " + userName + " " + lastName + " age is: " + age + " Job is: " + job + "Is married? " + isMarried);

//alert("Great work");

//Operators Work
var now = 2016
var birthYear = now - age;

console.log("Birth year: " + birthYear);

var ageJohn = 44;
var ageMark = 22;
console.log("Mark: " + ageMark);
console.log("John: " + ageJohn);

ageJohn = ageMark = 55;

console.log("Mark: " + ageMark);
console.log("John: " + ageJohn);

ageJohn = 77;

console.log("Mark: " + ageMark);
console.log("John: " + ageJohn);

ageMark = 22;

console.log("Mark: " + ageMark);
console.log("John: " + ageJohn);
*/

//If/Else
/*
var firstName = 'John';
var age = 33;
var isMarried = false;

if(isMarried ==='yes'){
        console.log(firstName + " is married");
    }
else{
    console.log(firstName + " is single");
}

//== incldes type coercion, === does not include type coersion

if(3>2>1){
    console.log("3>2>1 is true");
    //returns false
}

if(1<2<3){
    console.log("1<2<3 is true");
    //returns true
}
    
if(23 =="23"){
    console.log("23 is equal to '23' due to type coercion and ==");
    }

if(23 !== "23"){
    console.log("23 !== '23' due to type coercion not executing");
}

if(1<2 == 2<3){
    console.log("1<2 == 2<3 is true");
}

if(3>2 == 2>1){
    console.log("3>2 == 2>1 is true");
}

if(1<2 === 2<3){
    console.log("1<2 === 2<3 is true");
}

if(3>2 === 2>1){
    console.log("3>2 === 2>1 is true");
}
*/

//Switch Statements
/*
var name = "Tony";
var age = 16;
var job = 'cop';

if(age < 20){
    console.log(name + " is a teenager.");
}
else{
    console.log(name + " is a man.");
}

age = 22;
if(age > 19 && age < 30){
    console.log("Tony is a young man");
}

switch(job){
    case('teacher'):
        console.log(name + " is a teacher");
        break;
    case('cop'):
        console.log(name + " is a cop");
        break;
    default:
        console.log(name + " has some job");
}
*/

//Coding challenge: heigh and age game
var nameOne = "Greg" ;
var nameTwo = "Poulterer" ;
var nameThree = "Sczimanski";

var heightOne = Number(prompt("What is " + nameOne + "'s height?"));
var ageOne = Number(prompt("What is " + nameOne + "'s age?"));

var heightTwo = Number(prompt("What is " + nameTwo + "'s height?"));
var ageTwo = Number(prompt("What is " + nameTwo + "'s age??"));

var heightThree = Number(prompt("What is " + nameThree + "'s height??"));
var ageThree = Number(prompt("What is " + nameThree + "'s age??"));

var scoreOne = ((heightOne * 5) + ageOne);
var scoreTwo = ((heightTwo * 5) + ageTwo);
var scoreThree = ((heightThree * 5) + ageThree);

console.log("ScoreOne: " + scoreOne);
console.log("ScoreTwo: " + scoreTwo);
console.log("ScoreThree " + scoreThree);

if(scoreOne > scoreTwo && scoreOne > scoreThree){
    gameWinner = nameOne;
}else if(scoreTwo > scoreOne && scoreTwo > scoreThree){
    gameWinner = nameTwo;
}else if(scoreThree > scoreOne && scoreThree > scoreTwo){
    gameWinner = nameThree;
}else{
    gameWinner = null;
}


var gameWinner

switch(gameWinner){
    case(nameOne):
        console.log(nameOne + " won the game with a score of: " + scoreOne);
        break;
    case(nameTwo):
        console.log(nameTwo + " won the game with a score of: " + scoreTwo);
        break;
    case(nameThree):
        console.log(nameThree + " won the game with a score of: " + scoreThree);
        break;
    default:
        console.log("The game was a tie");    
}

//Function constructor

var personOne = {
	name: 'John',
	yearOfBirth: 1990,
	job: 'teacher'
};

var Person = function(nameInput, yearIn, jobIn){
	this.name = nameInput;
	this.yearOfBirth = yearIn;
	this.job = jobIn;	
};

Person.prototype.calculateAge = function(){
	console.log('Age of ' + this.name + ' is ' + (2018 - this.yearOfBirth));
	};

// using Constructor with Instantiation
var personTwo = new Person('Billy',1979,'banker');
var personThree = new Person('Amos',1960,'calligrapher');

// personOne.calculateAge();  this will not work because it was not part of the Person prototype class.
personTwo.calculateAge();
personThree.calculateAge();

Person.prototype.lastName = 'Smith';

// Both of these are given the same last name, thanks to the prototype right here
console.log(personTwo.lastName);
console.log(personThree.lastName);

//using Object.create()
var personProto = {
	calculateAge: function(){
		console.log(2018 - this.yearOfBirth);
	},
	introduceMe: function(){
		console.log("Hello, I am " + this.name + " and I am a " + this.job + ".");
	}
}

var personFour = Object.create(personProto);
personFour.name = 'Abe';
personFour.yearOfBirth = 1990;
personFour.job = 'artist';

var personFive = Object.create(personProto, 
{
	name: {value: 'Emma'},
	job: {value: 'teacher'},
	yearOfBirth: {value: 1973}
});

//Primitives vs objects
/* primitive variables contain the value, but objects contain a reference to the
 memory where it is stored
*/

var numOne = 23;
var numTwo = 89;
console.log("Num One: " + numOne);   //numOne is 23
console.log("Num Two: " + numTwo); 
numTwo = 101;
console.log("Num One: " + numOne);   //numOne is now 89
console.log("Num Two: " + numTwo);  //numTwo is still 23
numTwo = numOne;
console.log("Num One: " + numOne);   // now both are 23
console.log("Num Two: " + numTwo);  
numTwo = 909;
console.log("Num One: " + numOne);  //stil 23
console.log("Num Two: " + numTwo);  // now 909

var objOne = {
	name: 'John',
	age: 26
};

var objTwo = objOne;   //this assigns them to the same location in memory
objOne.age = 98;   
console.log(objOne.age);
console.log(objTwo.age);   //both are the same output
objTwo.age = 77;
console.log(objOne.age);
console.log(objTwo.age);   

// functions being accepted as arguments
var years = [1990,1965,1933,1943,2005];

function arrayCalc(arrIn, calculateFn){
	var arrResult = [];
	for(var i = 0; i < arrIn.length; i++){
		arrResult.push(calculateFn(arrIn[i]));
	}
	return arrResult;
}

//callback function is a function called by another function
function calculateAge(element){
	return 2018 - element;
}

function isFullAge(element){
	return element >= 18;
}

function maxHeartRate(element){
	if(element >= 18 && element <= 81){
		return Math.round(206.9 - (0.67 * element));
	}
	else{
		return -1;
	}
}

var agesArray = arrayCalc(years, calculateAge);
console.log(agesArray);

var fullAgeArray = arrayCalc(agesArray, isFullAge);  //now making a different callback
console.log(fullAgeArray);

var maxHeartRateArray = arrayCalc(agesArray, maxHeartRate);
console.log(maxHeartRateArray);

//functions returning functions
// JS functions are 'first-class functions', meaning essentially objects
function interviewQuestion(job){
	if(job === 'designer'){
		return function(name){
			console.log(name + ', can you please explain what UX is?');
		}		
	}
	else if(job === 'teacher')
		return function(name){
			console.log(name + ', what subject do you teach?');
		}
	else{
		return function(name){
			console.log('Hello ' + name + ', what do you do?');
		}
	}
}

var questionOne = interviewQuestion('teacher');

questionOne('Bonham');

var questionTwo = interviewQuestion('designer');

questionTwo('Jones');

var questionThree = interviewQuestion('plebs');

questionThree('Mark');

//passing arguments into anonymous functions
interviewQuestion('teacher')('Abraham');

// IIFE Immediately Invoked Function Expressions
function game(){
	var score = (Math.random() * 10);
	console.log("First score is: " + score);
}
game();

//same thing as an IIFE
(function(name) {
	var score = Math.random() * 10;
	console.log("Seconed score is " + score + " for " + name);	
})(personFour.name);

//Putting it inside of parentheses tells JS that it is an expression, not a declaration
// the following () immediately invokes the defined function

// Closures!!
function findRetirement(retirementAge){
	var sentence = ' years left until retirement.';  //these out function properties remain in scope
	return function(yearOfBirth){
		var age = 2018 - yearOfBirth;
		console.log((retirementAge - age) + sentence);
	}
}

findRetirement(65)(1988);

var retirementUS = findRetirement(70);  //using enclosures; the inner function variables miraculously remain
retirementUS(1988);  //an inner function always has access to properties of its outer function

var retirementMexico = findRetirement(100);
retirementMexico(1988);

var retirementGermany = findRetirement(80);
retirementGermany(1988);

function interviewQuestion(job){
	var returnSentence = "";
	var sentenceDesigner = "Can you explain UX?";
	var sentenceTeacher = "What do you teach?";
	var sentenceGeneric = "Hello, good to meet you.";

	if(job === 'Designer'){
		returnSentence = sentenceDesigner;
	} else if(job === 'Teacher'){
		returnSentence = sentenceTeacher;
	} else{
		returnSentence = sentenceGeneric;
	}
	return function(name){
		console.log(name + ", " + returnSentence);
	}
}

var interviewTeacher = interviewQuestion('Teacher');
var interviewDesigner = interviewQuestion('Designer');
var interviewGeneric = interviewQuestion('Electrician');

interviewTeacher('Bobby Brown');
interviewGeneric('Mark Sandusky');
interviewDesigner('Ben Martin');

//Bind, Call, and Apply
var personSix = {
	name: 'Paul',
	age: 30,
	job: 'technician',
	presentation: function(style, timeOfDay){
		if(style === 'formal'){
			console.log('Good ' + timeOfDay + ' ladies and gentlemen. I am ' + this.name + ' and I am a ' + this.age + ' year old ' + this.job + '.');
		} else if(style === 'friendly'){
			console.log('Howdy! I am ' + this.name + ' and I am a ' + this.age + ' year old ' + this.job + '. Have a good ' + timeOfDay);
		}
	}
}

personSix.presentation('formal','morning');
personSix.presentation('friendly','night');

var personSeven = {
	name: 'Emily',
	age: 31,
	job: 'instructor'
};

//Method Borrowing, applying method to a different object in which it is not defined. 'call' method
personSix.presentation.call(personSeven, 'friendly','afternoon');  

//apply passes in arrays
//personSix.presentation.apply(personFive, ['friendly','afternoon']);  

//bind generates a copy of the function
var personFriendly = personSix.presentation.bind(personSix,'friendly');
personFriendly('late night');  //bind reduces need for repetition
personFriendly('early morning');


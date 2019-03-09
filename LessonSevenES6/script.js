//let and const

//ES5 code
var name5 = 'John Smith';
var age = 23;
name5 = 'John Miller';

var addSpaceAndComma = function(display){
    display.textContent += ', ';
}

console.log(name);
/*
const name6 = 'John Smith';  //const variables are immutable
let age6 = 23;               // let variables are mutable
//name6 = 'John Miller';
console.log(name6);
*/

//
function driversLicenseES5(passedTest){
    if(passedTest){
        var firstName = 'John';
        var yearOfBirth = 1990;
        console.log(firstName + ' ' + yearOfBirth + ' is allowed to drive');
    }
}

driversLicenseES5(true);

function driversLicenseES6(passedTest){  //
    if(passedTest){
        let firstName = 'John';  //let and const are block-scoped, not function-scoped
        const yearOfBirth = 1990;
        console.log(firstName + ' ' + yearOfBirth + ' is allowed to drive');
    }
    
    //console.log(firstName + ' and ' + yearOfBirth);  //this will fail, because they are out of block scope
}

driversLicenseES6(true);  //let can be assigned a value inside of a block and used outside of it, but const cannot

let num = 23;
console.log(num);
for (let num = 0; num <= 5; num++){
    console.log(num);
}

console.log(num);  //will display initial value of num

var num2 = 46;
console.log(num2);
for (var num2 = 0; num2 <= 5; num2++){
    console.log(num2);
}
 
console.log('final output: ' + num2);  //displays 46, because var is not block scoped

//data privacy in ES6, Blocks and IIFEs
{
    const a = 1;
    let b = 2;
    var c = 3;
}

//not accessible from outside the blocks
//console.log(a);
//console.log(b);
console.log(c);


//ES5 data privacy
(function(){
    var d = 3;
})();

//console.log(d); not accessible

//ES6 Strings
let personOne = 'John';
let personTwo = 'Slick';
const yearOfBirthOne = 1990;

function calculateAge(year){
    return 2018 - year;
}

//The ES5 way
console.log('This is ' + personOne + ' and ' + personTwo + ' born in ' + yearOfBirthOne + ', ' + calculateAge(yearOfBirthOne) + ' years old.');

//The ES6 way, Template Literals
console.log(`This is ${personOne} and ${personTwo} born in ${yearOfBirthOne}, ${calculateAge(yearOfBirthOne)} years old.`);

const n = `${personOne} ${personTwo}`;
console.log('Starts With');
console.log(n.startsWith('J'));  //returns true
console.log(n.startsWith('p'));  //returns false

console.log('Ends With');
console.log(n.endsWith('k'));  //returns true
console.log(n.endsWith('t'));  //returns false

console.log('Includes');
console.log(n.includes(' ')); //returns true

console.log('Repeats');
console.log((n + ' ').repeat(5));


//Arrow Functions
const years = [1989, 1945, 1931, 1982];

//ES5 mapping
var ages5 = years.map(function(el){  //el is each element of the array
    return 2018 - el;
});
console.log(ages5);

//ES6 way
let ages6 = years.map(el => 2018 - el);
console.log(ages6);

ages6 =  years.map((el, index) => `Age element is ${index + 1}: ${2018 - el}`);
console.log(ages6);

let ages7 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element is ${index + 1}: ${age}`
});

console.log(ages7);


//Arrow functions lexical 'this'

//ES5 version
var box5 = {
    color:'green',
    position:1,
    clickMe: function(){  //this. points to the window object, not the box object
        var that = this;  // so we reassign it in this manner
        document.querySelector('.green').addEventListener('click', function(){
            var str = 'This is box number ' + that.position + ' and it is ' + that.color;
            alert(str);
        });
    }
}
//box5.clickMe();

//ES6 version
const box6 = {
    color:'light blue',
    position:2,
    clickMe: function(){  //this. points to the window object, not the box object
                            // arrow function allows it to share access to this. keyword
        document.querySelector('.blue').addEventListener('click', ()=>{
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box6.clickMe();

//double arrow function
const box4 = {
    color:'light blue',
    position:2,
    clickMe: function(){  //this. points to the window object, not the box object
                            // arrow function allows it to share access to this. keyword
        document.querySelector('.blue').addEventListener('click', ()=>{
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box6.clickMe();

function Person5(firstIn, friendsIn){
    this.firstName = firstIn;
    this.friends = friendsIn;
}

var personThree = new Person5('George Gameson',['prank','fool','billybob']);
Person5.prototype.showMyFriendsAlt = function(){
    for(var i = 0; i < this.friends.length; i++){
        console.log(this.firstName + ' is friends with ' + this.friends[i]);
    }
}

personThree.showMyFriendsAlt();

Person5.prototype.createFriendsArray = function(){
    var arr = [];
    for(var i = 0; i < this.friends.length; i++){
        arr[i] = this.firstName + ' is a returned array friend with ' + this.friends[i];
    }
    return arr;   
}

console.log(personThree.createFriendsArray());

//ES5 way
Person5.prototype.myFriends5= function(friends){
    var arr = friends.map(function(el){
        return this.firstName + ' is friends with ' + el;
    }.bind(this));  //keeping a copy of this. in the nested function
    console.log(arr);
}

var friends = ['Bob','Jane','Mary','Mark'];

new Person5('Blake').myFriends5(friends);

//ES6
Person5.prototype.myFriendsES6= function(friends){
    var arr = friends.map((el) =>{        
        return this.firstName + ' is arrow function friends with ' + el;
    });    
    console.log(arr);
}

new Person5('Carlini').myFriendsES6(friends);

//Destructuring - extracting data from data structure
//ES5
var personFour = ['Perry',28];
var fourName = personFour[0];
var fourAge = personFour[1];

//ES6
const [ES6name,ES6age] = ['Perry',26];
console.log(ES6name + ' ' + ES6age);

const obj = {
    firstName: 'Prank',
    lastName: 'Hoedown'
}

const {firstName, lastName} = obj;
console.log(firstName + ' ' + lastName);


//Arrays in ES6
const boxes = document.querySelectorAll('.box');  //returns node list, not an array

//transforming it into an array, ES5
var boxesArrES5 = Array.prototype.slice.call(boxes); //now we can use Array library

boxesArrES5.forEach(function(el){
    el.style.backgroundColor = 'dodgerblue';
});

//ES6 way
const boxesArrES6 = Array.from(boxes);
//boxesArrES6.forEach(el => el.style.backgroundColor = 'pink');

//ES5 loops
for(var i = 0; i < boxesArrES5.length; i++){
    if(boxesArrES5[i].className === 'box blue'){
        continue;
    }
    
    boxesArrES5[i].textContent = 'I changed to blue!';    
}

//ES6 loops
for(const el of boxesArrES6){
    el.style.backgroundColor = 'orange';
    console.log('Changed to orange');
}

for(const el of boxesArrES6){
    if(el.className.includes('orange')){
        continue;
    }
    el.textContent = 'I changed to orange!';
}

//ES5 finding elements of array
var ages = [12,17,8,21,14,11];
var adultAge = ages.map(function(el){
    return el > 17;
});

var activeBox = document.querySelector('[title="boxOne"]')
activeBox.textContent = adultAge;

var fullAgeIndex = adultAge.indexOf(true);
activeBox.textContent += fullAgeIndex;

//ES6 finding elements of array

var ES6IndexAges = ages.findIndex(el => el > 17);
var ES6Age = ages.find(el => el > 17);
activeBox = document.querySelector('[title="boxTwo"]');
activeBox.textContent = ES6IndexAges;
activeBox.textContent += (', ' + ES6Age);

//Spread operator, same as if writing elements individually
activeBox = document.querySelector('[title="boxThree"]');
function addFourNums (a,b,c,d){
    return a + b + c + d;
}

var addThreeNums = function(a,b,c){
    return a + b + c;
}

var sumOne = addFourNums(18,30,12,21);
activeBox.textContent = sumOne;
addSpaceAndComma(activeBox);
var sumTwo = addThreeNums(10,11,12);
activeBox.textContent += sumTwo;
addSpaceAndComma(activeBox);
var numSetOne = [12,14,100,5];
var numSetTwo = [5,12,15];

var sumThree = addThreeNums.apply(null, numSetTwo);

activeBox.textContent += sumThree;
addSpaceAndComma(activeBox);

//ES6 Spread Operator
const sumFour = addFourNums(...numSetOne);
activeBox.textContent += sumFour;

const header = document.querySelector('h1');
const boxesSpread = document.querySelectorAll('.box');

const allElements = [header, ...boxesSpread];

Array.from(allElements).forEach(el => el.style.color = 'purple');

//Rest Parameters

//ES5
function isFullAgeES5(){  //arg keyword is for indeterminate number of arguments
    //console.log(arguments);
    var argsArray = Array.prototype.slice.call(arguments);
    
    argsArray.forEach(function(el){
        console.log((2018 - el) > 17);
    })
}

isFullAgeES5(1990,1999,2009);

isFullAgeES5(2009,2009,20092,2009);

//ES6
function isFullAgeES6(...years){
    //console.log(years);
    years.forEach(el => console.log((2018 - el) > 17));
}

isFullAgeES6(2009,2009,2009,2009);


//Default Parameters in constructors ES5
function Smithperson (firstIn,yearBirthIn,lastIn,nationalityIn){
    
    lastIn === undefined ? lastIn = 'Smith' : null;
    nationalityIn === undefined ? nationalityIn = 'America' : null;
    
    this.firstNameSmith = firstIn;
    this.lastNameSmith = lastIn;
    this.yearBirth = yearBirthIn;
    this.nationality = nationalityIn;
    
    //this.lastNameSmith === undefined ? lastNameSmith = 'Smith' : lastNameSmith = lastIn;
}

var smithOne = new Smithperson('John',1990);

console.log(smithOne);

//Default Params ES6
function BouchPerson(firstIn, lastIn = 'Bouch',nationalityIn = 'American'){
    this.firstNameBouch = firstIn;
    this.lastNameBouch = lastIn;
    this.nationality = nationalityIn;
}

var bouchOne = new BouchPerson('Damian','SLinglbacde','Greek');
console.log(bouchOne);
var bouchTwo = new BouchPerson('Emily');
console.log(bouchTwo);


//Maps - unique to ES6 - old objects used to be stored in hashmaps - maps can use any primitive for keys

const question = new Map();
question.set('question','What is your favorite color?');  //Map key-value pair
question.set(1,'Blue');
question.set(2,'Green');
question.set(3,'Orange');
question.set(4,'Pink');
question.set('correct',3);
question.set(true,'Correct answer!');
question.set(false,'Wrong answer ...');

console.log('Size: ' + question.size);
console.log(question.get('question'));

if(question.has(4)){
    console.log('Found question 4');
    //question.delete(2); //This will remove an entry according to the key
}

//question.clear();  //this will clear all entries in the map

question.forEach((value, key) => console.log(`This is ${key}, set to ${value}`));

for(let [key,value] of question.entries()){ //accessing both key and value
    if(key !== 'question'){
        console.log(`Structured ${key} is set to ${value}`);
    }
}

//const myAnswer = parseInt(prompt('Write correct answer'));

//console.log(question.get(myAnswer === question.get('correct')));


//Classes
//Syntatic sugar instead of prototype inheritance

var personNovember = function(name,yearOfBirth,job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

personNovember.prototype.calculateAge = function(){
    
    var now = new Date().getFullYear();
    var age = (now - this.yearOfBirth);
    console.log(now);
    console.log(age);
}

var MarkB = new personNovember('Mark',1983,'painter');

//same thing as a class
class personClass {
    constructor(name,yearOfBirth,job){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    calculateAge(){
        var age = parseInt(new Date().getFullYear()) - this.yearOfBirth;
        console.log(age);
    }
}

var steveL = new personClass('Steve',1955,'IT guy');

console.log(MarkB.yearOfBirth);
console.log(steveL.yearOfBirth);

MarkB.calculateAge();
steveL.calculateAge();

//ES6 class and subclass inherited class
class Person6{
    constructor(name,yearOfBirth,job){
        this.name=name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    calculateAge(){
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athlete6 extends Person6{
    constructor(name,yearOfBirth,job,olympicGames,medals){
            super(name,yearOfBirth,job);
            this.olympicGames = olympicGames;
            this.medals = medals;
        }
            wonMedal(){
                this.medals++;
                console.log(this.medals);
            }
        }
    


const johnAthlete6 = new Athlete6('John Brown',1990,'swimmer',3,10);

johnAthlete6.wonMedal();
johnAthlete6.calculateAge();


































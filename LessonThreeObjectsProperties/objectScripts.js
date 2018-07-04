var objective = 'Learning to use JS Objects and Properties';

console.log(objective);

var arr = [12,44,556];
var nameArr = ['Mary','Joseph','John'];

console.log(arr);
console.log(nameArr);  //regular arrays

//JS object
var personOne = {
    firstName:'John',
    lastName:'Barnes',
    birthYear:1990,
    occupation:'web dev',
    isMarried:false    
};

console.log(personOne);

personOne.occupation = 'DB Admin';

//Changing properties
console.log(personOne);

personOne.isMarried = true;
console.log(personOne);

personOne.isMarried = 'kinda';

console.log(personOne);

var wifeName = 'Judy Purdy';

personOne.wifeName = wifeName;
console.log(personOne);

//Dot notation or array notation can use/manipulate properties
personOne['occupation'] = 'Software Manager';
personOne['favColor'] = 'Orange';

console.log(personOne);

var personTwo = new Object();
personTwo.firstName = 'Jane';
personTwo['lastName'] = 'Brunelli';
personTwo.occupation = 'Sexy Librarian';

console.log(personTwo);

personOne.spouse = personTwo;

console.log(personOne.spouse.occupation);
console.log(personOne.firstName + " " + personOne.lastName + " has a wife, " + personTwo.firstName + " " + personTwo.lastName + ", who is a " + personTwo.occupation + ".");

//Implementing methods in an object
var personThree = {
    firstName:'Barry',
    lastName:'Barnes',
    birthYear:1987,
    occupation:'web dev',
    isMarried:true,
    family:['Jerry','Mike','Todd'],
    calculateAge: function(){
        var age = 2018 - this.birthYear;
        return age;
    }
};

console.log(personThree);

console.log(personThree.calculateAge());

personThree.age = personThree.calculateAge();

var customerOne = {
    firstName: 'Blanka',
    lastName: 'Bonds',
    birthYear: 1965,
    calculateAge: function(){
        this.age = 2018 - this.birthYear;        
    },
    membership: 'gold',
    
    products:['socks','tees','sneakers']
};

console.log(customerOne);
customerOne.calculateAge();  //method must be called to add new property, otherwise 'age' will be missing
console.log(customerOne);

//Loops and iterations
for(i = 0; i < 10; i++)
    {
        console.log("Count: " + i);
    }

var myPeeps = ['Em','Kyle','Paul','Zach'];

for(i = 0; i < myPeeps.length; i++){
        console.log("Person: " + myPeeps[i]);
}

for(i = myPeeps.length - 1; i >=0; i--){
    console.log("New: " + myPeeps[i]);
}

var i = 3;
while(i >= 0){
    console.log("Counter is: " + i);
    i --;
}
    
console.log("Hello");

//Using continue;
for(var i = 0; i <= 5; i++){
    if(i ===3){
        continue; //will skip this iteration
    }
    console.log(i);
}
    
//Coding challenge    
var birthYears = [1969,1988,2005,1978,1956,1930];
var ages = [];
var fullAgeBoolean = [];

function fillAgesArray(yearsIn, currentYear){
    var temp = [];
    for(i = 0; i < yearsIn.length; i++){
        temp[i] = (currentYear - yearsIn[i]);
    }
    return temp;
} 

function printFullAge(agesIn){
    for(i = 0; i < agesIn.length; i++){
        if(agesIn[i] >= 18){
            console.log(agesIn[i] + ": full age");
        } else{
            console.log(agesIn[i] + ": not full age");
        }
    }
}

function createBoolArray(ages){
    var temp = [];
    for(i = 0; i < ages.length; i++){
        if(ages[i] >= 18){
            temp.push(true);
        } else{
            temp.push(false);
        }
    }
    return temp;
}

ages = fillAgesArray(birthYears,2018);
console.log("Ages: " + ages);

printFullAge(ages);

fullAgeBoolean = createBoolArray(ages);
console.log(fullAgeBoolean);
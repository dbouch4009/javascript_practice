//Behind the scenes
console.log("We are behind the scenes");

//Here, the function can be called before it is declared, because of Hoisting AND because the function is declared
calculateAge(1990);

function calculateAge(yearsIn){
    console.log(2018 - yearsIn);
}

calculateAge(1998);

//But it does not work for function expressions this way

//retirement(1987);  //this will not work

var retirement = function(yearIn){
    console.log(65-(2018 - yearIn));
}

retirement(1988);

//Variables and Hoisting

console.log(age);  //The value will not be here, because Hoisting will identify the variable, but will not have the value assignment until after execution
var age = 23;
console.log(age);


//Here, because the damian variable is stored in the Global Execution Context, the value will be found and assigned during Hoisting
foo();  //This will print the value of the variable, even though it is called prior to declaration

function foo(){
    var damian = 29;
    console.log(damian);
}

foo();

//Scope Chain
//Scope = where a certain variable/function can be accessed, and this is different because in JS scope is only dependent upon functions. Child functions have access to parent variables. ALL variables are stored in Scope Chain

var a = "Good ";  //Global scope - does not by default have access to b and c, because they are in child scopes
first();

function first(){   //first() scope  = global + first
    var b = "Luck ";
    second();
    
    function second(){  //second() scope = global + first + second
        var c = "Henry!";
        console.log(a + b + c);
    }
}

function third(){
    var d = "James";    
    console.log(a + d);
}

// third() is able to access var a because it is defined in Global Scope
third();

// 'this' keyword - each Execution Context gets its own, which points to global object, i.e., the window. 'this' points to the object that is calling the method. Execution Context is only created once a function is invoked.

console.log(this);  //this will display everything in the window object, which is the default object

var personOne = {
    firstName: 'Jan',
    lastName: 'Lewan',
    yearOfBirth: 1990,
    calculateAge: function(){        
        console.log(2018 - this.yearOfBirth);
    },
    logMeBro: function(){
        console.log(this);  //here, 'this' will point to Jan object
    }
}

personOne.calculateAge();
personOne.logMeBro();  //returns personOne object

var personTwo = {
    firstName: 'Mike',
    lastName:'Jones',
    yearOfBirth: 1960
}

personTwo.calculateAge = personOne.calculateAge;  //Method borrowing makes additional declarations unnecessary

personTwo.calculateAge();

personTwo.logMeBro = personOne.logMeBro;

personTwo.logMeBro();  //returns personTwo object, even after Method Borrowing




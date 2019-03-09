//console.log("Bite me");

const queenMethod = () =>{
    console.log("Bite me twice");
    getRecipesTwo(556).then(result => console.log(`${result} is a good food.`));
    //getWeatherAW(44418);
    //getWeatherAW(2487956);
    //getWeather(44418);
    //getWeather(2487956);
    //printFullName();
    //second();
    //third("Bird");
    //getRecipe();
    //playingWithPromises();
    
    console.log("End");
}

const second = () =>{
    setTimeout(() => {
        console.log("We are appearing after the timeOut");
    }, 500);  //delay in MS
    console.log("Second Method");
}

const third = (word) =>{
    console.log(word + " is the word.");
}

//the old way, async and callbacks
// const getRecipe =() =>{
//     setTimeout(() => {
//         const recipeID = [523,330,400];
//         console.log("Got ur recipe array: ");
//         console.log(recipeID);

//         setTimeout((ID) => {
//             const recipe = {title: 'Bean Cake',author:'Arthur Miller',Id:ID};
//             console.log("Recipe is: ");
//             console.log(recipe);
//         }, 200,recipeID[1]);
//     }, 700);
// }

//new way: Promises, tracks whether an async event has happened and then dictates what happens
const playingWithPromises = () =>{
    const getIDs = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([101,202,404]);  //resolve is for successful return
        }, 1000);
    });
    
    getIDs
    .then(IDs => {  //this passed argument is the result of the successful promise, with .then
        console.log("Promise IDS: ");
        console.log(IDs);
    })
    .catch(error =>{  //this is executed for failed promises - uses reject keyword on promise
        console.log("ERROR: " + error);
    });
}

const printFullName = () => {
    const lastName = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Dostoevsky');
        }, 25);
    });
    lastName
    .then( name => {
        console.log(name);
    });
    
    const firstName = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Fyodor');
        }, 25);
    });
    firstName
    .then(name => {
        console.log(name);
    });
}

//consuming promises with async/await
const getIDs = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([123,456,900]);
    }, 1500);
});

const getRecipe = recId =>{
    return new Promise((resolve, reject) => {
        setTimeout(ID => {
            const recipe = {title: 'Bouch Fries',publisher:'Damian Bouch'};
            resolve(`${ID}: ${recipe.title}`);
        }, 1500, recId);
    });
};

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout((pub) => {
            const recipe = {title:'Gluten Freezza',publisher:'Damian Bouch'};
            resolve(`${pub}: ${recipe.title}`);
        }, 1500,publisher);
    });
};

// getIDs
// .then(IDs => {
//     console.log(IDs);
//     return getRecipe(IDs[2]);
// })
// .then(recipe => {
//     console.log(recipe);
//     return getRelated('Damian Bouch');
// })
// .then(recipe => {
//     console.log(recipe);
// })
// .catch(error => {
//     console.log('Error');
// });

async function getRecipesAW(){
    const IDs = await getIDs;
    console.log(IDs);
    const recipe = await getRecipe(IDs[2]);
    console.log(recipe);
    const related = await getRelated('Damian Bouch');
    console.log(related);
}

//assigning vars with async
async function getRecipesTwo(){
    return await getRecipe(556);
}

//AJAX - Asynchronous Javascript And XMLS
// function getWeather(woeid){
//     fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
//     .then(result => {
//         console.log(result);
//         return result.json();  //parsing ajax header to JSON
//     })
//     .then(data => {
//         //console.log(data);
//         console.log(`The weather for ${data.title}, ${data.parent.title}.`);   //handling parsed JSON
//     })
//     .catch(error => console.log(error));
// }

//AJAX - Async with Fetch
async function getWeatherAW(woeid){
    const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
    const usableData = await result.json();
    const printString = `${usableData.parent.title}, ${usableData.title} will be ${usableData.consolidated_weather[0].weather_state_name}`
    //console.log(usableData);
    try{
        //console.log(printString);
    }catch(error){
        alert(error);
    }
    //document.getElementById("weather_info").innerHTML = printString;
    return printString;
}
//using then() on async await
let sanFranData;
getWeatherAW(2487956).then(data => {
    sanFranData = data
    console.log(sanFranData)
});
//console.log(sanFranData);

queenMethod();
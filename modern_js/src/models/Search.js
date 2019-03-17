//Search Model
import axios from 'axios';  //for packages, just import name as it appears in package.json
require("babel-polyfill");
export default class Search{

    constructor(query){
        this.query = query;
    }

    async getResults(){
        const food2fork = 'https://www.food2fork.com/api/search';
        const corsProxy = 'https://bypasscors.herokuapp.com/api/?url=';
        try{
            const key = '7992eacfddf404bb6fea2732066a9694';
            //let fullSearch = `${corsProxy}${food2fork}?key=${key}&q=${this.query}`;
            //let corsSearch = 'https://bypasscors.herokuapp.com/api?url=http://food2fork.com/api/search?key=7992eacfddf404bb6fea2732066a9694&q=pizza';
            //let noCorsSearch = 'https://www.food2fork.com/api/search?key=7992eacfddf404bb6fea2732066a9694&q=pizza';
                               //'https://food2fork.com/api/search?key=7992eacfddf404bb6fea2732066a9694&q=pizza'
            //let noCorsFullSearch = `${food2fork}?key=${key}&q=${this.query}`;
            let noCorsBuiltSearch = food2fork + '?key=' + key + '&q=' + this.query;
            console.log('Looking for recipes...' + noCorsBuiltSearch);
            const result = await axios(noCorsBuiltSearch);
            this.recipes = result.data.recipes;
            
            // const result = await axios.get("https://bypasscors.herokuapp.com/api/?url=https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com", {
            //                 headers: {
            //                     "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
            //                     "Content-Type": "application/x-www-form-urlencoded"
            //     }
            // });
            //const recipes = result.data.recipes;
            //console.log(recipes);
            console.log(this.recipes);
        }catch(error){
            alert(error);
        }
    }
}
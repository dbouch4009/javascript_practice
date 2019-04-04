import axios from 'axios';
import {food2fork,food2forkGet,key} from '../config';

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            let url = `${food2forkGet}${key}&rId=${this.id}`;
            const result = await axios(url);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.img = result.data.recipe.img_url;
            this.url = result.data.recipe.source_url;
            this.img = result.data.recipe.img_url;
            this.ingredients = result.data.recipe.ingredients;
        }catch(error){
            console.log(error);
        }
    }

    calcTime(){
        const numIngredients = this.ingredients.length;
        const periods = Math.ceil(numIngredients/3);  //arbitrary estimation
        this.time = periods * 15;  //another estimation
    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitsLong = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','cup','pounds','quarts'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','cup','pound','quart']
        const newIngredients = this.ingredients.map(el => {
            // Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit,unitsShort[i]);
            });

            //Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g,' ');

            //Parse ingredients into count, unit and ingredient
            const arrIngredient = ingredient.split(' ');
            const unitIndex = arrIngredient.findIndex(el2 => unitsShort.includes(el2));

            let objIngredient;
            if(unitIndex > -1){
                //if there is a unit - no unit returns -1
                const arrCount = arrIngredient.slice(0,unitIndex);
                let count;
                if(arrCount.length === 1){
                    count = eval(arrIngredient[0].replace('-','+'));
                }else{
                    count = eval(arrIngredient.slice(0, unitIndex).join('+'));  //doing math in JS
                }

                objIngredient = {
                    count,  //ES6 automatically assigns value because it is an existing variable
                    unit: arrIngredient[unitIndex],
                    ingredient: arrIngredient.slice(unitIndex + 1).join(' ')
                };

            }else if(parseInt(arrIngredient[0],10)){
                //There is no unit, but the first element is a number
                objIngredient = {
                    count:parseInt(arrIngredient[0],10),
                    unit: '',
                    ingredient: arrIngredient.slice(1).join(' ')
                };

            }else if(unitIndex === -1){
                //there is no unit AND no number in first position
                objIngredient = {
                    count: 1,
                    unit: '',
                    ingredient
                };

            }

            return objIngredient;
        });
        this.ingredients = newIngredients;
    }
}
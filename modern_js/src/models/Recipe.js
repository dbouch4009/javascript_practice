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
}
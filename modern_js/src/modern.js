//Global app controller
//import * as searchView from './views/searchView';  //then, use searchView.add() syntax
//console.log(`Using imported functions: ${pseudoAdd(ID,100)} and ${multiply(3,5)}. ${stringSample}`);

import stringSample from './models/Search';
import {add as pseudoAdd,multiply, ID} from './views/searchView';
import 'babel-polyfill';
import Search from './models/Search';
import {elements, renderLoader,clearLoader,elementStrings} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import Recipe from './models/Recipe';

/*global state of the app
- search object
- current recipe object
- shopping list object
- liked recipes
*/
const state = {};

//Recipe Controller
const controlRecipe = async () => {
    //Get ID from URL
    const id = window.location.hash.replace('#','');
    //console.log(id);

    if(id){
        //Prepare UI for changes


        //create new recipe object
        state.recipe = new Recipe(id);

        //testing purposes
        window.r = state.recipe;
        //end testing purposes
        //Get recipe data
        try{
            await state.recipe.getRecipe();  //because is async method
            state.recipe.parseIngredients();

            //Calc servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();
    
            //Render recipe
            console.log(state.recipe);
        }catch(err){
            alert('Error processing recipe');
        }

    }
}

window.addEventListener('hashchange',controlRecipe);
window.addEventListener('load',controlRecipe);

//Search Controller
const controlSearch = async () =>{
    // get query from view
    const query = searchView.getInput();
    //console.log(`Looking for ${query}...`);

    if(query){
        // new search object and add to state
        state.search = new Search(query);

        // prepare ui for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{
            await state.search.getResults();

            // render results on UI
            clearLoader();
            searchView.renderResults(state.search.recipes);
            //console.log('Rendered recipes: ' + state.search);
        }catch(err){
            alert(err);
            clearLoader();
        }
        // search for recipes

    }
}

elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();  //prevents page from loading on click
    controlSearch();
});

//event delegation
elements.searchResPages.addEventListener('click',e =>{
    const btn = e.target.closest('.btn-inline');  //click on closest element containing this class
    if(btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, goToPage);
    }
});
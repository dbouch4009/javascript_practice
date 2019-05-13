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
import * as listView from './views/listView';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

/*global state of the app
- search object
- current recipe object
- shopping list object
- liked recipes
*/
const state = {};
window.state = state;  //available in window for testing

//List Controller


//Recipe Controller
const controlRecipe = async () => {
    //Get ID from URL
    const id = window.location.hash.replace('#','');
    //console.log(id);

    if(id){
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected search item
        if(state.search){
            //console.log(state.search);
            searchView.highlightSelected(id);        
        } 

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
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        }catch(err){
            alert('Error processing recipe');
        }

    }
};

const controlList = () =>{
    //create new list if there is none
    if(!state.list){
        state.list = new List();
    }

    //add each ingredient to list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        //console.log(item);
        //console.log(state);
        listView.renderItem(item);
    });
};

//handle delete and update list item events
elements.shopping.addEventListener('click',e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if(e.target.matches('.shopping__delete, .shopping__delete *')){  //second attribute includes child elements
        //delete from state
        state.list.deleteItem(id);

        //delete from UI
        listView.deleteItem(id);

        //handle count update
    } else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

//Likes Controller

const controlLike = () =>{
    //console.log(state);
    if(!state.likes){
        //console.log("Created new Likes");
        state.likes = new Likes();
    }

    const currentId = state.recipe.id;

    //user HAS NOT yet liked current recipe
    if(!state.likes.isLiked(currentId)){
        //add like to state
        console.log("recipe is not liked: " + currentId);
        const newLike = state.likes.addLike(currentId, state.recipe.title, state.recipe.author, state.recipe.img);

        //toggle like button


        //add like to UI list
        
        //console.log(state.likes);

    //user HAS liked the current recipe
    } else {
        //remove like from state
        state.likes.deleteLike(currentId);

        //toggle liek button

        //remove like from UI list
        //console.log(state.likes);

    }
};

//event handling
window.addEventListener('hashchange',controlRecipe);
window.addEventListener('load',controlRecipe);
elements.recipe.addEventListener('click',e => {
    //does clicked element contain these classes??
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        //decrease button is clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }        
    } else if(e.target.matches('.btn-increase, .btn-increase *')){
        //increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        //add ingredients ot shopping list
        controlList();
    } else if(e.target.matches('.recipe__love, .recipe__love *')){
        //call like controller
        controlLike();
    }
});

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
 
window.testList = new List();
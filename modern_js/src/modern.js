//Global app controller
//import * as searchView from './views/searchView';  //then, use searchView.add() syntax
//console.log(`Using imported functions: ${pseudoAdd(ID,100)} and ${multiply(3,5)}. ${stringSample}`);

import stringSample from './models/Search';
import {add as pseudoAdd,multiply, ID} from './views/searchView';
import 'babel-polyfill';
import Search from './models/Search';
import { ECANCELED } from 'constants';
import {elements, renderLoader,clearLoader,elementStrings} from './views/base';
import * as searchView from './views/searchView';

/*global state of the app
- search object
- current recipe object
- shopping list object
- liked recipes
*/
const state = {};

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

        // search for recipes
        await state.search.getResults();

        // render results on UI
        clearLoader();
        searchView.renderResults(state.search.recipes);
        //console.log('Rendered recipes: ' + state.search);
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
        console.log(goToPage);
    }
});
//Global app controller
//import * as searchView from './views/searchView';  //then, use searchView.add() syntax
//console.log(`Using imported functions: ${pseudoAdd(ID,100)} and ${multiply(3,5)}. ${stringSample}`);

import stringSample from './models/Search';
import {add as pseudoAdd,multiply, ID} from './views/searchView';
import 'babel-polyfill';
import Search from './models/Search';

/*global state of the app
- search object
- current recipe object
- shopping list object
- liked recipes
*/
const state = {};

const search = new Search('pineapple');
search.getResults();


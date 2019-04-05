//Search View
import {elements} from './base';

export const getInput = () => elements.searchInput.value;

const createButton = (page,type) =>  //type is prev or next
    `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>    
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
        </svg>
    </button>
    `;

const renderButtons = (page,numResults,resPerPage) =>{
    let pageCount = Math.ceil(numResults / resPerPage);
    let button;
    if(page === 1 && pageCount > 1){
        //button goes to next page
        button = createButton(page,'next');
    } else if(page === pageCount && pageCount > 1){
        // only prev button
        button = createButton(page,'prev');
    } else if(page < pageCount){
        // both buttons
        button = `
            ${createButton(page,'prev')}
            ${createButton(page,'next')}
        `;
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
};

export const renderResults = (recipes,page=1,resPerPage=9) => {
    //render results of current page
    try{
        const start = (page - 1) * resPerPage;
        const end = page * resPerPage;

        recipes.slice(start,end).forEach(renderRecipe);                
    } catch(error){
        console.log(error);
    }    

    //render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt=${recipe.title}>
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend',markup);
};

export const clearInput = () =>{ 
    elements.searchInput.value = '';
};

export const clearResults = () =>{
    elements.searchResultList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`a[href*="${id}"]`).classList.add('result__link--active');
};

const limitRecipeTitle = (title, limit = 17) =>{
    const newTitle = [];  //it is OK to use const if changing arrays
    if(title.length > limit){
        title.split(' ').reduce((acc,cur) =>{
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;            
        }, 0);
        return `${newTitle.join(' ')}...`;  //join method joins array elements
    }
    return title;
}
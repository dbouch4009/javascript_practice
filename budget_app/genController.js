//GLOBAL CONTROLLER
var genController = (function(budgetCtrl, UICtrl){
var EMPTY_BUDGET = {
    budget: 0,
    totalIncome: 0,
    totalExpenses: 0,
    percentage: -1
};

	var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
		document.querySelector(DOM.inputButton).addEventListener('click',ctrlAddItem);
				
		document.addEventListener('keypress',function(event){
		// event listener: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
		// attaches 'enter' to function
			if(event.keyCode === 13 || event.which === 13){
				ctrlAddItem();
			}
		});
        
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
        
	}


    
    var updateBudget = function(){
        //calculate budget
        budgetCtrl.calculateBudget();
        //return budget
        var budget = budgetCtrl.getBudget();
        console.log(budget);
        //display budget
        UICtrl.displayBudget(budget);        
    }
    
    var updatePercentages = function(){
        //calculate percentages
        budgetCtrl.calculatePercentages();
        
        //read from budget controller
        var percentages = budgetCtrl.getPercentages();
        
        //display to UI
        UICtrl.displayPercentages(percentages);
        
    };

	var ctrlAddItem = function(){
		// TODO: Get field data, Add item to control, Add item to UI, calc budget, display budget		
		var input=UICtrl.getInput();
        
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
          var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		  UICtrl.addListItem(newItem, input.type);
          updateBudget();
		  UICtrl.clearFields();
        } else{
            console.log('Trouble with ' + input.value);
        }
        
        updatePercentages();
	}
    
    var ctrlDeleteItem = function(event){  //event bubbling here to delete entire row, not just button
        var itemId, splitId, type, Id;
        itemId = (event.target.parentNode.parentNode.parentNode.parentNode.id);
        
        if(itemId){  //only elements that do not have IDs will return false
            //inc-0, inc-1, etc.
            splitId = itemId.split('-');
            console.log(splitId);
            type = splitId[0];
            Id = parseInt(splitId[1]);
            
            //delete item from data structure
            console.log('delete params: ' + type + ' ' + Id)
            budgetCtrl.deleteItem(type,Id);
            
            //delete item from UI
            UICtrl.deleteListItem(itemId);
            
            //update and show new totals
            updateBudget();
        }
    }

	
	return{
		init:function(){
			console.log('Application has started');
			setupEventListeners();
            UICtrl.displayBudget(EMPTY_BUDGET);
            UIController.displayDate();
		}
	};	
})(budgetController, UIController);

genController.init();
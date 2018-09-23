//BUDGET CONTROLLER
var budgetController = (function() {
// constructor for incomes and expenses
	var Expense = function(id,desc,val){
		this.id = id;
		this.description = desc;
		this.value = val;
	};

	var Income = function(id,desc,val){
	   this.id = id;
	   this.description = desc;
	   this.value = val;
	};
    
    var calculateTotal = function(type){  //type will be 'exp' or 'inc'
        var sum = 0;
        data.allItems[type].forEach(function(current){
            sum += current.value;
        })
        data.allTotals[type] = sum;        
    };

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		allTotals: {
			exp: 0,
			inc: 0
		},
        budget: 0,
        percentage: -1
	}

	return {
		addItem: function(type, desc, val){
			var newItem, ID;

			// create new ID
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			// create new item based on 'inc' or 'exp' type
			if(type === 'exp'){
				newItem = new Expense(ID, desc, val);
			} else if(type === 'inc'){
				newItem = new Income(ID, desc, val);
			} else{
				console.log('Invalid type in addItem');
			}

			data.allItems[type].push(newItem);  //pushing to incomes or expenses list
			return newItem;
		},
        
        calculateBudget: function(){
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            //calculate budget: income - expenses
            data.budget = data.allTotals.inc - data.allTotals.exp;
            
            //calculate the percentage of income that we spend
            if(data.allTotals.inc > 0){
                data.percentage = Math.round((data.allTotals.exp/data.allTotals.inc) * 100);
            } else{
                data.percentage = -1;
            }
        },
        
        getBudget: function(){
            return {
                budget: data.budget,
                totalIncome: data.allTotals.inc,
                totalExpenses: data.allTotals.exp,
                percentage: data.percentage
            }
        },
        
        deleteItem: function(type, id){
            var idArray, index;
            
            //mapping items to new array
            idArray = data.allItems[type].map(function(current){
               return current.id; 
            });
            
            index = idArray.indexOf(id);
            
            //removing the element from the data structure
            if(index !== -1){
                data.allItems[type].splice(index, 1)
            }            
        },

		testing: function(){
			console.log(data);
		}
	};

})();// this operator immediately invokes the method body above, instantiating its properties

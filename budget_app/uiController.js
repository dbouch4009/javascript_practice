// UI CONTROLLER
var UIController = (function(){
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputButton: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expItemPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
	};
    
     var formatNumber = function(num, type){
            //+ or - before number, comma for thousands, two decimal points
            var numSplit, integer, decimal;
            
            num = Math.abs(num);
            num = num.toFixed(2);  //toFixed is method of Number prototype, not Math class
            
            numSplit = num.split('.');
            
            integer = numSplit[0];
            decimal = numSplit[1];
            
            if(integer.length > 3){
                integer = integer.substr(0,(integer.length - 3)) + ',' + integer.substr((integer.length - 3),3);
            }
            
            //type === 'exp' ? '-' : '+';
            
            return (type === 'exp' ? '-' : '+') +' ' + integer + '.' + decimal;
            
        };
    
        var nodeListForEach = function(list, callback){  //creates list of elements
            for(var i = 0; i < list.length; i++){
                callback(list[i], i);
            }
        };
    
	return {
		getInput: function(){
			return{
			type: document.querySelector(DOMstrings.inputType).value, //returns 'inc' or 'exp'
			description: document.querySelector(DOMstrings.inputDescription).value,
			value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
			inputButton: document.querySelector(DOMstrings.inputButton).value
			}
		},

		getDOMstrings: function(){
			return DOMstrings;
		},
        
        displayBudget: function(obj){
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExpenses, 'exp');
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
                
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },
        
        displayPercentages: function(percentages){            
            var fields = document.querySelectorAll(DOMstrings.expItemPercentageLabel);
            console.log('fields: ' + fields.length);
            
            nodeListForEach(fields, function(current,index){  //updates DOM elements
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                } else{
                    current.textContent = '---';
                }
                
            });
        },

		addListItem: function(obj, type){
			// create html string, place data in HTML, insert HTML element
			var html, newHTML, element;

			if(type === 'inc'){
				element = DOMstrings.incomeContainer;
				html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			} else if(type === 'exp'){
				element = DOMstrings.expensesContainer;
				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}

			newHTML = html.replace('%id%',obj.id);
			newHTML = newHTML.replace('%description%', obj.description);
			newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));

			document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);
		},
        
        deleteListItem: function(selectorId){
            var el = document.getElementById(selectorId);
            el.parentNode.removeChild(el);
        },
        
        displayDate: function(){
            var now, year, month, months, day, days, date;
            now = new Date();
            
            months= ['Jan','Feb','Mar','Apr','May','Jun','Jul','August','Sept','Oct','Oct','Dec'];
            days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            
            year = now.getFullYear();
            month = now.getMonth();
            day = now.getDay();
            date = now.getDate();
            
            document.querySelector(DOMstrings.dateLabel).textContent = days[day] + ' ' + months[month] + ' ' + date + ', ' + year;
            
        },
        
        changedType: function(){
            
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );      
            
            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus');  //adds css class on event
            });
            
            document.querySelector(DOMstrings.inputButton).classList.toggle('red');
            
        },

		clearFields: function(){
			document.querySelector(DOMstrings.inputValue).value = "";
			document.querySelector(DOMstrings.inputDescription).value = "";

			document.querySelector(DOMstrings.inputDescription).focus();

			/* Jonas' way
			var fields, fieldsArray;
			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

			fieldsArray = Array.prototype.slice.call(fields);

			fieldsArray.foreach(function(currentValue, indexNumber, entireArray){
				currentValue.value = "";
			
			});
			*/
		}
	}
})();
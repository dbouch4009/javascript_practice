var firstText = 'Who is the plumber in a red shirt?';
var secondText = 'Who is the Hero of Time?';
var thirdText = 'Who kills people with wrist-mounted knives?';

var QuestionGame = function(questionIn){
	console.log(questionIn.questionText);
	console.log(questionIn.firstAnswer);
	console.log(questionIn.secondAnswer);
	console.log(questionIn.thirdAnswer);

	var answer = prompt("What is your answer??","Answer Here");

	switch(questionIn){
		case questionArray[0]:
			return evaluateQuestion(0,answer);
		case questionArray[1]:
			return evaluateQuestion(1,answer);			
		case questionArray[2]:
			return evaluateQuestion(2,answer);
		case "exit":
			console.log("Game is over");
		default:
			console.log("Bug in the game() switch");
	}	
}

var ChooseQuestion = function(){
	var num = Math.round(Math.random()*2)
	console.log(num);
	return num;
}

var evaluateQuestion = function(questionNumber, answerIn){
	switch(questionNumber){
		case 0:
			if(answerIn === "A"){
				console.log("Great! " + answerIn + " is the right answer.");
			}else{
				console.log(answerIn + " is not the right answer.");
			}
			break;
		case 1:
			if(answerIn === "A"){
				console.log("Great! " + answerIn + " is the right answer.");
			}else{
				console.log(answerIn + " is not the right answer.");
			}
			break;
		case 2:
			if(answerIn === "B"){
				console.log("Great! " + answerIn + " is the right answer.");
			}else{
				console.log(answerIn + " is not the right answer.");
			}
			break;
		default:
			console.log("Error in the evaluate() switch");
	}

	if(answerIn !== 'exit'){
		activeQuestion =  ChooseQuestion();
		QuestionGame(questionArray[activeQuestion]);	
	}
}

var Question = function(text, firstAnswer, secondAnswer, thirdAnswer){
	this.questionText = text;
	this.firstAnswer = firstAnswer;
	this.secondAnswer = secondAnswer;
	this.thirdAnswer = thirdAnswer;
}

var firstQuestion = new Question(firstText, 'A: Mario','B: Link','C: George Washington');
var secondQuestion = new Question(secondText, 'A: Link','B: Ganon','C: Abe Lincoln');
var thirdQuestion = new Question(thirdText,'A: Boban','B: Assassins','C: Plebs');

var questionArray = [firstQuestion, secondQuestion, thirdQuestion];

var activeQuestion =  ChooseQuestion();

QuestionGame (questionArray[activeQuestion]);
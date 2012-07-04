/*
Paul J. Miller
VFW 1207 - Project 2
07/03/2012
*/

alert("Javascript Works");
console.log("Test");
	//Wait for DOM to be ready
	window.addEventListener("DOMContentLoaded", function(){


	//getElementById Function
	function $(x){
		var grabElement = document.getElementById('x');
		return grabElement;	
	}
	

	//Variable defaults
	var recipeCategory = ["--Choose A Recipe Category--", "Breakfast", "Lunch", "Dinner", "Desert", "Drink"];
	

	//Set Link & Submit Click Events
	var displayData = $('displaydata');
	displayData.addEventListener("click", getData);
	var clearData = $('clearData');
	clearData.addEventListener("click", clearStorage);
	var saveData = $('submit');
	saveData.addEventListener("click", saveData);


});


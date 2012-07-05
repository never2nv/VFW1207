/*
Paul J. Miller
VFW 1207 - Project 2
07/03/2012
*/
	//Wait for DOM to be ready
	window.addEventListener("DOMContentLoaded", function(){


	//getElementById Function
	function $(x){
		var grabElement = document.getElementById('x');
		return grabElement;	
	}
	
	//Create select field element and populate with options.
	function makeCats(){
		var formTag = document.getElementsByTagName("form"), // formTag IS AN ARRAY OF ALL THE FORM TAGS!!!!!.
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "groups");
		
		for (var i=0, j=recipeCategory.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = recipeCategory[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild("makeOption");
		}
		selectLi.appendChild(makeSelect);
		
	}
	

	//Variable defaults
	var recipeCategory = ["--Choose A Recipe Category--", "Breakfast", "Lunch", "Dinner", "Desert", "Drink"];
	makeCats();
	

	//Set Link & Submit Click Events
	var displayData = $('displaydata');
	displayData.addEventListener("click", getData);
	var clearData = $('clearData');
	clearData.addEventListener("click", clearStorage);
	var saveData = $('submit');
	saveData.addEventListener("click", saveData);


});


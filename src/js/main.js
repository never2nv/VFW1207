/*
Paul J. Miller
VFW 1207 - Project 2
07/09/2012
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
			makeSelect.appendChild(makeOption);
		}
	    selectLi.appendChild(makeSelect);
	}
	
	/*
	// Find value of radiobuttons   /  NOT USED ATM
	function getSelectedRadio(){
		var radio = document.forms[0].favorite;
		for(var i=0; i<radio.length; i++){
			if(radio[i].checked){
			favoriteValue = radio[i].value;
		}	
	}
	*/
	
	
	function getCheckBoxValue(){
		if($('favorite').checked){
			favoriteValue = $('favorite').value;	
		} else{
			favoriteValue = "No"
		}
	}
	
	function storeData(){
		var id			= Math.floor(Math.random()*100000001);
		// Gather up all our form field values and store in an object.
		// Object properties will contain array with form label and input values.
		
		// getSelectedRadio();  NOT USED
		getCheckBoxValue();
		
		var item		= {};
			item.group	= ["Category:", $('groups').value];
			item.rname  = ["Recipe Name:", $('rname').value];
		// Not sure if I need whole label of all checkbox group or each individual. Try both?
			item.cooking	= ["Cooking Method:", $('cooking').value];
			item.microwave	= ["Microwave:", $('microwave').value];
			item.stovetop	= ["Stovetop:", $('stovetop').value];
			item.oven	= ["Oven:", $('oven').value];
			item.blender	= ["Blender:", $('blender').value];
			item.foodprocessor	= ["Food Processor:", $('FoodProcessor').value];
			item.directions	= ["Directions:", $('directions').value];
			item.rating	= ["Rating:", $('rating').value];
			item.favorite	= ["Save As Favorite:", $('favorite').value];
			item.date	= ["Date:", $('date').value];
			
		// Saving data into local storage (Use Stringify to convert object into a string.)
			localStorage.setItem(id, JSON.stringify(item));
			alert("Contact Saved");
						
			
			
	}

	//Variable defaults
	var recipeCategory = ["--Choose A Recipe Category--", "Breakfast", "Lunch", "Dinner", "Desert", "Drink"];
		// favoriteValue;   NOT USED
		favoriteValue = No;
	makeCats();
	
/*
	//Set Link & Submit Click Events / NOT USED ATM
	var displayData = $('displaydata');
	displayData.addEventListener("click", getData);
	var clearData = $('clearData');
	clearData.addEventListener("click", clearStorage);
*/
	var save = $('submit');
	save.addEventListener("click", storeData);



});


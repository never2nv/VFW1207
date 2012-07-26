/*
Paul J. Miller
VFW 1207 - Project 3
07/17/2012
*/
	//Wait for DOM to be ready
	window.addEventListener("DOMContentLoaded", function () {
	
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
		
		for(var i=0, j=recipeCategory.length; i<j;i++){
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
	
// Find value of checkbox
	function getCheckBoxValue(){
		if($('favorite').checked){
			favoriteValue = $('favorite').value;	
		} else{
			favoriteValue = "No"
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('recipeForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayData').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('recipeForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayData').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeData(key){
	// If no key then it will generate a new key
	if(!key){
		var id			= Math.floor(Math.random()*100000001);
	}else{
	// Otherwise set id to the pre-existing key that's beeing edited, and can save over the original data. 
	// Same key passed through/from editReciepe event listener. Passed to storeData function :) nifty!!!!
		id = key;
	}
		
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
	
	// Get data from local storage.
	function getData(){
	toggleControls("on");
	if(localStorage.length === 0){
		alert("I find your lack of data disturbing! Therefore, I have loaded default data for you!");
		autoFillData();
	}
		// Write data from local storage to the browser.
			var makeDiv = document.createElement('div');
			makeDiv.setAttribute("id", "items");
			var makeList = document.createElement('ul');
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);
				$('items').style.display = "block";
			for(var i=0, len=localStorage.length; i<len;i++){
				var makeli = document.createElement('li');
				var linksLi = document.createElement('li'); 
				makeList.appendChild(makeli);
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
			// Opposite of stringify, parsing tunrs vlaue into an object, rather than turning it into a string like stringify. REMEMEBR!
				var obj = JSON.parse(value);
				var makeSubList = document.createElement('ul');
				makeli.appendChild(makeSubList);
				getImage();
				for(var n in obj){
					var makeSubli = document.createElement('li');
					makeSubList.appendChild(makeSubLi);
					var optSubText = obj[n][0]+" "+obj[n][1];
					makeSubLi.innerHTML = optSubText;
					makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); // Create edit/delete links for local storage.
	}
	
	//Get image for the correct category/group of recipe
	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImg);
	}
	
	// Get Image
	
	
	// Auto Populate Local Storage
	function autoFillData(){
		//JSON Object data is populated via main/json.js ; Store JSON data into local storage!
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
		
	}
	
	// Make Item Links: created edit/delete links for local storage.
	function makeItemLinks(key, linksLi){
		// Edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Recipe";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		// Separates edit/delete links on separate lines! EPIC IDEA, line break! :) 
		var BreakTag = document.createElement('br');
		linksli.appendChild(breakTag);
		
		// Delete single item link
		var deleteLink = document.createElement('a');
		deleLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Recipe";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		// Grab data of item from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		// Show forum
		toggleControls("off");
		
		// Populate form fields with Item info.	
		$('groups').value = item.group[1];
		$('rname').value = item.rname[1];
		$('cooking').value = item.cooking[1];
		var checkBox = document.forms[0].cooking;
		for(var i=0; i<checkBox.length; i++){
			if(checkBox[i].value == "Microwave" && item.cooking[1] == "microwave"){
				checkBox[i].setAttribute("checked", "checked");
				if(checkBox[i].value == "Stovetop" && item.cooking[1] == "stovetop"){
				checkBox[i].setAttribute("checked", "checked");
				if(checkBox[i].value == "Oven" && item.cooking[1] == "oven"){
				checkBox[i].setAttribute("checked", "checked");
				if(checkBox[i].value == "Blender" && item.cooking[1] == "blender"){
				checkBox[i].setAttribute("checked", "checked");
				if(checkBox[i].value == "FoodProcessor" && item.cooking[1] == "FoodProcessor"){
				checkBox[i].setAttribute("checked", "checked");
			} else if(null){
				return false;
			}
		}
		
		if(item.favorite[1] == "Yes"){
			$('fav').setAttribute("checked", "checked");
		}
		
		$('directions').value = item.directions[1];
		$('rating').value = item.iq[1];
		$('date').value = item.date[1];
		
		// Remove initial savedata listener button.
		save.removeEventListener("click", storeData);
		// Change submit button value => edit
		$('submit').value = "Edit Recipe";
		var editRecipe = $('submit');
		// Save tracked key of this function as property of editRecipe event. So it saves only values that have been edited.
		editRecipe.addEventListener("click", validate);
		editRecipe.key = this.key;
	}
	
	
	function deleteItem(){
		var confirm = confirm("Are you sure you want to delete this recipe? Press cancel to abort deletion.");
		if(confirm){
			localStorage.removeItem(this.key);
			window.location.reload();
			alert("Recipe was deleted successfully!");
		}else{
			alert("Deletion of recipe has been CANCELED! Recipe left in-tact!");
		}
	}
	
	// Clear local storage function
	function clearLocal(){
		if(localStorage.length === 0){
			alert("No data to clear.");
		}else {
			localStorage.clear();
			alert("All recipe's are deleted.");
			window.location.reload();
			return false;
		}
	}
	
	// Validate Edited values of recipe.
	function validate(e){
		// Define what should be checked
		var getGroup = $('groups'),
		    getRname = $('rname'),
		    getDirections = $('directions'),
		    getDate = $('date');
		    getGroup.style.border = "1px solid black";
		    getRname.style.border = "1px solid black";
		    getDirections.style.border = "1px solid black";
		    
		    // Reset error messages
		    errorMsg.innerHTML = "";
		    

		// Get Error Messages
		var errorArray = [];
		// Recipe Category/Group Validation
		if(getGroup=="--Choose A Recipe Category--"){
			var groupError = "Please choose a recipe category.";
			getGroup.style.border = "1px solid red";
			errorArray.push(groupError);
		}	
		// Recipe name validation
		if(getRname==""){
			var rNameError = "Please enter a recipe name.";
			getRname.style.border = "1px solid red";
			errorArray.push(rNameError);
		}
		// Recipe Directions validation	
		if(getDirections==""){
			var directionsError = "Please enter the recipe directions.";
			getDirections.style.border = "1px solid red";
			errorArray.push(rNameError);			
		}
		// If errors are present, display on screen
		if(errorArray.length >= 1) {
			for(var i=0;j=errorArray.length; i < j; i++){
				var text = document.createElement('li');
				text.innerHTML = errorArray[i];
				errorMsg.appendChild(text);
			}

		e.preventDefault();
		return false;
	}else{
	// No errors, then save the data to local storage.
		storeData(this.key);	// Send key value from editData function, passed through editRecipe even listener as a property.
	}
	
  }

	//Variable defaults
	var recipeCategory = ["--Choose A Recipe Category--", "Breakfast", "Lunch", "Dinner", "Dessert", "Drink"],
		// favoriteValue,   NOT USED
		favoriteValue = No,
		errorMsg = $('error')
		
		;
	makeCats();
	

	//Set Link & Submit Click Events / NOT USED ATM
	var displayData = $('displaydata');
	displayData.addEventListener("click", getData);
	var clearData = $('clearData');
	clearData.addEventListener("click", clearStorage);

	var save = $('submit');
	save.addEventListener("click", validate);
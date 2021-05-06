"use strict";

const init = () => {
   let button = document.querySelector("#searchButton");
   button.addEventListener("click", searchByName);
}

const displayDrink = drink => {
    console.log(drink);
    let drinksDiv = document.querySelector("#drinks");
    let display = document.createElement("h1");
    let drinkName = drink.strDrink;

    let servingGlassData = "Serving Glass: " + drink.strGlass;
    let servingGlass = document.createElement("h2");

    let instructionsData = drink.strInstructions;
    let instructions = document.createElement("p");

    let thumbNail = drink.strDrinkThumb;
    let thumbNailImage = document.createElement("img");
    thumbNailImage.src = thumbNail;
    thumbNailImage.className = "drinkImage";

    let ingredients  = processDrinkIngredients(drink);
    let ingredientsContainer = document.createElement("ul");
    
    ingredients.forEach(ingredient => {
        let ingredientLi = document.createElement("li");
        ingredientLi.innerHTML = ingredient;
        ingredientsContainer.appendChild(ingredientLi);
    });

    display.appendChild(document.createTextNode(drinkName));
    drinksDiv.appendChild(display);
    drinksDiv.appendChild(thumbNailImage);
    drinksDiv.appendChild(servingGlass);
    drinksDiv.appendChild(ingredientsContainer);
    drinksDiv.appendChild(instructions);
    servingGlass.appendChild(document.createTextNode(servingGlassData));
    instructions.appendChild(document.createTextNode(instructionsData));
    
}

const processDrinkIngredients = drink => {
    let ingredients = [];
    for(let i=1; i <= 15; i++) {
        if (drink["strIngredient" + i] != null) {
            let ingredient;
            if (drink["strMeasure" + i] != null) {
                ingredient = drink["strMeasure" + i] + " " + drink["strIngredient" + i]; 
            } else {
                ingredient = drink["strIngredient" + i];
            }
            ingredients.push(ingredient);
        }
    }
    console.log(ingredients);
    return ingredients;
}

const searchByName = e => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    let searchTerm = document.querySelector("#search").value;
    let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchTerm;

    xhr.open("GET", url);
    //xhr.setRequestHeader("x-api-key", apiKey);
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            let response = JSON.parse(xhr.responseText);
            let drinks = response.drinks;
            let drinksDiv = document.querySelector('#drinks');
            drinksDiv.innerHTML = '';
            drinks.forEach((drink) => {
                displayDrink(drink);
            });
        }
    }
    xhr.send(null);
}

window.addEventListener("load", init);
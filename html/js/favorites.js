"use strict";

const init = () => {
   getFavorites();
}

const getFavorites = () => {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:3000/api/drinks";

    xhr.open("GET", url);
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            let response = JSON.parse(xhr.responseText);
            renderFavorites(response);
        }
    }
    xhr.send(null);
    return false;
}

const renderFavorites = (drinks) => {
    console.log(drinks);
    let drinksDiv = document.querySelector("#favorites");
    drinks.forEach(drink => {
        let display = document.createElement("h1");
        let drinkName = drink.drinkName;

        let servingGlassData = "Serving Glass: " + drink.servingGlass;
        let servingGlass = document.createElement("h2");

        let thumbNail = drink.drinkImage;
        let thumbNailImage = document.createElement("img");
        thumbNailImage.src = thumbNail;
        thumbNailImage.className = "drinkImage";

        let ingredientsArray = drink.ingredients.split("|");
        let ingredientsContainer = document.createElement("ul");
        ingredientsArray.forEach(ingredient => {
            let ingredientLi = document.createElement("li");
            ingredientLi.innerHTML = ingredient;
            ingredientsContainer.appendChild(ingredientLi);
        });

        let instructionsData = drink.instructions;
        let instructions = document.createElement("p");

        let editName = document.createElement("button");
        editName.appendChild(document.createTextNode("Edit Name"));

        let deleteDrink = document.createElement("button");
        deleteDrink.appendChild(document.createTextNode("Remove Drink"));


        display.appendChild(document.createTextNode(drinkName));
        drinksDiv.appendChild(display);
        drinksDiv.appendChild(thumbNailImage);
        drinksDiv.appendChild(editName);
        drinksDiv.appendChild(deleteDrink);
        drinksDiv.appendChild(servingGlass);
        servingGlass.appendChild(document.createTextNode(servingGlassData));
        drinksDiv.appendChild(ingredientsContainer);
        drinksDiv.appendChild(instructions);
        instructions.appendChild(document.createTextNode(instructionsData));

    });
}

window.addEventListener("load", init);
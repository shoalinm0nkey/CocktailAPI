"use strict";

const init = () => {
   getFavorites();
}

const getFavorites = () => {
    console.log('getFavorites');
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
    drinksDiv.innerHTML = '';
    drinks.forEach(drink => {
        let display = document.createElement("h1");
        let drinkName = drink.drinkName;

        let buttonContainer = document.createElement("div");
        buttonContainer.className = "container";

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
        editName.addEventListener("click", e => {
            e.preventDefault();
            location.href = "editName.html?id=" + drink.id;
        });

        let deleteDrink = document.createElement("button");
        deleteDrink.addEventListener("click", (e) => {
            e.preventDefault();
            removeDrink(drink.id);
        });
        deleteDrink.appendChild(document.createTextNode("Remove Drink"));
        


        display.appendChild(document.createTextNode(drinkName));
        drinksDiv.appendChild(display);
        drinksDiv.appendChild(thumbNailImage);
        drinksDiv.appendChild(buttonContainer);
        buttonContainer.appendChild(editName);
        buttonContainer.appendChild(deleteDrink);
        drinksDiv.appendChild(servingGlass);
        servingGlass.appendChild(document.createTextNode(servingGlassData));
        drinksDiv.appendChild(ingredientsContainer);
        drinksDiv.appendChild(instructions);
        instructions.appendChild(document.createTextNode(instructionsData));

    });
}


const removeDrink = (id) => {
    console.log(id);
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:3000/api/drinks/" + id;
    xhr.open("DELETE", url);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            console.log("sent", id);
            getFavorites();
        }
        
    };

    xhr.send(null);
    return false;
}

window.addEventListener("load", init);
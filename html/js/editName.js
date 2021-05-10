const init = () => {
    let url = new URL(document.URL);
    let urlsp = url.searchParams;
    let id = urlsp.get("id");
    getDrink(id);
}

const getDrink = (id) => {
    let xhr = new XMLHttpRequest();
    let url = "http://localhost:3000/api/drinks/" + id;

    xhr.open("GET", url);
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            let response = JSON.parse(xhr.responseText);
            renderDrink(response);
        }
    }
    xhr.send(null);
    return false;
}

const renderDrink = (drink) => {
    const drinkNameData = document.querySelector("#drinkName");
    drinkNameData.value = drink[0].drinkName;
    const submitButton = document.querySelector("#submitNewDrink");
    submitButton.addEventListener("click", e => {
        e.preventDefault();
        updateName(drink[0].id);
    });
}

const updateName = (id) => {
    let newDrinkName = document.querySelector("#drinkName").value;
    let params = { drinkName: newDrinkName };
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:3000/api/drinks/" + id;

    xhr.open("PUT", url);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {
            location.href = "favorites.html";
        }
        
    };
    xhr.send(JSON.stringify(params));
    return false;
}

window.addEventListener("load", init);
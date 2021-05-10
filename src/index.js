const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
const DrinkManager = require("./DrinkManager");
const manager = new DrinkManager();
const cors = require('cors');

app.use(cors());

app.get("/api/drinks", (req, res) => {
    manager.allDrinks(data => {
        res.json(data);
    });
});

app.post("/api/drinks", (req, res) => {
    console.log(req.body);
    let drinkName = req.body.drinkName;
    let drinkImage = req.body.drinkImage;
    let servingGlass = req.body.servingGlass;
    let ingredients = req.body.ingredients.join('|');
    let instructions = req.body.instructions;

    manager.addDrink(drinkName, drinkImage, servingGlass, ingredients, instructions, data => {
        console.log(data);
    });
    res.send({"status": "ok"});

})

app.listen(3000, () => {
    console.log("Hello World 3000");
});

app.delete("/api/drinks/:id", (req, res) => {
    manager.removeDrink(req.params.id, (data) => {
        console.log(data);
    });
    res.send({"status": "no content"})
})

// manager.updateDrink(1, "Bazinga", data => {
//      console.log(data);
// });
const express = require("express");
const app = express();
const DrinkManager = require("./DrinkManager");
const manager = new DrinkManager();
const cors = require('cors');

app.use(cors());

app.get("/api/drinks", (req, res) => {
    manager.allDrinks(data => {
        res.json(data);
    });
});

app.listen(3000, () => {
    console.log("Hello World 3000");
});

manager.allDrinks(data => {
    console.log(data);
});


// manager.addDrink("The Margarite", 0, data => {
//     console.log(data);
// });

// manager.removeDrink(/*id for task to remove*/1, data => {
//     console.log(data);
// });

// manager.updateDrink(1, "Bazinga", data => {
//      console.log(data);
// });


// app.get("/api/drinks/:id", (req, res) => {
//     manager.allDrinks(data => {
//         res.json(data);
//     });
// });

// app.post("/api/drinks", (req, res) => {
    
// });

// app.put("/api/drinks/:id", (req, res) => {

// });

// app.delete("/api/drinks/:id", (req, res) => {
    
// });


let mysql = require("mysql");

class DrinkManager {
    getConnection() {
        let connection = mysql.createConnection({
            //change this info
            "host": "127.0.0.1",
            "database": "CocktailAPI",
            "user": "root",
            "password": /*** Password here */
        });

        return connection;
    }

    runSQL(sql, params, callback) {
        let connection = this.getConnection();

        connection.query(sql, params, (err, data) => {
            if(err) throw err;
            callback(data);
            // can grab a single piece of info by doing callback(data[0]);
        });
    }

    allDrinks(callback) {
        let query = "SELECT * FROM SavedDrinks";
        this.runSQL(query, undefined, callback);
    }

    getDrink(id, callback) {
        let query = "SELECT * FROM SavedDrinks WHERE id=? LIMIT 1";
        this.runSQL(query, [id], callback);
    }

    addDrink(drinkName, drinkImage, servingGlass, ingredients, instructions, callback) {
        let query = `INSERT INTO SavedDrinks(drinkName, drinkImage, servingGlass, ingredients, instructions) values(?, ?, ?, ?, ?)`;
        this.runSQL(query, [drinkName, drinkImage, servingGlass, ingredients, instructions], callback);
    }

    updateDrink(id, drinkName, callback) {
        let query = "UPDATE SavedDrinks SET drinkName = ? WHERE id = ?";
        this.runSQL(query, [drinkName, id], callback);
    }

    removeDrink(id, callback) {
        let query = `DELETE FROM SavedDrinks WHERE id = ?`;
        this.runSQL(query, [id], callback); 
    }
}
module.exports = DrinkManager;
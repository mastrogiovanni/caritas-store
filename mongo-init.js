db.createUser(
    {
        user: "admin",
        pwd: "admin",
        roles: [
            {
                role: "readWrite",
                db: "caritas-store"
            }
        ]
    }
);

for (let c of db.getCollectionNames()) { db.getCollection(c).deleteMany({}) }

db.getCollection("users").insertMany([
    { name: "Amministratore", username: "admin", password: "ippolito" },
    { name: "Casa giacinta", username: "giacinta", password: "giacinta" }
]);

let retailers = db.getCollection("retailers").insertMany([
    {name: "Barilla"}, 
    {name: "Amadori"},
    {name: "Badedas"}
]);

db.getCollection("products").insertMany([
    {
        name: "Spaghetti",
        description: "-",
        orderType: "weekly",
        unity: "Kg",
        price: 0.7,
        category: "cibo",
        retailer: retailers.insertedIds[0]
    }, {
        name: "Pollo",
        description: "-",
        orderType: "weekly",
        unity: "Kg",
        price: 4.5,
        category: "cibo",
        retailer: retailers.insertedIds[1]
    }, {
        name: "Shampo",
        description: "-",
        orderType: "monthly",
        unity: "L",
        price: 6.5,
        category: "benessere",
        retailer: retailers.insertedIds[2]
    }, {
        name: "Bagnoschiuma",
        description: "-",
        orderType: "monthly",
        unity: "L",
        price: 5.5,
        category: "benessere",
        retailer: retailers.insertedIds[2]
    }]
);

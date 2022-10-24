const { GoogleSpreadsheet } = require('google-spreadsheet');
const { MongoClient, ObjectId } = require("mongodb");
const creds = require("./caritas-store.json");

require('dotenv').config()

async function accessspreadsheet() {

    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET);

    // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth(creds)

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);
    // await doc.updateProperties({ title: 'renamed doc' });

    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title);
    console.log(sheet.rowCount);

    sheet.setHeaderRow([
        'desc',
        'unit',
        'quantity',
        'price',
        'cost'
    ], 4)

    let result = []

    const rows = await sheet.getRows();
    for (let row of rows) {
        if (row.desc) {
            // console.log(row)        
            result.push({
                name: row.desc.trim(),
                description: '-',
                orderType: "all",
                unity: row.unit,
                price: Number(row.price.replaceAll("€ ", "").replaceAll(",", ".").trim()),
                category: "Frutta e Verdura",
                retailer: new ObjectId(process.env.FORNITORE_ID),
                disabled: "false",
            })
        }
    }

    console.log(JSON.stringify(result))

    // const cells = await sheet.loadCells('A4:E63');
    // console.log(cells)


    // adding / removing sheets
    // const newSheet = await doc.addSheet({ title: 'hot new sheet!' });
    // await newSheet.delete();

    return result
}

function uploadData(result) {

    // Replace the uri string with your connection string.

    const client = new MongoClient(process.env.MONGO_URL);

    async function run() {
        try {
            const database = client.db(process.env.DATABASE_NAME);
            const products = database.collection('products');

            for (let item of result) {
                const query = {
                    "name": item.name,
                    "retailer": item.retailer,
                }
                const update = { $set: item }; 
                const options = { upsert: true };
                const results = await products.updateOne(query, update, options)
                console.log(results)
            }

            // const results = await products.insertMany(result);
            // console.log(results);

        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);
}

(async function () {
    let result = await accessspreadsheet();
    await uploadData(result)
}());


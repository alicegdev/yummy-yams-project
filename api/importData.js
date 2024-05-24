const fs = require("fs");
const { MongoClient } = require("mongodb");

async function main() {
  const uri = "mongodb://mongo:27017"; // URL de connexion à MongoDB
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Sélectionner la base de données mydatabase
    const db = client.db("yummy-yams-db");

  try {
    await client.connect();
    console.log("Connecté à MongoDB");

    const files = fs.readdirSync("./data");
    for (const file of files) {
      if (fs.statSync(`./data/${file}`).size === 0) {
        console.log(`Le fichier ${file} est vide. Passer au suivant.`);
        continue;
      }

      const data = JSON.parse(fs.readFileSync(`./data/${file}`, "utf8"));
      const collectionName = file.split(".")[0];
      const collection = db.collection(collectionName);
      await collection.insertMany(data);
      console.log(`Données insérées dans la collection ${collectionName}`);
    }
  } catch (error) {
    console.error("Erreur lors de l'importation des données :", error);
  } finally {
    await client.close();
  }
}

main();

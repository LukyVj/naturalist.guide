const algoliasearch = require("algoliasearch");
const animalsData = require("../data/animals.json");
const plantsData = require("../data/plants.json");
const allData = require("../data/all.json");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const files = JSON.stringify(Object.assign(animalsData, plantsData));

console.log();

fs.writeFile("./data/all.json", files, (err) => {
  if (err) throw err;
  console.log("Data written to file");
});
const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY_INDEX
);

const index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME_INDEX);

index.clearObjects();

try {
  index.saveObjects(allData, {
    autoGenerateObjectIDIfNotExist: true,
  });
} catch (error) {
  console.log(error);
}

// const indexAnimal = clientAnimal.initIndex(
//   process.env.REACT_APP_ALGOLIA_INDEX_NAME_INDEX_ANIMAL
// );

// indexAnimal.clearObjects();

// try {
//   indexAnimal.saveObjects(animalsData, {
//     autoGenerateObjectIDIfNotExist: true,
//   });
// } catch (error) {
//   console.log(error);
// }

// //PLANTS

// const clientPlant = algoliasearch(
//   process.env.REACT_APP_ALGOLIA_APP_ID_INDEX,
//   process.env.REACT_APP_ALGOLIA_API_KEY_INDEX_PLANT
// );

// const indexPlant = clientPlant.initIndex(
//   process.env.REACT_APP_ALGOLIA_INDEX_NAME_INDEX_PLANT
// );

// indexPlant.clearObjects();

// try {
//   indexPlant.saveObjects(plantsData, {
//     autoGenerateObjectIDIfNotExist: true,
//   });
// } catch (error) {
//   console.log(error);
// }

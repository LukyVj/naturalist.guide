const algoliasearch = require("algoliasearch");

const animalBirdsData = require("../data/animal-birds.json");
const animalFishesData = require("../data/animal-fishes.json");
const animalHorsesData = require("../data/animal-horses-test.json");
const animalNaturalistData = require("../data/animal-naturalist.json");
const animalGeneralData = require("../data/animal-general.json");

const plantsData = require("../data/plants.json");

const finalDataFile = "./data/all.json";

const dotenv = require("dotenv");
const merge = require("deepmerge");

const fsPromises = require("fs").promises;

dotenv.config();

let files = merge(animalBirdsData, animalFishesData);
files = merge(files, animalHorsesData);
files = merge(files, animalNaturalistData);
files = merge(files, animalGeneralData);
files = merge(files, plantsData);

fsPromises
  .writeFile(finalDataFile, JSON.stringify(files))
  .then(() => {
    console.log("JSON saved");
  })
  .then(() => {
    const client = algoliasearch(
      process.env.REACT_APP_ALGOLIA_APP_ID,
      process.env.REACT_APP_ALGOLIA_API_KEY_INDEX
    );

    const index = client.initIndex(
      process.env.REACT_APP_ALGOLIA_INDEX_NAME_INDEX
    );

    index.clearObjects();

    try {
      index.saveObjects(require("../data/all.json"), {
        autoGenerateObjectIDIfNotExist: true,
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch((er) => {
    console.log(er);
  });

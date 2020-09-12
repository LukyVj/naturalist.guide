const algoliasearch = require("algoliasearch");
const data = require("../index.json");
const dotenv = require("dotenv");

dotenv.config();

const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID_INDEX,
  process.env.REACT_APP_ALGOLIA_API_KEY_INDEX
);
const index = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME_INDEX);

index.clearObjects();

try {
  data.forEach((obj) =>
    index.saveObject(obj, { autoGenerateObjectIDIfNotExist: true })
  );
} catch (error) {
  console.log(error);
}

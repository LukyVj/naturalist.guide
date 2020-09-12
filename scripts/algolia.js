const algoliasearch = require("algoliasearch");
const data = require("../index.json");
const dotenv = require("dotenv");

dotenv.config();

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

index.clearObjects();

try {
  data.forEach((obj) =>
    index.saveObject(obj, { autoGenerateObjectIDIfNotExist: true })
  );
} catch (error) {
  console.log(error);
}

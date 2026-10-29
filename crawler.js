/* eslint-disable no-undef */
const HCCrawler = require("headless-chrome-crawler");
const fs = require("fs");

const toCrawl = [
  "https://www.gtabase.com/red-dead-redemption-2/horses/rose-grey-bay-arabian-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/black-arabian-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/white-arabian-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/splashed-piebald-gypsy-cob",
  "https://www.gtabase.com/red-dead-redemption-2/horses/splashed-bay-gypsy-cob",
  "https://www.gtabase.com/red-dead-redemption-2/horses/spotted-tricolor-norfolk-roadster",
  "https://www.gtabase.com/red-dead-redemption-2/horses/dappled-buckskin-norfolk-roadster",
  "https://www.gtabase.com/red-dead-redemption-2/horses/dapple-rose-grey-kladruber",
  "https://www.gtabase.com/red-dead-redemption-2/horses/silver-kladruber",
  "https://www.gtabase.com/red-dead-redemption-2/horses/marble-sabino-criollo",
  "https://www.gtabase.com/red-dead-redemption-2/horses/bay-frame-overo-criollo",
  "https://www.gtabase.com/red-dead-redemption-2/horses/steel-grey-breton",
  "https://www.gtabase.com/red-dead-redemption-2/horses/mealy-dapple-breton",
  "https://www.gtabase.com/red-dead-redemption-2/horses/silver-turkoman-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/dark-bay-turkoman-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/silver-dapple-pinto-missouri-fox-trotter",
  "https://www.gtabase.com/red-dead-redemption-2/horses/gold-turkoman-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/amber-champagne-missouri-fox-trotter",
  "https://www.gtabase.com/red-dead-redemption-2/horses/warped-brindle-arabian-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/cremello-dutch-warmblood",
  "https://www.gtabase.com/red-dead-redemption-2/horses/seal-brown-thoroughbred",
  "https://www.gtabase.com/red-dead-redemption-2/horses/brindle-thoroughbred",
  "https://www.gtabase.com/red-dead-redemption-2/horses/reverse-dapple-roan-nokota-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/red-chestnut-arabian-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/dappled-black-thoroughbred",
  "https://www.gtabase.com/red-dead-redemption-2/horses/black-chestnut-thoroughbred",
  "https://www.gtabase.com/red-dead-redemption-2/horses/palomino-blagdon-gypsy-cob",
  "https://www.gtabase.com/red-dead-redemption-2/horses/skewbald-gypsy-cob",
  "https://www.gtabase.com/red-dead-redemption-2/horses/rose-grey-norfolk-roadster",
  "https://www.gtabase.com/red-dead-redemption-2/horses/piebaldo-roan-norfolk-roadster",
  "https://www.gtabase.com/red-dead-redemption-2/horses/cremello-kladruber",
  "https://www.gtabase.com/red-dead-redemption-2/horses/grey-kladruber",
  "https://www.gtabase.com/red-dead-redemption-2/horses/bay-brindle-criollo",
  "https://www.gtabase.com/red-dead-redemption-2/horses/sorrel-overo-criollo",
  "https://www.gtabase.com/red-dead-redemption-2/horses/seal-brown-breton",
  "https://www.gtabase.com/red-dead-redemption-2/horses/grullo-dun-breton",
  "https://www.gtabase.com/red-dead-redemption-2/horses/perlino-andalusian-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/brown-leopard-appaloosa",
  "https://www.gtabase.com/red-dead-redemption-2/horses/grey-overo-american-paint-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/leopard-appaloosa",
  "https://www.gtabase.com/red-dead-redemption-2/horses/strawberry-roan-ardennes",
  "https://www.gtabase.com/red-dead-redemption-2/horses/rose-grey-andalusian-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/chocolate-roan-dutch-warmblood",
  "https://www.gtabase.com/red-dead-redemption-2/horses/iron-grey-ardennes",
  "https://www.gtabase.com/red-dead-redemption-2/horses/tiger-striped-bay-mustang",
  "https://www.gtabase.com/red-dead-redemption-2/horses/silver-tail-buckskin-american-standardbred",
  "https://www.gtabase.com/red-dead-redemption-2/horses/palomino-dapple-american-standardbred",
  "https://www.gtabase.com/red-dead-redemption-2/horses/piebald-gypsy-cob",
  "https://www.gtabase.com/red-dead-redemption-2/horses/white-blagdon-gypsy-cob",
  "https://www.gtabase.com/red-dead-redemption-2/horses/black-norfolk-roadster",
  "https://www.gtabase.com/red-dead-redemption-2/horses/speckled-grey-norfolk-roadster",
  "https://www.gtabase.com/red-dead-redemption-2/horses/white-kladruber",
  "https://www.gtabase.com/red-dead-redemption-2/horses/black-kladruber",
  "https://www.gtabase.com/red-dead-redemption-2/horses/blue-roan-overo-criollo",
  "https://www.gtabase.com/red-dead-redemption-2/horses/dun-criollo",
  "https://www.gtabase.com/red-dead-redemption-2/horses/sorrel-breton",
  "https://www.gtabase.com/red-dead-redemption-2/horses/red-roan-breton",
  "https://www.gtabase.com/red-dead-redemption-2/horses/dapple-grey-thoroughbred",
  "https://www.gtabase.com/red-dead-redemption-2/horses/white-roan-nokota-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/buckskin-american-standardbred",
  "https://www.gtabase.com/red-dead-redemption-2/horses/blood-bay-thoroughbred",
  "https://www.gtabase.com/red-dead-redemption-2/horses/blue-roan-nokota-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/flaxen-roan-tennessee-walker",
  "https://www.gtabase.com/red-dead-redemption-2/horses/seal-brown-dutch-warmblood",
  "https://www.gtabase.com/red-dead-redemption-2/horses/dark-bay-andalusian-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/bay-roan-ardennes",
  "https://www.gtabase.com/red-dead-redemption-2/horses/sooty-buckskin-dutch-warmblood",
  "https://www.gtabase.com/red-dead-redemption-2/horses/dapple-dark-grey-hungarian-halfbred",
  "https://www.gtabase.com/red-dead-redemption-2/horses/few-spots-appaloosa",
  "https://www.gtabase.com/red-dead-redemption-2/horses/splashed-white-american-paint-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/wild-bay-mustang",
  "https://www.gtabase.com/red-dead-redemption-2/horses/grullo-dun-mustang",
  "https://www.gtabase.com/red-dead-redemption-2/horses/flaxen-chestnut-hungarian-halfbred",
  "https://www.gtabase.com/red-dead-redemption-2/horses/leopard-blanket-appaloosa",
  "https://www.gtabase.com/red-dead-redemption-2/horses/tobiano-american-paint-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/piebald-tobiano-hungarian-halfbred",
  "https://www.gtabase.com/red-dead-redemption-2/horses/blanket-appaloosa",
  "https://www.gtabase.com/red-dead-redemption-2/horses/black-american-standardbred",
  "https://www.gtabase.com/red-dead-redemption-2/horses/overo-american-paint-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/gold-palomino-tennessee-walker",
  "https://www.gtabase.com/red-dead-redemption-2/horses/liver-chestnut-morgan-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/buttermilk-buckskin-kentucky-saddler",
  "https://www.gtabase.com/red-dead-redemption-2/horses/raven-black-shire-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/mahogany-bay-tennessee-walker",
  "https://www.gtabase.com/red-dead-redemption-2/horses/chestnut-tennessee-walker",
  "https://www.gtabase.com/red-dead-redemption-2/horses/flaxen-chestnut-morgan-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/silver-bay-kentucky-saddler",
  "https://www.gtabase.com/red-dead-redemption-2/horses/black-kentucky-saddler",
  "https://www.gtabase.com/red-dead-redemption-2/horses/red-chestnut-suffolk-punch-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/dark-bay-shire-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/blond-chestnut-belgian-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/dapple-bay-tennessee-walker",
  "https://www.gtabase.com/red-dead-redemption-2/horses/black-rabicano-tennessee-walker",
  "https://www.gtabase.com/red-dead-redemption-2/horses/bay-morgan-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/chestnut-pinto-kentucky-saddler",
  "https://www.gtabase.com/red-dead-redemption-2/horses/sorrel-suffolk-punch-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/light-grey-shire-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/mealy-chestnut-belgian-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/bay-roan-morgan-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/palomino-morgan-horse",
  "https://www.gtabase.com/red-dead-redemption-2/horses/red-roan-tennessee-walker",
  "https://www.gtabase.com/red-dead-redemption-2/horses/grey-kentucky-saddler",
];

(async () => {
  const finalData = [];

  const crawler = await HCCrawler.launch({
    // Function to be evaluated in browsers
    evaluatePage: () => ({
      name: $("title")
        .text()
        .replace(
          " - RDR2 & Red Dead Online Horses Database & Statistics - Red Dead Redemption 2",
          ""
        ),
      description: $(
        "#ja-current-content > div.item-page.gta5-database.rdr2-horses > div.article-content > .weapon-specs ~ p"
      )
        .text()
        .replace("  ", ""),
      photoName: `https://www.gtabase.com${$(".item-image img").attr("src")}`,
      breed: $("dl.fields-container > dd:nth-child(1) > .field-value")
        .text()
        .replace("\n", ""),
      price: $("dl.fields-container > dd:nth-child(7) > .field-value")
        .text()
        .replace("\n", ""),

      stats: [
        {
          stats_health: $("dd.field-entry.health .field-value").text(),
          stats_stamina: $("dd.field-entry.stamina .field-value").text(),
          stats_speed: $("dd.field-entry.speed .field-value").text(),
          stats_acceleration: $(
            "dd.field-entry.acceleration .field-value"
          ).text(),
          stats_handling: $("dd.field-entry.handling .field-value").text(),
          stats_overall: $("dd.field-entry.overall .field-value").text(),
        },
      ],
      type: "animal-horses",
      mapLocation: false,
    }),
    // Function to be called with evaluated results from browsers
    onSuccess: (result) => {
      finalData.push(result.result);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  // Queue a request
  // Queue multiple requests
  await crawler.queue(toCrawl);
  // Queue a request with custom options
  await crawler.onIdle(); // Resolved when no queue is left
  await crawler.close(); // Close the crawler

  fs.writeFile(
    "./data/animal-horses.json",
    JSON.stringify(finalData),
    {},
    () => {
      console.log("done");
    }
  );
})();

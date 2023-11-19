const prompt = require("prompt-sync")({ sigint: true });

const cars = [
  {
    brand: "BMW",
    bid: 2000,
  },
  {
    brand: "TOYOTA",
    bid: 1000,
  },
  {
    brand: "MAZDA",
    bid: 1500,
  },
  {
    brand: "TESLA",
    bid: 3000,
  },
  {
    brand: "BENZ",
    bid: 4000,
  },
  {
    brand: "BYD",
    bid: 900,
  },
  {
    brand: "FORD",
    bid: 1000,
  },
  {
    brand: "VOLVO",
    bid: 1200,
  },
  {
    brand: "JEEB",
    bid: 2000,
  },
  {
    brand: "HONDA",
    bid: 1000,
  },
];

let shop = true;
while ((shop = true)) {
  console.log("=============================================");

  for (let i = 0; i < 10; i++) {
    indexNum = i + 1;
    console.log(
      indexNum + ". " + cars[i].brand + " [" + "$" + cars[i].bid + "]",
    );
  }

  console.log("=============================================");

  let userInput;

  userInput = prompt("Please select cars (Enter 1 - 10) : ");
  console.log("=============================================");

  while (isNaN(userInput) || userInput < 1 || userInput > 10) {
    userInput = prompt("Invalid Input! Please select cars (Enter 1 - 10) : ");
    console.log("=============================================");
  }

  console.log(
    "Your car is " +
      cars[userInput - 1].brand +
      ". " +
      "Current price is " +
      "$" +
      cars[userInput - 1].bid,
  );
  console.log("=============================================");

  let bidLoop = true;

  while ((bidLoop = true)) {
    let bidInput = parseInt(prompt("Bid : "));
    console.log("=============================================");

    if (isNaN(bidInput) || bidInput < 100) {
      console.log("You must bid more than $100");
      console.log("=============================================");
    } else {
      const newBid = bidInput;
      cars[userInput - 1].bid += newBid;
      console.log("Your current price is : " + cars[userInput - 1].bid);
      let qbidprompt = true;
      while ((qbidprompt = true)) {
        qbid = prompt("Do you want to bid more? (y/N) : ");
        console.log("=============================================");

        if (
          qbid === "y" ||
          qbid === "Y" ||
          qbid === "n" ||
          qbid === "N" ||
          qbid === ""
        ) {
          break;
        } else {
          console.log("Invalid input!!");
          console.log("=============================================");

          qbidprompt = true;
        }
      }
      if (qbid === "n" || qbid === "N" || qbid === "") {
        break;
      }
    }
  }

  let shopping = true;

  let buymore;

  while ((shopping = true)) {
    buymore = prompt("Do you want to buy more cars? (Y/n) : ");

    console.log("=============================================");

    if (
      buymore === "y" ||
      buymore === "Y" ||
      buymore === "" ||
      buymore === "n" ||
      buymore === "N"
    ) {
      break;
    } else {
      console.log("Invalid Input!");

      console.log("=============================================");
      shopping = true;
    }
  }
  if (buymore === "n" || buymore === "N") {
    break;
  }
}

const prompt = require('prompt-sync')({ sigint: true });

// For Testing Purposes
const items = [
  { number: 1, description: "Item 1", reserved_price: 100, current_bids: 0, current_buyer: "", },
  { number: 2, description: "Item 2", reserved_price: 200, current_bids: 0, current_buyer: "", },
  { number: 3, description: "Item 3", reserved_price: 300, current_bids: 0, current_buyer: "", },
]

// const auctioned_items = [
//   { number: 3211, description: "IPhone 13 Pro", reserved_price: 100, current_bids: 140, current_buyer: "Tu", },
//   { number: 4142, description: "MacBook Air M1", reserved_price: 200, current_bids: 50, current_buyer: "Pita", },
//   { number: 3343, description: "Nike Jordan", reserved_price: 300, current_bids: 324, current_buyer: "Thaksin", },
//   { number: 4564, description: "Nike Air Force 1", reserved_price: 300, current_bids: 0, current_buyer: "", },
// ]

// const items = setup_auction();
start_bid(items);
display_results(items);


// Task 1: setup auction system
function setup_auction() {
  console.log("Welcome, let's setup the system before start bidding!");
  let num_item = parseInt(prompt("Enter number of items:"));
  while (isNaN(num_item) || num_item < 10) {
    num_item = parseInt(prompt("Bad input detected, please enter a valid number and make sure it is greater than or equal to 10:"));
  }

  const items = [];
  for (let i = 0; i < num_item; i++) {
    console.log("----------------------------")
    const item = get_item_info(); // get userinput and return as object
    items.push(item); // add object to array
  }

  return items; // return the array for future use
}

// Task 2: start bidding
function start_bid(items) {
  console.log("Let the bidding begin!");
  while (true) {
    items.forEach((item) => {
      console.log("----------------------------")
      console.log(item);
      let buy = prompt("Would you like to buy this item? (Y/N):");
      while (buy.toLocaleUpperCase() !== "Y" && buy.toLocaleUpperCase() !== "N") {
        buy = prompt("Please only enter 'Y' or 'N':");
      }

      if (buy.toLocaleUpperCase() === "N") {
        console.log(" ")
        console.log("Alright, Moving to the next item!");
        return; // exit early (skip to next item)
      }

      const buy_number = prompt("Enter your buyer number: ");
      let bid_price = parseInt(prompt("Enter your bid: "));
      while (!allow_bid(bid_price, item.current_bids)) {
        bid_price = prompt("Bad input detected, please enter a valid bid that is higher than the current one: ");
      }

      item.current_bids = bid_price;
      item.current_buyer = buy_number;
      console.log(" ")
    });

    const bid = prompt("Would you like to continue bidding? (Y/N):");
    if (bid.toLocaleUpperCase() === "N") {
      break; // break from infinite loop
    }
  }
}

// Task 3: display auction results
function display_results(items) {
  console.log("Auction has ended! Here are the results:")
  console.log("----------------------------------------")
  items.forEach((item) => {
    if (item.current_bids >= item.reserved_price) { // sold
      item.final_price = item.current_bids * 1.1; // add 10% tax
    }
  });
  const sold_items = items.filter((item) => { return item.final_price !== undefined; });
  const unsold_items = items.filter((item) => { return item.current_bids < item.reserved_price && item.current_bids > 0; });
  const nobids_items = items.filter((item) => { return item.current_bids === 0; });

  // display the item number, final bid, and buyer number for all the items that have been sold
  sold_items.forEach((item) => {
    console.log(`Item Number ${item.number} sold to buyer ${item.current_buyer} for $${item.final_price}`);
  });

  // display the item number and final bid for all the items with bids that have not reached their reserve price
  unsold_items.forEach((item) => {
    console.log(`Item Number ${item.number} has $${item.current_bids} bids, but did not meet the reserved price at $${item.reserved_price}`);
  });

  // display item numbers that have no bids
  nobids_items.forEach((item) => {
    console.log(`Item Number ${item.number} has no bids.`);
  });

  console.log("----------------------------------------")
  console.log("Sold Items: " + sold_items.length);
  console.log("Unsold Items: " + unsold_items.length);
  console.log("No bids Items: " + nobids_items.length);
}


function allow_bid(new_bid, current_bid) {
  if (isNaN(new_bid)) {
    return false;
  }

  return new_bid > current_bid;
}

function get_item_info() {
  const item_number = prompt("Enter item number:");
  const item_description = prompt("Enter item description:");
  const item_reserved_price = prompt("Enter item reserved price:");

  return {
    number: item_number,
    description: item_description,
    reserved_price: item_reserved_price,
    current_bids: 0,
    current_buyer: "",
  };
}

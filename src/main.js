const prompt = require("prompt-sync")({ sigint: true });

function getItemInfo() {
	console.log("----------------------------");
	const itemNumber = prompt("Enter item number:");
	const itemDescription = prompt("Enter item description:");
	const itemReservedPrice = parseInt(prompt("Enter item reserved price:"), 10);
	return {
		number: itemNumber,
		description: itemDescription,
		reservedPrice: itemReservedPrice,
		currentBids: 0,
		currentBuyer: "",
	};
}

function displayItem(item) {
	console.log(`----------------------------------------
Item Number: ${item.number}
Item Description: ${item.description}
Item Reserved Price: ${item.reservedPrice}
Item Current Bids: ${item.currentBids}
Item Current Buyer: ${item.currentBuyer}
----------------------------------------`);
}

function setupAuction() {
	console.log("Welcome, let's setup the system before start bidding!");
	let numItems = parseInt(prompt("Enter number of items:"), 10);

	while (Number.isNaN(numItems) || numItems < 10) {
		numItems = parseInt(
			prompt("Bad input detected, please enter a valid number and make sure it is greater than or equal to 10:"),
			10
		);
	}

	const itemsList = [];
	for (let i = 0; i < numItems; i++) {
		const item = getItemInfo();
		itemsList.push(item);
	}

	return itemsList;
}

function allowBid(newBid, currentBid) {
	if (Number.isNaN(newBid)) {
		return false;
	}
	return newBid > currentBid;
}

function startBid(auctionItems) {
	console.log("Let the bidding begin!");

	while (true) {
		for (const item of auctionItems) {
			displayItem(item);
			let buy = prompt("Would you like to buy this item? (Y/N):");

			while (buy.toLocaleUpperCase() !== "Y" && buy.toLocaleUpperCase() !== "N") {
				buy = prompt("Please only enter 'Y' or 'N':");
			}

			if (buy.toLocaleUpperCase() === "N") {
				console.log(" ");
				console.log("Alright, Moving to the next item!");
				continue;
			}

			const buyerNumber = prompt("Enter your buyer number: ");
			let bidPrice = parseInt(prompt("Enter your bid: "), 10);

			while (!allowBid(bidPrice, item.currentBids)) {
				bidPrice = parseInt(
					prompt("Bad input detected, please enter a valid bid that is higher than the current one: "),
					10
				);
			}

			item.currentBids = bidPrice;
			item.currentBuyer = buyerNumber;
		}

		const bid = prompt("Would you like to continue bidding? (Y/N):");

		if (bid.toLocaleUpperCase() === "N") {
			break;
		}
	}
}

function displayResults(auctionItems) {
	console.log("Auction has ended! Here are the results:");
	console.log("----------------------------------------");

	for (const item of auctionItems) {
		if (item.currentBids >= item.reservedPrice) {
			item.finalPrice = item.currentBids * 1.1;
		}
	}

	const soldItems = auctionItems.filter((item) => item.finalPrice !== undefined);
	const unsoldItems = auctionItems.filter((item) => item.currentBids < item.reservedPrice && item.currentBids > 0);
	const noBidsItems = auctionItems.filter((item) => item.currentBids === 0);

	soldItems.forEach((item) => {
		console.log(`Item Number ${item.number} sold to buyer ${item.currentBuyer} for $${item.finalPrice}`);
	});
	unsoldItems.forEach((item) => {
		console.log(
			`Item Number ${item.number} has $${item.currentBids} bids, but did not meet the reserved price at $${item.reservedPrice}`
		);
	});
	noBidsItems.forEach((item) => {
		console.log(`Item Number ${item.number} has no bids.`);
	});

	console.log(`----------------------------------------
Sold Items: ${soldItems.length}
Unsold Items: ${unsoldItems.length}
No bids Items: ${noBidsItems.length}`);
}

// Main execution sequence
const items = setupAuction();
startBid(items);
displayResults(items);

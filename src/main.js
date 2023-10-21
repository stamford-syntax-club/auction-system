const prompt = require('prompt-sync')({ sigint: true });


// OK THIS IS KHING's MESSAGE

const cars = [
                ["BMW", 2000],
                ["TOYOTA", 1000],
                ["MAZDA", 1500],
                ["TESLA", 3000],
                ["BENZ", 4000],
                ["BYD", 900],
                ["FORD", 1000],
                ["VOLVO", 1200],
                ["JEEB", 2000],
                ["HONDA", 1000],
            ];


for (let i = 0; i < 10; i++) {
    indexNum = i + 1;

    console.log(indexNum + ". " + cars[i][0] + " [" + "$" + cars[i][1] + "]");
}


let userInput;

// do {
//     userInput = prompt("Please select cars (Enter 1 - 10) : ")
//     if (isNaN(userInput) || userInput < 1 || userInput > 10) {
//         console.log("Error: You must enter a number 1 - 10");
//     }


// } while (isNaN(userInput) || userInput < 1 || userInput > 10 );
// console.log("Your car is " + cars[userInput - 1][0] + ". " + "Current price is " + "$" + cars[userInput-1][1]);


userInput = prompt("Please select cars (Enter 1 - 10) : ")
while(isNaN(userInput) || userInput < 1 || userInput > 10 ) {
	userInput = prompt("Invalid Input! Please select cars (Enter 1 - 10) : ")
} 
console.log("Your car is " + cars[userInput - 1][0] + ". " + "Current price is " + "$" + cars[userInput-1][1]);

let bidLoop = true

while (bidLoop = true) {
    let bidInput = parseInt(prompt('Bid : '))
    if (isNaN(bidInput) || bidInput < 100) {
        console.log('You must bid more than $100')
    } else {
        console.log('Your current price is : ' + (cars[userInput-1][1] + bidInput))
        qbid = prompt('Do you want to bid more? (y/N) : ')
        if (qbid === 'y' || qbid === 'Y') {
            bidLoop = true
        } else if (qbid === 'n' || qbid === 'N' || qbid === '') {
            break;
        }
    }
}
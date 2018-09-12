/* Program created by Thomas Baines
for use in BCPR280 - Software Engineering 2; Assignment 2
All rights reserved */

/* Updated to conform to standardJS 2/08/2018 5:28pm */

class HighLowGuess { // eslint-disable-line no-unused-vars
  constructor () {
    this.initalize()
  }

  guess (newGuess) {
    // increment guess counter
    this.guessCount += 1

    // input validation
    newGuess = Number(newGuess) // converts newGuess into a number
    if (!isNaN(newGuess)) { // checks if the number is NaN - can't check typeof here because JS is dumb
      if (newGuess % 1 !== 0) {
        // number had decimal points
        return [false, 'Please enter a whole number']
      } else if (newGuess < 0 || newGuess > 99) {
        // number was negative
        return [false, 'Please enter a number between 0 and 99']
      } else {
        // guess was a whole number within the correct range, passes validation
      }
    } else {
    // guess was a non-number datatype - possible edge case where a date is passed but that would be wrong anyway
      return [false, 'Please enter a number']
    }

    if (this.answer > newGuess) { // number was too high
      return [false, 'Try higher']
    } else if (this.answer < newGuess) { // number was too low
      return [false, 'Try lower']
    } else { // guess was correct
      return [true, `You got it in ${this.guessCount} tries`]
    }
  }
  
  initalize() {
    // build or reset the data storage within the "this" scope
    this.answer = Math.floor(Math.random() * 100)
    this.guessCount = 0
    this.firstPrompt = 'Guess a number between 0 and 99',
    this.gameTitle = 'Guess a number between 0 and 99'
  }
}

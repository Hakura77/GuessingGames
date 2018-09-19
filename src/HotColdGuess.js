/* Program created by Thomas Baines
for use in BCPR280 - Software Engineering 2; Assignment 2
All rights reserved */

/* Updated to conform to standardJS 19/09/2018 2:15pm */

class HotColdGuess { // eslint-disable-line no-unused-vars
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

    let theDifference = Math.abs(this.answer - newGuess) // calculate absolute difference between the guess and the answer

    if (theDifference >= 40) {
      return [false, 'Cold']
    } else if (theDifference >= 20) {
      return [false, 'Cool']
    } else if (theDifference >= 10) {
      return [false, 'Warm']
    } else if (theDifference >= 1) {
      return [false, 'Hot']
    } else if (theDifference === 0) {
      return [true, `You got it in ${this.guessCount} tries`]
    } else {
      // this should never be reached
      console.warn('Something bad happened in HotColdGuess')
    }

    /* switch (theDifference) { // this was bad code - doesn't work
      case (theDifference >= 40):
        return [false, 'Cold'];
      case (theDifference >= 20):
        return [false, "Cool"]
      case (theDifference >= 10):
        return [false, "Warm"]
      case (theDifference >= 1):
        return [false, "Hot"]
      case (theDifference === 0):
        return [true, `You got it in ${this.guessCount} tries`]
      default:
        console.warn('Something bad happened in HotColdGuess') // this shouldn't ever happen
    } */
  }

  initalize () {
    // build or reset the data storage within the "this" scope
    this.answer = Math.floor(Math.random() * 100)
    this.guessCount = 0
    this.firstPrompt = 'Guess a number between 0 and 99, I will respond “cold” if you’re more than 40 away from the target, I will respond “cool” if you’re less than 40 and greater than 19. I will respond “warm” if you’re less than 20 and greater than 9. I will respond “hot” if you’re less than 9.'
    this.gameTitle = "Guess a number and I'll tell you how hot you are"
  }
}

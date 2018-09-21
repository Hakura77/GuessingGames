/* Program created by Thomas Baines
for use in BCPR280 - Software Engineering 2; Assignment 2
All rights reserved */

/* Updated to conform to standardJS 21/09/2018 05:34pm */

/* global */

class HighLowAnswer { // eslint-disable-line no-unused-vars
  constructor () { // set static variables
    this.validResponses = ['too high', 'too low', 'correct']
    this.gameTitle = 'Think of a number, and tell me if I’m too high or too low'
    this.firstPrompt = 'Think of a random whole number between 0 and 99. Is it 49?'
    this.lieResponse = [false, 'At some point you lied to me :(. Starting again from the top. Is your number 0?']
    this.initalize()
  }

  get successMessage () { // calculates the success message according to the correct format
    return [true, `Hooray, I got it in ${this.guessCount} guesses`]
  }

  guess (newResponse) {
    newResponse = String(newResponse).toLowerCase()
    if (this.validResponses.find(function (theResponse) {
      return theResponse === newResponse
    })) { // check if input provided is within the list of alowed inputs
      // valid input provided
      // binary search algorythm
      switch (newResponse) {
        case this.validResponses[0]:
          // too high
          this.upperBound = this.lastGuess - 1
          break

        case this.validResponses[1]:
          // too low
          this.lowerBound = this.lastGuess + 1
          break

        case this.validResponses[2]:
          // got it right
          return
      }

      // generate new guess
      this.lastGuess = Math.floor((this.lowerBound + this.upperBound) / 2)
      if (!this.detectLies()) {
        // user did not lie
        this.guessCount += 1
        return [false, this.lastGuess]
      } else {
        // user lied
        this.initalize()
        return this.lieResponse
      }
    } else { // valid input was not provided. Return error state
      return [false, 'Please enter “Too High” “Too Low” or “Correct”']
    }
  }

  detectLies (newGuess) {
    // method to detect error state caused by the end user lying to the program
    if (this.lowerBound > this.upperBound) {
      // program has pushed boundary values past each other
      // this is because of bad data
      return true
    } else if (newGuess === this.lastGuess && this.upperBound === newGuess && this.lowerBound === newGuess) {
      // program has calculated the same guess twice, which is the only available guess and been told that it is wrong.
      return true
    } else {
      // no lies detected
      return false
    }
  }

  initalize () { // set dynamic variables - so class can be memory-wiped
    this.upperBound = 99
    this.lowerBound = 0
    this.guessCount = 1
    this.lastGuess = 49
  }
}

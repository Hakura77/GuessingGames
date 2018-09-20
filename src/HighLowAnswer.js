/* Program created by Thomas Baines
for use in BCPR280 - Software Engineering 2; Assignment 2
All rights reserved */

/* global */


class HighLowAnswer { // eslint-disable-line no-unused-vars
  constructor () { // set static variables
    this.validResponses = ['too high', 'too low', 'correct']
    this.gameTitle = 'Think of a number, and tell me if I’m too high or too low'
    this.firstPrompt = 'Think of a random whole number between 0 and 99. Is it 49?'
    this.initalize()
  }
  
  guess(newResponse) {
    newResponse = newResponse.toLowerCase()
    if (this.validResponses.find(function(theResponse) {
      return theResponse === newResponse
    })) // check if input provided is within the list of alowed inputs
    {
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
          return [true, `Hooray, I got it in ${this.guessCount} guesses`]
      }
      
      // generate new guess
      this.lastGuess = Math.floor((this.lowerBound + this.upperBound) / 2)
      this.guessCount += 1
      return [false, this.lastGuess]
    } else {
      return [false, 'Please enter “Too High” “Too Low” or “Correct”']
    }
  }
  
  initalize () { // set dynamic variables - so class can be memory-wiped
    this.upperBound = 99
    this.lowerBound = 0
    this.guessCount = 1
    this.lastGuess = 49
  }
  
}
/* Program created by Thomas Baines
for use in BCPR280 - Software Engineering 2; Assignment 2
All rights reserved */

/*  global */

/* Updated to conform to standardJS 21/09/2018 11:51am */

class HotColdAnswer { // eslint-disable-line no-unused-vars
  constructor () { // set static values, then call initalize()
    this.validResponses = ['cold', 'cool', 'warm', 'hot', 'correct']
    this.gameTitle = 'Think of a number and tell me how hot or cold I am'
    this.firstPrompt = 'Think of a number between 0 and 99. Then, tell me how hot or Cold I am from your number. Say “Hot” if I’m within 9 numbers, say “warm” if I’m 10-19 away. Say “cool” if I’m 20-39 away. Say “Cold” if I’m 40 or more away, and tell me “Correct” if I guessed correctly. \nIs your number 0?'
    this.initalize()
  }

  initalize () { // resets dynamic variables so class can be memory-wiped
    this.upperBound = 99
    this.lowerBound = 0
    this.lastGuess = 0
    this.guessCount = 1
  }

  get successMessage () { // calculates the success message according to the correct format
    return [true, `Hooray, I got it in ${this.guessCount} guesses`]
  }

  guess (newResponse) {
    newResponse = String(newResponse).toLowerCase()
    if (this.validResponses.find(function (theResponse) {
      return theResponse === newResponse
    })) { // check if input is within valid inputs
      if ((this.guessCount % 2) === 1) {
        // last guess was the lower boundary
        switch (newResponse) {
          case this.validResponses[0]: // cold
            this.lowerBound += 40
            break
          case this.validResponses[1]: // cool
            this.lowerBound += 20
            this.upperBound = this.lowerBound + 19
            break
          case this.validResponses[2]: // warm
            this.lowerBound += 10
            this.upperBound = this.lowerBound + 9
            break
          case this.validResponses[3]: // hot
            this.lowerBound += 1
            let newUpperBound = this.lowerBound + 8
            if (newUpperBound < this.upperBound) { // code to stop upper bound climbing on repeated "hot" responses
              this.upperBound = newUpperBound
            }
            break
          case this.validResponses[4]: // correct
            return this.successMessage
        }
      } else { // guess was the upper boundary
        switch (newResponse) {
          case this.validResponses[0]: // cold
            this.upperBound -= 40
            break
          case this.validResponses[1]: // cool
            this.upperBound -= 20
            this.lowerBound = this.upperBound - 19
            break
          case this.validResponses[2]: // warm
            this.upperBound -= 10
            this.lowerBound = this.upperBound - 9
            break
          case this.validResponses[3]: // hot
            this.upperBound -= 1
            let newLowerBound = this.upperBound - 8
            if (newLowerBound > this.lowerBound) { // code to stop lower bound shrinking on repeated "hot" responses
              this.lowerBound = newLowerBound
            }
            break
          case this.validResponses[4]: // correct
            return this.successMessage
        }
      }
      // boundaries are updated, generate new guess
      let newGuess = [false]
      if ((this.guessCount % 2) === 1) { // last guess was lower boundary. Guess upper boundary
        newGuess.push(this.upperBound)
      } else {
        newGuess.push(this.lowerBound)
      }
      this.guessCount += 1
      return newGuess
    } else { // invalid input detected. Return error message
      return [false, '‘Please enter “Hot”, “Warm”, “Cool”, “Cold” or "Correct"']
    }
  }
}

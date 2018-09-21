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
    this.lieResponse = [false, 'At some point you lied to me :(. Starting again from the top. Is your number 0?']
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

  detectLies (newLowerBound, newUpperBound, newGuess) {
    // multiple ways of detecting lies
    if (newGuess === this.lastGuess && this.upperBound === this.lowerBound) {
      // only one vaild guess remains and the user said it was wrong
      return true
    } else if (newLowerBound > newUpperBound) {
      // boundaries have passed each other
      return true
    } else if (this.lowerBound > newLowerBound) { // tried to decrease lower bound away from centre - user lied at some point
      return true
    } else if (this.upperBound < newUpperBound) { // tried to increaes upper bound away from centre - user lied at some point
      return true
    } else { // none of the lie states were triggered
      return false
    }
  }

  guess (newResponse) {
    newResponse = String(newResponse).toLowerCase()
    let newUpperBound
    let newLowerBound
    if (this.validResponses.find(function (theResponse) {
      return theResponse === newResponse
    })) { // check if input is within valid inputs
      if ((this.guessCount % 2) === 1) {
        // last guess was the lower boundary
        switch (newResponse) {
          case this.validResponses[0]: // cold
            newLowerBound = this.lowerBound + 40
            newUpperBound = this.upperBound
            break
          case this.validResponses[1]: // cool
            newLowerBound = this.lowerBound + 20
            newUpperBound = newLowerBound + 19
            break
          case this.validResponses[2]: // warm
            newLowerBound = this.lowerBound + 10
            newUpperBound = newLowerBound + 9
            break
          case this.validResponses[3]: // hot
            newLowerBound = this.lowerBound + 1
            let tempUpperBound = newLowerBound + 8
            if (tempUpperBound < this.upperBound) { // code to stop upper bound climbing on repeated "hot" responses
              newUpperBound = tempUpperBound
            } else {
              newUpperBound = this.upperBound
            }
            break
          case this.validResponses[4]: // correct
            return this.successMessage
        }
      } else { // guess was the upper boundary
        switch (newResponse) {
          case this.validResponses[0]: // cold
            newUpperBound = this.upperBound - 40
            newLowerBound = this.lowerBound
            break
          case this.validResponses[1]: // cool
            newUpperBound = this.upperBound - 20
            newLowerBound = newUpperBound - 19
            break
          case this.validResponses[2]: // warm
            newUpperBound = this.upperBound - 10
            newLowerBound = newUpperBound - 9
            break
          case this.validResponses[3]: // hot
            newUpperBound -= 1
            let tempLowerBound = this.upperBound - 8
            if (tempLowerBound > this.lowerBound) { // code to stop lower bound shrinking on repeated "hot" responses
              newLowerBound = tempLowerBound
            } else {
              newLowerBound = this.lowerBound
            }
            break
          case this.validResponses[4]: // correct
            return this.successMessage
        }
      }
      // boundaries are updated, generate new guess
      let newGuess = [false]
      if ((this.guessCount % 2) === 1) { // last guess was lower boundary. Guess upper boundary
        newGuess.push(newUpperBound)
      } else {
        newGuess.push(newLowerBound)
      }
      if (!this.detectLies(newLowerBound, newUpperBound, newGuess[1])) {
        // user did not lie
        this.guessCount += 1
        this.upperBound = newUpperBound
        this.lowerBound = newLowerBound
        return newGuess
      } else {
        // user lied
        return this.lieResponse
      }
    } else { // invalid input detected. Return error message
      return [false, '‘Please enter “Hot”, “Warm”, “Cool”, “Cold” or "Correct"']
    }
  }
}

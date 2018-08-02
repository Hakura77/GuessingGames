class HighLowGuess {
  constructor () {
    this.answer = math.floor(math.random() * 100)
    this.guessCount = 0
    this.firstPrompt = 'Guess a number between 0 and 99'
  }
  
  
  
  guess(newGuess) {
    // increment guess counter
    this.guessCount += 1
    
    // input validation
    newGuess = parseInt(newGuess) // converts newGuess into a number
    if (newGuess != 'NaN') { // checks if the number is NaN - can't check typeof here because JS is dumb
      if (newGuess % 1 != 0) { 
        // number had decimal points
        return [false, "Please enter a whole number"]
      } else if (newGuess < 0 || newGuess > 99 ) {
        // number was negative
        return [false, 'Please enter a number between 0 and 99']
      } else {
        // guess was a whole number within the correct range, passes validation
      }
    } else {
    // guess was a non-number datatype - possible edge case where a date is passed but that would be wrong anyway
    return [false, "Please enter a number"]
    }
    
    if (this.answer >= newGuess) { // number was too high
      return [false, "Try higher"]
      
    } else if (this.answer <= newGuess) { // number was too low
      return [false, "Try lower"]
      
    } else { // guess was correct
      return [true, `You got it in ${this.guessCount} tries`]
    }
  }
  
  
  
  
  
}
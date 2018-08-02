class SimpleView {
  
  static get (thePrompt) {
    // method to get input from the user and return it as a variable
    // no error checking
    return window.prompt(thePrompt)
  }
  
  static out (outString) {
    // method to output text to the user
    window.alert(outString)
  }
  
  
  static highLowRuntime(highLow) {
    // method to run a loop to take input from the user and run HighLowGuess
    
    // first cycle outside of loop + value declarations
    let theGuess = this.get(highLow.firstPrompt) // get user input
    if (theGuess === null) { // allow the user to break out of the input loop
      return false
    }
    let theResponse = highLow.guess(theGuess) // pass user input to HighLowGuess and get the response
    let exit = theResponse[0] // activate exit condition for the loop 
    
    while(!exit) { // continue untill the guess is correct
      theGuess = this.get(theResponse[1]) // ask for user input, passing the prompt provided from the first guess
      if (theGuess === null) { // allow the user to break out of the input loop
      return false
    }
      theResponse = highLow.guess(theGuess) // pass the new user input back to HighLowGuess
      exit = theResponse[0] // update exit condition
    }
    this.out(theResponse[1]) // final state - this does not require further user input
    
  }
  
  
}
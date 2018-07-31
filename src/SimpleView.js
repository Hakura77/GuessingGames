class SimpleView {
  
  static get (prompt) {
    // method to get input from the user and return it as a variable
    // no error checking
    return window.prompt(prompt)
  }
  
  static out (outString) {
    // method to output text to the user
    window.alert(outString)
    
    
  }
  
  
  
}
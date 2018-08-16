/* 
will work on this later once more has been learned about vue

Vue.component(
  'gameHeader', {
    props: titlePrompt
    template: '<h1>{{ titlePrompt }}</h1>'
  }
)
Vue.component(
  'gameLog', {
    props: [messageLog],
    template: "<ul id='chatLog'> <li v-for='message in messageLog'> message.value </li> </ul>"
  }
)

Vue.component (
  'gameInput' {
    
    
  }

) */

class VueController {
  constructor () {
    this.allMyElements = new Map()
    this.allMyGames = []
    this.currentGame = undefined
    this.initalize()
  }
  
  vContSwitchTo(target) {
    return false // not implimented
  }
  
  
  initalize() {
    // method to initalize the vue element bindings and also set currentGame correctly
    
    this.allMyElements.set( // create sideBar bound vue element
      'sideBar',
      new Vue ({
        el: '#sidebar',
        data: {
          debug: true
        },
        methods: {
          switchTo: function(target) {
            if(this.debug) {
              console.log('switching to ' + target)
            }
            this.currentGame = target
            
          }
        }
        
        
      })
    )
	
    this.allMyElements.set( 
      'gameDiv',
      new Vue ({
        el: '#gameDiv',
        data: {
          messageLog: [],
          inputPrompt: 'Enter a Guess!',
          userInput: '',
          titlePrompt: 'Guess a Number between 0 and 99'
        },
        
        methods: {
          updateInputs: function() {
            // pass input to HighLowGuess
            console.log('Input pass skipped - System has not been integrated')
            let highLowGuessResponse = [false, '<<PLACEHOLDER>>']
            this.logPush(highLowGuessResponse)
          },
          
          logPush: function(computerResponse) { // function to push data to the chatlog elements
            if(this.messageLog.length > 8) { // check to see if backlog is full
              this.messageLog.splice(0, 2) //  if backlog is full, clear earliest two messages
            }
            // add to backlog
            let toPush = [this.userInput, ComputerResponse[1]]
            this.messageLog.concat(toPush)
            if (computerResponse[0]) {
              this.gameOver()
            }
          },
          
          gameOver: function() {
            this.inputDisabled = true
          }
          
        }
      })
    )
    
    this.currentGame = 'HighLowGuess'
  }
  
  
  
  
  
}
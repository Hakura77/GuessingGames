/* Program created by Thomas Baines
for use in BCPR280 - Software Engineering 2; Assignment 2
All rights reserved */

/* updated to conform to standardJS 20/08/2018 */

/* global Vue */

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

class VueController { // eslint-disable-line no-unused-vars
  constructor () {
    this.allMyElements = new Map()
    this.allMyGames = new Map()
    this.currentGame = undefined
    this.initalize()  
    this.gameDiv.setParent(this)
  }
  
  createGames () {
    this.allMyGames.set('HighLowGuess', new HighLowGuess())
  }
  
  setCurrentGame(gameKey) {
    this.currentGame = this.allMyGames.get(gameKey)
    // this.gameDiv.
  }
  
  get gameDiv() {
    return this.allMyElements.get('gameDiv')
  }

  initalize () {
    // method to initalize the vue element bindings and also set currentGame correctly

    this.allMyElements.set( // create sideBar bound vue element
      'sideBar',
      new Vue({
        el: '#sidebar',
        data: {
          debug: true,
          myParent: this
        },
        methods: {
          switchTo: function (target) {
            if (this.debug) {
              console.log('switching to ' + target)
            }
            this.setCurrentGame(target)
          }
        }

      })
    )

    this.allMyElements.set(
      'gameDiv',
      new Vue({
        el: '#gameDiv',
        data: {
          messageLog: ['<<First prompt Placeholder>>'],
          inputPrompt: 'Enter a Guess!',
          userInput: '',
          titlePrompt: '<<Placeholder>>',
          inputDisabled: false,
          messageCap: 23,
          myParent: undefined
        },
        methods: {
          setParent: function(theParent) {
            this.myParent = theParent
          },
          updateInputs: function () {
            if (this.userInput === '') {
              return false
            } else {
              console.warn('Functionality not added - Data was not passed to logic class')
              let guessResponse = [false, '<<Computer Response>>']
              this.logPush(guessResponse)
              this.userInput = ''
            }
          },

          logPush: function (computerResponse) { // function to push data to the chatlog elements
            if (this.messageLog.length > this.messageCap) { // check to see if backlog is full
              this.messageLog.splice(0, 2) //  if backlog is full, clear earliest two messages
            }
            // add to backlog
            let toPush = [this.userInput, computerResponse[1]]
            this.messageLog = this.messageLog.concat(toPush)
            if (computerResponse[0]) {
              this.gameOver()
            }
          },

          gameOver: function () {
            this.inputDisabled = true
          },

          resetGame: function () {
            this.messageLog = []
            this.messageLog[0] = myParent.currentGame.firstPrompt // confirm that this isn't dynamic
            this.titlePrompt = myParent.currentGame.gameTitle
            this.inputDisabled = false
            this.userInput = ''
          }
        }
      })
    )
  this.createGames()
  this.setCurrentGame('HighLowGuess')
  }
  
  
}

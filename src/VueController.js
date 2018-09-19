/* Program created by Thomas Baines
for use in BCPR280 - Software Engineering 2 Assignment 2
All rights reserved */

/* updated to conform to standardJS 19/09/2018 */

/* global Vue HighLowGuess HotColdGuess, DEBUG */

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
  }

  createGames () {
    this.allMyGames.set('highLowGuess', new HighLowGuess())
    this.allMyGames.set('hotColdGuess', new HotColdGuess())
  }

  setCurrentGame (gameKey) {
    if (this.currentGame !== this.allMyGames.get(gameKey)) {
      this.currentGame = this.allMyGames.get(gameKey)
      if (this.currentGame) {
        this.gameDiv.resetGame()
      } else {
        throw new Error('Game object not found')
      }
    } else {
      if (DEBUG) {
        console.log('Attempted to switch to the in-progress game. Aborting switch')
      }
    }
  }

  get gameDiv () {
    return this.allMyElements.get('gameDiv')
  }

  get sideBar () {
    return this.allMyElements.get('sideBar')
  }

  initalize () {
    // method to initalize the vue element bindings and also set currentGame correctly

    this.allMyElements.set( // create sideBar bound vue element
      'sideBar',
      new Vue({
        el: '#sidebar',
        data: {
          myParent: this
        },
        methods: {
          switchTo: function (target) {
            if (DEBUG) {
              console.log('switching to ' + target)
            }
            this.myParent.setCurrentGame(target)
          },
          setParent: function (theParent) {
            this.myParent = theParent
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
          messageCap: 20,
          myParent: undefined
        },
        methods: {
          setParent: function (theParent) {
            this.myParent = theParent
          },
          updateInputs: function () {
            if (this.userInput === '') {
              return false
            } else {
              // console.warn('Functionality not added - Data was not passed to logic class')
              let guessResponse = this.myParent.currentGame.guess(this.userInput)
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
            if (DEBUG) {
              console.log('Resetting current game')
            }
            this.messageLog = []
            this.messageLog[0] = this.myParent.currentGame.firstPrompt
            this.titlePrompt = this.myParent.currentGame.gameTitle
            this.inputDisabled = false
            this.userInput = ''
            this.myParent.currentGame.initalize()
          }
        }
      })
    )
    this.createGames()
    this.gameDiv.setParent(this)
    this.sideBar.setParent(this)
    this.setCurrentGame('highLowGuess')
  }
}

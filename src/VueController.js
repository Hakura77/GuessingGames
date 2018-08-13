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

class VueController() {
  constructor () {
    this.allMyElements = new Map()
    this.currentGame = undefined
    this.initalize()
  }
  
  vContSwitchTo(target) {
    this.allMyElements.get(target).enabled = true
  }
  
  
  
  initalize() {
    // method to initalize the vue element bindings and also set currentGame correctly
    
    this.allMyElements.set( // create sideBar bound vue element
      highLowGuess,
      new Vue ({
        el: sidebar,
        data: {
          
        },
        methods {
          switchTo: function(target) {
            this.vContSwitchTo(target)
          }
        }
        
        
      })
    )
    
    
    
  }
  
  
  
  
  
}
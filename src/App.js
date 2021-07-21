import React, { Component } from 'react'
import './App.css'
import butcherPig from './assets/butcherPig.jpeg'

class App extends Component{
  constructor(props){
    super(props)
    // the state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // "phrase" is the text entered by the user - right now there are test words hard coded to make the process of testing your code faster and easier
      // ACTION ITEM: when you are ready for your full user experience, delete the test words so phrase is assigned an empty string
      phrase: "alpha through yummy squeal queen fry",
      // "phraseTranslated" is what the user will see appear on the page as Pig Latin, it starts as the preset message and updates when your user clicks the "submit" button
      phraseTranslated: "This is where your translated sentence will appear."
    }
  }
  translateWord = (string) => {
    let solution = [];
    let array = string.split('');
    const vowels = ['a','e','i','o','u']
    let punctuations = [".", ",", ":", "!", "?"]

    if(punctuations.includes(array[0])){
      solution = [string]
    }
    if(vowels.includes(array[0])){
      solution = array.concat(['w', 'a', 'y'])
    }
    else{
        for(let i = 0; i < array.length; i++){
          if(vowels.includes(array[i].toLowerCase()) && array[i-1].toLowerCase() != 'q'){
            solution = array.slice(i).concat(array.slice(0, i)).concat(['a', 'y'])
            break
          } else if(array[i].toLowerCase() === 'y' && i != 0){
            solution = array.slice(i).concat(array.slice(0, i)).concat(['a', 'y'])
            break
          }
        }
    }
    return solution.join('');
  }

  // The "myPigLatinCodeHere" function is where you will put your logic to convert the sentence entered by the user to Pig Latin

  myPigLatinCodeHere = () => {
    let punctuations = [".", ",", ":", "!", "?"]
    // the variable "userInput" will contain the text input from the user modified into an array of words
    // no need to change this variable
    let userInput = this.state.phrase.split(/(\W+)/)
    //console.log("userInput:", userInput)
    let answerArray = []
    // now that we have an array of words, we can map over the array and access each word
    let translatedWordsArray = userInput.map(currentWord => {
      // ACTION ITEM: use "currentWord" as a starting point for your code
      //console.log("currentWord:", currentWord)
      answerArray.push(this.translateWord(currentWord))


      // your code here!

      // Remember: console.log is your friend :)


      // ACTION ITEM: change the value of currentWord to the name of whatever variable you made containing your Pig Latin'd word
      return currentWord
    })
    

    for(let i = 0; i < answerArray.length; i++){
      if(!!answerArray[i].match(/(\W+)/)){
        answerArray[i-1] = answerArray[i-1].concat(answerArray[i])
        answerArray.splice(i, 1)
      }
    }
    console.log(answerArray)

    this.setState({
      phraseTranslated: answerArray.join(' ')
    })

    // joining the array back to a string of translated words
    // no need to change this variable

    // the setState method will take your information from "translatedWords" and update the state object that is displayed to the user
    // no need to change this method
  }

  restartGame = () => {
    // this method restarts the game by setting the original state
    // ACTION ITEM: when you are ready for your full user experience, delete the test words in phrase so that is assigned an empty string
    this.setState({
      phrase: "alpha through yummy squeal queen fry",
      phraseTranslated: "This is where your translated sentence will appear."
    })
  }

  // no need to modify this method
  setUpPreventDefault = (e) => {
    // this method prevents React from refreshing the page unnecessarily
    e.preventDefault()
    this.myPigLatinCodeHere()
  }

  // no need to modify this method
  handleInput = (e) => {
    // this method takes the input and saves the value in this.state.phrase so we can use the input in our program
    this.setState({phrase: e.target.value})
  }

  render(){
    return(
      <>
        <h1>Pig Latin Translator</h1>
        <img
          src={butcherPig}
          alt="pig with butcher cut names in pig latin"
          className="butcherPig"
        />
        <div className="inputArea">
          <h4>Enter phrase to be translated:</h4>
          {/* user input field - every DOM event that happens in the input will call the handleChange method and update state */}
          <input
            type="text"
            className="userInput"
            onChange={this.handleInput}
            value={this.state.phrase}
          />
          <br />
          {/* button that called the setUpPreventDefault method which calls the myPigLatinCodeHere method */}
          <button onClick={this.setUpPreventDefault}>Submit</button>
          <button onClick={this.restartGame}>Clear</button>
        </div>
        <p>{this.state.phraseTranslated}</p>
        <footer>Coded by: Kelen, Todd, Chauncy</footer>
      </>
    )
  }
}

export default App

import React, { Component } from 'react'
import './App.css'
import butcherPig from './assets/butcherPig.jpeg'

class App extends Component{
  constructor(props){
    super(props)
    // the state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // "phrase" is the text entered by the user 
      
      phrase: "",
      // "phraseTranslated" is what the user will see appear on the page as Pig Latin, it starts as the preset message and updates when your user clicks the "submit" button
      phraseTranslated: ""
    }
  }
  translateWord = (string) => {
    let solution = []; // holds current word in pig latin
    let array = string.split(''); // holds current word as given 
    const vowels = ['a','e','i','o','u']
  

    if(array.length === 1){ // edge case for single letter words
      solution = array.concat(['w', 'a', 'y'])
    }
    if(array[0] && !!array[0].match(/(\W+)/)){ // keeps the current word as-is if it is only punctuation 
      solution = [string]
    }
    if(vowels.includes(array[0])){ // if first leeter is a vowel add way to the end
      solution = array.concat(['w', 'a', 'y'])
    }
    else{
        for(let i = 0; i < array.length; i++){ 
          if(vowels.includes(array[i].toLowerCase()) && array[i-1].toLowerCase() !== 'q'){ // this handles the words that don't have "y" as a vowel
            solution = array.slice(i).concat(array.slice(0, i)).concat(['a', 'y']) // ingnores "u" when preceded by "q"
            break
          } else if(array[i].toLowerCase() === 'y' && i !== 0){ // handles a "y" as a vowel
            solution = array.slice(i).concat(array.slice(0, i)).concat(['a', 'y'])
            break
          } 
        }
    }
    return solution.join(''); // returns our solution as a string
  }

  // The "myPigLatinCodeHere" function is where you will put your logic to convert the sentence entered by the user to Pig Latin

  myPigLatinCodeHere = () => {
    // the variable "userInput" will contain the text input from the user modified into an array of words
    // no need to change this variable
    let userInput = this.state.phrase.split(/(\W+)/)
  var answerArray = []
    // now that we have an array of words, we can map over the array and access each word
     let translatedWordsArray = userInput.map(currentWord => {
      // ACTION ITEM: use "currentWord" as a starting point for your code
      answerArray.push(this.translateWord(currentWord))
      return currentWord
    })
    

    for(let i = 0; i < answerArray.length; i++){
      if(!!answerArray[i].match(/(\W+)/)){ // check fo punctuation values
        answerArray[i-1] = answerArray[i-1].concat(answerArray[i]) // rejoines punctuation with its word
        answerArray.splice(i, 1) // removes redundant punctuation
      }
    }

    this.setState({
      phraseTranslated: answerArray.join(' ') // showes our translated phrase
    })
    // the setState method will take your information from "translatedWords" and update the state object that is displayed to the user
  }
  restartGame = () => {
    // this method restarts the game by setting the original state
    // ACTION ITEM: when you are ready for your full user experience, delete the test words in phrase so that is assigned an empty string
    this.setState({
      phrase: "",
      phraseTranslated: ""
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
        <footer>Coded by: Team: we are the bomb! Kelen, Todd, Chauncy</footer>
      </>
    )
  }
}

export default App

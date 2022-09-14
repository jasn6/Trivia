import React from "react"
import Question from "./Question"
import logo from "../Images/thinking.png"
import logo2 from "../Images/thinking2.png"

export default function Quiz({allQuestions, setQuestions, setAnswers, results, setPlayAgain,notFinish,setNotFinish}){
  const theQuestions = allQuestions.map(item => 
  <Question
    setQuestions = {setQuestions} content = {item} key = {item.id} results = {results}
  />)
  const handleSubmit = () => {
    for(let i = 0; i < allQuestions.length; i++){
      if (allQuestions[i].currChoice === ""){
        setNotFinish(true);
        return;
      }
    }
    setAnswers(prev => !prev)
    setNotFinish(false)
  }

  const handleSubmit2 = () => {
    setAnswers(false)
    setNotFinish(false);
    setPlayAgain(prev => !prev)
  }

  let count = 0;
    for(let i = 0; i < allQuestions.length; i++){
      if (allQuestions[i].currChoice === allQuestions[i].correct){
        count ++;
      }
    }

  return (
    <div className="quizPage">
      <div className="backGround"><img className="logo" src={logo}/></div>
      <div className="backGround2"><img className="logo2" src={logo2}/></div>
      <div className="title2">Your 5 Randomly Generated Questions</div>
      <hr className="line"
         style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
         }}
      />
      <div>{theQuestions}</div>
      {results && <div className="Score">You got {count}/5 correct answers</div>}
      {results ? <button className = "check" onClick={handleSubmit2}>Play Again</button> 
      : <button className="check" onClick={handleSubmit}>Check Answers</button>}
      {notFinish && <div className="errorCheck">Not All Questions are Answered !</div>}
    
  
    </div>

  )
}
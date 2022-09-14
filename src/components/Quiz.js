import React from "react"
import Question from "./Question"

export default function Quiz({allQuestions, setQuestions, setAnswers, results, setPlayAgain,correct,setCorrect}){
  const theQuestions = allQuestions.map(item => 
  <Question 
    setQuestions = {setQuestions} content = {item} key = {item.id} results = {results}
  />)
  
  const handleSubmit = () => {
    setAnswers(prev => !prev)
  }

  const handleSubmit2 = () => {
    setPlayAgain(prev => !prev)
    setAnswers(false)
    setCorrect(0)
  }

  if (results) {
    let count = 0;
    for(let i = 0; i < allQuestions.length; i++){
      if (allQuestions[i].currChoice === allQuestions[i].correct){
        count ++;
      }
    }
    setCorrect(count);
  }

  return (
    <div>
      <div>{theQuestions}</div>
      {results && <div>{correct}/5</div>}
      {results ? <button onClick={handleSubmit2}>Play Again</button> : <button onClick={handleSubmit}>Check Answers</button>}
    
  
    </div>

  )
}
import React from "react"

export default function Question({q}){
  
  let choices;
  if (q.type === "boolean"){
    choices = [<button>True</button>,<button>False</button>]
  } else{
    const multi = q.incorrect_answers
    multi.push(q.correct_answer)
    choices = multi.map(item=> <button>{item}</button>)
  }

  return (
    <div>
      <div>{q.question}</div>
      <div>{choices}</div>
    </div>
  )
}
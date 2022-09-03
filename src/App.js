import React from "react"
import Question from "./components/Question"
import { nanoid } from 'nanoid'
export default function App(){
  const [info,setInfo] = React.useState([])
  const [allQuestions,setQuestions] = React.useState([])

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
    .then ((res) => res.json())
    .then((data) => setInfo(data.results));
  }, [])
  
  React.useEffect(()=>{
    for (let i = 0; i < info.length; i++){
      let choices = [];
      if (info[i].type === "boolean"){
        choices = [{choice: "True", id: nanoid()},{choice: "False", id: nanoid()}]
      } else{
        const multi = info[i].incorrect_answers
        multi.push(info[i].correct_answer)
        for (let i = 0; i < multi.length; i++){
          choices.push({choice: multi[i], id: nanoid()} )
        }
        
      }
      const newQ = {
        id: nanoid(),
        question: info[i].question,
        currChoice: "",
        choices: choices
      }
  
      setQuestions(prev => [...prev,newQ])

    }

  },[info])
  


  const test = allQuestions.map(item => <Question setQuestions = {setQuestions} content = {item}/>)
  /*
    newQ = { 
      id: "",
      question: "",
      choices: [],
      currentQ: id,

    }

    click on choice button, look for which question it belongs to via Id, change current selected in newQ
  */

    /*
  let choices;
  if (q.type === "boolean"){
    choices = [<button>True</button>,<button>False</button>]
  } else{
    const multi = q.incorrect_answers
    multi.push(q.correct_answer)
    choices = multi.map(item=> <button>{item}</button>)
  }
  */ 
  return (
    <div>
      <div>{test}</div>
      <div>Hello World</div>
    </div>
    
  )
}
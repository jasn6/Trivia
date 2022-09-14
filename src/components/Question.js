import React from "react"

export default function Question({content,setQuestions,results}){
  const handleClick = (e) => {
    setQuestions(prev => {
      const newArray = []
      for (let i = 0; i < prev.length; i++){
        const oldQ = prev[i]
        if (oldQ.id === content.id){
          newArray.push({
            ...oldQ,
            currChoice: e.target.id
          })

        }else{
          newArray.push(oldQ)
        }
      }
      
      return newArray
    })
  }
  const style2 = {
    backgroundColor: "blue"
  }

  const style1 = {
    backgroundColor: "gray"
  }
  
  let choices;

  results ? 

  choices =  content.choices.map(item => {
    let style;
    if (item.id === content.correct){
       style = {backgroundColor:"green"}
    }else if (item.id === content.currChoice){
      style = {backgroundColor:"red"}
    }
    else{
      style = {backgroundColor:"gray"}
    }
    
    return (
      <button style = {style}
      key = {item.id} id = {item.id} >{item.choice}
      </button>
    )
  })

  :

  choices = content.choices.map(item => <button style = {item.id === content.currChoice ? style2 : style1} 
    key = {item.id} id = {item.id} onClick={handleClick} >{item.choice}</button>)



  return (
    <div>
      <p>{content.question}</p>
      <div>{choices}</div>
    </div>
  )
}
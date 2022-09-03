import React from "react"

export default function Question({content,setQuestions}){
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
  
  

  const choices = content.choices.map(item => <button style = {item.id === content.currChoice ? style2 : style1} 
    id = {item.id} onClick={handleClick} >{item.choice}</button>)

  return (
    <div>
      <div>{content.question}</div>
      <div>{choices}</div>
    </div>
  )
}
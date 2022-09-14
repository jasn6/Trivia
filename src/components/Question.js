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
    backgroundColor: "#92A8D1"
  }

  const style1 = {
    backgroundColor: "#deeaee"
  }
  
  let choices;

  results ? 

  choices =  content.choices.map(item => {
    let style;
    if (item.id === content.correct){
       style = {backgroundColor:"#b5e7a0"}
    }else if (item.id === content.currChoice){
      style = {backgroundColor:"#F7CAC9"}
    }
    else{
      style = {backgroundColor: "#deeaee"}
    }
    
    return (
      <button className = "choice" style = {style}
      key = {item.id} id = {item.id} >{item.choice}
      </button>
    )
  })

  :

  choices = content.choices.map(item => <button className = "choice" 
    style = {item.id === content.currChoice ? style2 : style1} 
    key = {item.id} id = {item.id} onClick={handleClick} >{item.choice}</button>)



  return (
    <div className="question">
      <p>{content.question}</p>
      <div className="choicesContainer">{choices}</div>
      <hr className="line"
         style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
         }}
      />
    </div>
  )
}
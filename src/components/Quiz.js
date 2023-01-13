import React from "react";
import Question from "./Question";
import logo from "../Images/thinking.png";
import logo2 from "../Images/thinking2.png";
import { Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Quiz({
  allQuestions,
  setQuestions,
  setAnswers,
  results,
  setPlayAgain,
  notFinish,
  setNotFinish,
  category,
  difficulty,
}) {
  const theQuestions = allQuestions.map((item) => (
    <Question
      setQuestions={setQuestions}
      content={item}
      key={item.id}
      results={results}
    />
  ));
  const handleSubmit = () => {
    for (let i = 0; i < allQuestions.length; i++) {
      if (allQuestions[i].currChoice === "") {
        setNotFinish(true);
        return;
      }
    }
    setAnswers((prev) => !prev);
    setNotFinish(false);
  };

  const handleSubmit2 = () => {
    setAnswers(false);
    setNotFinish(false);
    setPlayAgain((prev) => !prev);
  };

  let count = 0;
  for (let i = 0; i < allQuestions.length; i++) {
    if (allQuestions[i].currChoice === allQuestions[i].correct) {
      count++;
    }
  }

  return (
    <div className="quizPage">
      <div className="backGround">
        <img className="logo" src={logo} alt="Person thinking" />
      </div>
      <div className="backGround2">
        <img className="logo2" src={logo2} alt="Person thinking" />
      </div>
      <div className="title2">Your 5 Randomly Generated Questions</div>
      <div className="descrip">
        [Category: {category}] [Difficulty: {difficulty}]
      </div>
      <hr
        className="line"
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      />
      <div>{theQuestions}</div>
      <Collapse in={notFinish}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setNotFinish(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Not All Questions are Answered !
        </Alert>
      </Collapse>
      {results && (
        <div className="Score">You got {count}/5 correct answers</div>
      )}
      {results ? (
        <button className="check" onClick={handleSubmit2}>
          Play Again
        </button>
      ) : (
        <button className="check" onClick={handleSubmit}>
          Check Answers
        </button>
      )}
    </div>
  );
}

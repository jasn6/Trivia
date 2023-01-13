import React from "react";
import Quiz from "./Quiz";
import { nanoid } from "nanoid";
import he from "he";

export default function Main({ diff, cat }) {
  const [answerScreen, setAnswers] = React.useState(false);
  const [info, setInfo] = React.useState([]);
  const [allQuestions, setQuestions] = React.useState([]);
  const [playAgain, setPlayAgain] = React.useState(true);
  const [notFinish, setNotFinish] = React.useState(false);

  React.useEffect(() => {
    const id = cat.split("-")[0];
    fetch(
      "https://opentdb.com/api.php?amount=5&category=" +
        id +
        "&difficulty=" +
        diff
    )
      .then((res) => res.json())
      .then((data) => setInfo(data.results));
  }, [playAgain]);

  React.useEffect(() => {
    setQuestions([]);
    for (let i = 0; i < info.length; i++) {
      let choices = [];
      let correct_answer;
      if (info[i].type === "boolean") {
        choices = [
          { choice: "True", id: nanoid() },
          { choice: "False", id: nanoid() },
        ];
        if (info[i].correct_answer === "True") {
          correct_answer = choices[0].id;
        } else {
          correct_answer = choices[1].id;
        }
      } else {
        const random = Math.floor(Math.random() * 4);
        let currWrong = 0;
        for (let n = 0; n < 4; n++) {
          if (n === random) {
            choices[n] = {
              choice: he.decode(info[i].correct_answer),
              id: nanoid(),
            };
            correct_answer = choices[n].id;
            continue;
          }
          choices[n] = {
            choice: he.decode(info[i].incorrect_answers[currWrong]),
            id: nanoid(),
          };
          currWrong++;
        }
      }
      const newQ = {
        id: nanoid(),
        question: he.decode(info[i].question),
        currChoice: "",
        choices: choices,
        correct: correct_answer,
      };

      setQuestions((prev) => [...prev, newQ]);
    }
  }, [info]);

  return (
    <div className="center">
      <Quiz
        allQuestions={allQuestions}
        setQuestions={setQuestions}
        setAnswers={setAnswers}
        results={answerScreen}
        setPlayAgain={setPlayAgain}
        notFinish={notFinish}
        setNotFinish={setNotFinish}
        category={cat === "" ? "Random" : cat.split("-")[1]}
        difficulty={diff === "" ? "Random" : diff}
      />
    </div>
  );
}

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import { useGlobalContext } from "./context";
import Modal from "./Modal";

function App() {
  const {
    showSetup,
    loading,
    questions,
    index,
    nextQuestion,
    score,
    checkAnswer,
  } = useGlobalContext();
  if (showSetup) {
    return <SetupForm></SetupForm>;
  }

  if (loading) {
    return <Loading></Loading>;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  // const answers = [...incorrect_answers, correct_answer];
  let answers = [...incorrect_answers];
  const randomIndex = Math.floor(Math.random() * 4);
  if (randomIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[randomIndex]);
    answers[randomIndex] = correct_answer;
  }

  return (
    <main>
      <Modal></Modal>
      <section className="quiz">
        <p>
          Correct Answers: {score}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
          <div className="btn-container">
            {answers.map((answer) => {
              return (
                <button
                  key={answer}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={() => checkAnswer(answer)}
                ></button>
              );
            })}
          </div>
          <div className="next-question">
            <button onClick={nextQuestion}>Next Question</button>
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;

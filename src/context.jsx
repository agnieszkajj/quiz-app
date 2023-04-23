import { createContext, useContext, useState } from "react";
import axios from "axios";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
  celebrities: 26,
  animals: 27,
  geography: 22,
};

const API_ENDPOINT = `https://opentdb.com/api.php?`;

const GlobalContext = createContext();

const AppContext = ({ children }) => {
  const [showSetup, setShowSetup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [settings, setSettings] = useState({
    category: "sports",
    number: 10,
    difficulty: "easy",
  });

  const fetchQuestions = async (url) => {
    setLoading(true);
    setShowSetup(false);
    try {
      const res = await axios(url);
      if (res) {
        setQuestions(res.data.results);
        setLoading(false);
      } else {
        setShowSetup(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuestions(
      `${API_ENDPOINT}amount=${settings.number}&category=${
        table[settings.category]
      }&difficulty=${settings.difficulty}&type=multiple`
    );
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setShowSetup(true);
    setScore(0);
  };

  const nextQuestion = () => {
    setIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return newIndex;
      }
    });
  };

  const checkAnswer = (answer) => {
    if (answer === questions[index].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    nextQuestion();
  };

  return (
    <GlobalContext.Provider
      value={{
        showSetup,
        setShowSetup,
        loading,
        questions,
        index,
        showModal,
        score,
        nextQuestion,
        checkAnswer,
        showModal,
        closeModal,
        settings,
        setSettings,
        handleSubmit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default AppContext;

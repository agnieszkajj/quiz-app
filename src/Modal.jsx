import { useGlobalContext } from "./context";

const Modal = () => {
  const { showModal, closeModal, score, questions } = useGlobalContext();

  return (
    <div
      className={showModal ? "modal-container modal-open" : "modal-container"}
    >
      <div className="modal-content">
        <h2>Congrats!</h2>
        <p>
          You answered {(score / questions.length) * 100}% of questions
          correctly
        </p>
        <button onClick={closeModal}>Play Again</button>
      </div>
    </div>
  );
};

export default Modal;

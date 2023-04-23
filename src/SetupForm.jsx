import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { handleSubmit, settings, setSettings } = useGlobalContext();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newSettings = { ...settings, [name]: value };
    setSettings(newSettings);
  };

  return (
    <main>
      <section className="form-container">
        <form className="setup-form" onSubmit={handleSubmit}>
          <h1>Setup Quiz</h1>
          <div className="form-control">
            <label htmlFor="number">Number of questions</label>
            <input
              type="number"
              value={settings.number}
              id="number"
              onChange={handleChange}
              name="number"
              min={1}
              max={50}
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              value={settings.category}
            >
              <option value="sports">sports</option>
              <option value="politics">politics</option>
              <option value="history">history</option>
              <option value="celebrities">celebrities</option>
              <option value="animals">animals</option>
              <option value="geography">geography</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty">Select difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              onChange={handleChange}
              value={settings.difficulty}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          <button className="btn">Start</button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;

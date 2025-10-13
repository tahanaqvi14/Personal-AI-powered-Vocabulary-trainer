import React, { useState } from "react";
import "./App.css";
import Viewwords from './Viewwords'
import { useNavigate } from "react-router-dom";



function App() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [sentence, setSentence] = useState("");
  const [page,setpage]=useState('Main')

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Word added:");
    console.log("Word:", word);
    console.log("Meaning:", meaning);
    console.log("Sentence:", sentence);

    try {
      // ✅ Send data to backend
      const response = await fetch("https://personal-ai-powered-vocabulary-trainer-4.onrender.com/addword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word,
          meaning,
          sentence,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add word");
      }

      const data = await response.json();
      console.log("✅ Word saved:", data);
    } catch (error) {
      console.error("❌ Error:", error);
    }

    // Clear inputs
    setWord("");
    setMeaning("");
    setSentence("");

    closeModal();
  };


  return (
    <div className="App">
      <div className="dashboard">
        <h1>Word Trainer Dashboard</h1>
        <p>Choose an action to get started</p>

        <div className="action-buttons">
          <button className="action-btn" onClick={() => navigate("/Quiz")}>Start Quiz</button>
          <button className="action-btn" onClick={openModal}>
            Add Word
          </button>
          <button className="action-btn" onClick={() => navigate("/Viewwords")}>View Words</button>
        </div>
      </div>

      {/* Modal for adding a word */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add a Word</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter a word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter its meaning"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter sentence"
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                required
              />
              <button type="submit" className="action-btn">
                Add Word
              </button>
            </form>
          </div>
        </div>
      )}

      <main>
        {page==='Viewwords' && <Viewwords/>}
      </main>
    </div>
  );
}

export default App;

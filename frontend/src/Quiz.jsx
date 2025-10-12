import { useState, useEffect } from "react";
import './quiz.css'

function Quiz() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [sentence, setSentence] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/quiz")
      .then(res => res.json())
      .then(data => setWord(data.word))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async () => {
    if (!meaning || !sentence) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        word: word.trim(),
        meaning: meaning.trim(),
        sentence: sentence.trim()
      
      });
      const res = await fetch(`http://localhost:3000/quiz/answer?${params.toString()}`);
      const data = await res.json();
      setFeedback(data);
    } catch (err) {
      console.error(err);
      setFeedback({ error: "Failed to get feedback" });
    }
    setLoading(false);
  };

  const handleNext = () => {
    // Reset fields for next word
    setMeaning("");
    setSentence("");
    setFeedback(null);

    fetch("http://localhost:3000/quiz")
      .then(res => res.json())
      .then(data => setWord(data.word))
      .catch(err => console.error(err));
  };

  return (
    <div className="main">
      <h2>Word: {word}</h2>

      <input
        type="text"
        placeholder="Type the meaning"
        value={meaning}
        onChange={e => setMeaning(e.target.value)}
        style={{ marginBottom: "10px",width:"80%" }}
      />

      <input
        type="text"
        placeholder="Type a sentence"
        value={sentence}
        onChange={e => setSentence(e.target.value)}
        style={{ marginBottom: "10px" ,width:"80%"}}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Checking..." : "Submit"}
      </button>

      {feedback && (
        <div style={{ marginTop: "20px" }}>
          {feedback.error ? (
            <p style={{ color: "red" }}>{feedback.error}</p>
          ) : (
            <>
              <p>Meaning Correct: {feedback.meaningCorrect}</p>
              <p>Sentence Correct: {feedback.sentenceCorrect}</p>
              <button onClick={handleNext}>Next Word</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;

import { useState, useEffect } from "react";
import './quiz.css'

function Quiz() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [sentence, setSentence] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingWord, setLoadingWord] = useState(true);

  useEffect(() => {
    // Use localhost for local development, production URL for production
    setLoadingWord(true);
    fetch("http://localhost:3000/quiz")
      .then(res => res.json())
      .then(data => {
        setWord(data.word);
        setLoadingWord(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingWord(false);
      });
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
      // const res = await fetch(`https://personal-ai-powered-vocabulary-trainer-4.onrender.com/quiz/answer?${params.toString()}`);
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
    setLoadingWord(true);

    // fetch("https://personal-ai-powered-vocabulary-trainer-4.onrender.com/quiz")
    fetch("http://localhost:3000/quiz")
      .then(res => res.json())
      .then(data => {
        setWord(data.word);
        setLoadingWord(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingWord(false);
      });
  };

  return (
    <div className="main">
      {loadingWord ? (
        <div className="quiz-loader-container">
          <div className="quiz-loader"></div>
          <h2>Loading word...</h2>
          <p>Please wait while we fetch your quiz word</p>
        </div>
      ) : (
        <>
          <h2>Word: {word}</h2>

          <input
            type="text"
            placeholder="Type the meaning"
            value={meaning}
            onChange={e => setMeaning(e.target.value)}
            style={{ marginBottom: "10px", width: "80%" }}
          />

          <input
            type="text"
            placeholder="Type a sentence"
            value={sentence}
            onChange={e => setSentence(e.target.value)}
            style={{ marginBottom: "10px", width: "80%" }}
          />

          <button
            onClick={handleSubmit}
            disabled={loading || !meaning.trim() || !sentence.trim()}
          >
            {loading ? "Checking..." : "Submit"}
          </button>
        </>
      )}


      {!loadingWord && feedback && (
        <div style={{ marginTop: "20px" }}>
          {feedback.error ? (
            <p style={{ color: "red" }}>{feedback.error}</p>
          ) : (
            <>
              <div style={{
                padding: "16px",
                borderRadius: "12px",
                marginBottom: "16px",
                background: feedback.meaningCorrect === "Yes" ? "#d1fae5" : "#fee2e2",
                border: `2px solid ${feedback.meaningCorrect === "Yes" ? "#10b981" : "#ef4444"}`
              }}>
                <p style={{
                  margin: 0,
                  fontWeight: 600,
                  color: feedback.meaningCorrect === "Yes" ? "#065f46" : "#991b1b"
                }}>
                  Meaning: {feedback.meaningCorrect === "Yes" ? "✓ Correct" : "✗ Incorrect"}
                </p>
              </div>
              <div style={{
                padding: "16px",
                borderRadius: "12px",
                marginBottom: "16px",
                background: feedback.sentenceCorrect === "Yes" ? "#d1fae5" : "#fee2e2",
                border: `2px solid ${feedback.sentenceCorrect === "Yes" ? "#10b981" : "#ef4444"}`
              }}>
                <p style={{
                  margin: 0,
                  fontWeight: 600,
                  color: feedback.sentenceCorrect === "Yes" ? "#065f46" : "#991b1b"
                }}>
                  Sentence: {feedback.sentenceCorrect === "Yes" ? "✓ Correct" : "✗ Incorrect"}
                </p>
              </div>
              <button onClick={handleNext}>Next Word</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;

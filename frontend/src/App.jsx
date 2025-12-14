import React, { useState, useEffect } from "react";
import "./App.css";
import Viewwords from './Viewwords'
import { useNavigate } from "react-router-dom";
import Login from './Login';



function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem("isAuthenticated");
    const storedUserType = localStorage.getItem("userType");
    
    if (authStatus === "true" && storedUserType) {
      setIsAuthenticated(true);
      setUserType(storedUserType);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userType");
    setIsAuthenticated(false);
    setUserType(null);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [sentence, setSentence] = useState("");
  const [page,setpage]=useState('Main')
  const [isAdding, setIsAdding] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    if (!isAdding) {
      setIsModalOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsAdding(true);

    console.log("Word added:");
    console.log("Word:", word);
    console.log("Meaning:", meaning);
    console.log("Sentence:", sentence);

    try {
      // ✅ Send data to backend
      // const response = await fetch("https://personal-ai-powered-vocabulary-trainer-4.onrender.com/addword", {
      const response = await fetch("https://ai-vocab-builder-backend.onrender.com/addword", {
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

      // Clear inputs
      setWord("");
      setMeaning("");
      setSentence("");

      closeModal();
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Failed to add word. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };


  return (
    <div className="App">
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="logo-icon">📚</div>
          <h1>AI Word Trainer</h1>
          <p>Build your vocabulary one word at a time</p>
        </div>

        <div className="action-buttons">
          <button className="action-btn quiz-btn" onClick={() => navigate("/Quiz")}>
            <span className="btn-icon">🎯</span>
            <span className="btn-text">
              <span className="btn-title">Start Quiz</span>
              <span className="btn-subtitle">Test your knowledge</span>
            </span>
          </button>
          {userType === 'admin' && (
            <button className="action-btn add-btn" onClick={openModal}>
              <span className="btn-icon">➕</span>
              <span className="btn-text">
                <span className="btn-title">Add Word</span>
                <span className="btn-subtitle">Expand your collection</span>
              </span>
            </button>
          )}
          <button className="action-btn view-btn" onClick={() => navigate("/Viewwords")}>
            <span className="btn-icon">📖</span>
            <span className="btn-text">
              <span className="btn-title">View Words</span>
              <span className="btn-subtitle">Review your vocabulary</span>
            </span>
          </button>
          <button className="action-btn logout-btn" onClick={handleLogout}>
            <span className="btn-icon">🚪</span>
            <span className="btn-text">
              <span className="btn-title">Logout</span>
              <span className="btn-subtitle">Sign out</span>
            </span>
          </button>
        </div>
      </div>

      {/* Modal for adding a word */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close" 
              onClick={closeModal} 
              aria-label="Close modal"
              disabled={isAdding}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="modal-header">
              <div className="modal-icon">➕</div>
              <h2>Add a New Word</h2>
              <p>Expand your vocabulary collection</p>
            </div>
            <form onSubmit={handleSubmit} className="add-word-form">
              <div className="form-group">
                <label htmlFor="word">Word</label>
                <input
                  id="word"
                  type="text"
                  placeholder="e.g., Serendipity"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  required
                  disabled={isAdding}
                />
              </div>
              <div className="form-group">
                <label htmlFor="meaning">Meaning</label>
                <input
                  id="meaning"
                  type="text"
                  placeholder="e.g., The occurrence of pleasant surprises"
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                  required
                  disabled={isAdding}
                />
              </div>
              <div className="form-group">
                <label htmlFor="sentence">Example Sentence</label>
                <textarea
                  id="sentence"
                  placeholder="e.g., Finding my favorite book at the bookstore was pure serendipity."
                  value={sentence}
                  onChange={(e) => setSentence(e.target.value)}
                  required
                  rows="3"
                  disabled={isAdding}
                />
              </div>
              <button type="submit" className="submit-btn" disabled={isAdding}>
                <span>{isAdding ? "Adding..." : "Add Word"}</span>
                {!isAdding && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                )}
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

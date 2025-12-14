import React, { useState, useEffect } from "react";
import './Card.css';

function Viewwords() {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // fetch("https://personal-ai-powered-vocabulary-trainer-4.onrender.com/viewwords")
        fetch("https://ai-vocab-builder-backend.onrender.com/viewwords")
            .then((res) => res.json())
            .then((data) => {
                setWords(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className='main'>
            {loading ? (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    maxWidth: '500px',
                    width: '100%',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}>
                    <div className="loader"></div>
                    <h2 style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '16px'
                    }}>
                        Loading words...
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '16px' }}>
                        Please wait while we fetch your vocabulary
                    </p>
                </div>
            ) : words.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    maxWidth: '500px',
                    width: '100%',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}>
                    <h2 style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '16px'
                    }}>
                        No words yet
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '16px' }}>
                        Start building your vocabulary by adding your first word!
                    </p>
                </div>
            ) : (
                words.map((word, index) => (
                    <div className="card" key={index}>
                        <div className="card-content">
                            <h2 className="card-title">{word.wordname}</h2>
                            <p className="card-description" style={{ fontWeight: "600" }}>{word.meaning}</p>
                            <p className="card-description">{word.sentence}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Viewwords;

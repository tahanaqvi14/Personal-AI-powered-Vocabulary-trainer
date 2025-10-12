import React, { useState, useEffect } from "react";
import './Card.css';

function Viewwords() {
    const [words, setWords] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/viewwords")
            .then((res) => res.json())
            .then((data) => setWords(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className='main'>
            {words.map((word, index) => (
                <div className="card" key={index}>
                    <div className="card-content">
                        <h2 className="card-title">{word.wordname}</h2>
                        <p className="card-description">{word.meaning}</p>
                        <p className="card-description">{word.sentence}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Viewwords;

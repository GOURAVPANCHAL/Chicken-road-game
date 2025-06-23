import React, { useState } from 'react';
import './PlaySection.css';

const BattingSection = ({ moveHen }) => {
    const [amount, setAmount] = useState(0.6);
    const [difficulty, setDifficulty] = useState('Easy');

    const amounts = [0.5, 1, 2, 7];
    const difficulties = ['Easy', 'Medium', 'Hard', 'Hardcore'];

    return (
        <>
            <div className="play-container">
                <div className="left-section">
                    <div className="amount-input">
                        <button onClick={() => setAmount(0.1)}>MIN</button>
                        <input type="number" value={amount} step="0.1" min="0" readOnly />
                        <button onClick={() => setAmount(10)}>MAX</button>
                    </div>

                    <div className="quick-amounts">
                        {amounts.map((val) => (
                            <button key={val} onClick={() => setAmount(val)}>
                                {val} $
                            </button>
                        ))}
                    </div>
                </div>

                <div className="center-section">
                    <div className='chance-collision'>
                        <div className="label">Difficulty</div>
                        <div className="chance-label">Chance of collision</div>
                    </div>
                    <div className="difficulty-tabs">
                        {difficulties.map((level) => (
                            <button
                                key={level}
                                className={difficulty === level ? 'active' : ''}
                                onClick={() => setDifficulty(level)}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="right-section">
                    <button onClick={moveHen} className="play-btn">Play</button>
                </div>
            </div>
        </>
    );
};

export default BattingSection;
import React, { useState } from 'react';
import './PlaySection.css';
import Winpopup from '../winpopup/Winpopup';

const BattingSection = ({ moveHen, difficulty, setDifficulty, isPlaying, betAmount, resetGame }) => {
    const [showCashoutPopup, setShowCashoutPopup] = useState(false);
    const [goDisabled, setGoDisabled] = useState(false);
    const [amount, setAmount] = useState(0.6);
    const amounts = [0.5, 1, 2, 7];
    const difficulties = ['Easy', 'Medium', 'Hard', 'Hardcore'];

    // 👇 New function to handle "Go" button click
    const handleGoClick = () => {
        if (goDisabled) return;

        setGoDisabled(true);
        moveHen();

        setTimeout(() => {
            setGoDisabled(false);
        }, 1000);
    };

    return (
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
                <div className="chance-collision">
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
                {!isPlaying ? (
                    <button onClick={moveHen} className="play-btn-main">Play</button>
                ) : (
                    <>
                        <button
                            className="cashout-btn"
                            onClick={() => {
                                setShowCashoutPopup(true);
                                setTimeout(() => {
                                    setShowCashoutPopup(false);
                                    resetGame(); // ⬅️ Call resetGame from parent
                                }, 3000); // hide after 3s
                            }}
                        >
                            Cash Out <br />{betAmount} USD
                        </button>

                        <button
                            onClick={handleGoClick}
                            className="play-btn"
                            disabled={goDisabled}
                            style={{
                                opacity: goDisabled ? 0.5 : 1,
                            }}
                        >
                            Go
                        </button>
                        {showCashoutPopup && (
                            <Winpopup />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BattingSection;

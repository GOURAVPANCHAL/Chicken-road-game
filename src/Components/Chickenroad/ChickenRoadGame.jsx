import React, { useRef, useState, useEffect } from 'react';
import henbg from '../../images/henbg.png';
import hen from '../../images/hen.png';
import henvideo from '../../images/hen-video.gif';
import fire from '../../images/fire-image.gif';
import './ChickenRoadGame.css';
import BattingSection from '../../Components/BattingSection/BattingSection';
import fryhen from '../../images/fry-hen.png';
import walkhen from '../../images/walkHen.gif';

const ChickenRoadGame = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [fireIndex, setFireIndex] = useState(null); // 🔥 state for random fire
    const bettingArr = [
        { odds: 1.5 }, { odds: 2.0 }, { bet: 300, odds: 2.5 },
        { odds: 3.0 }, { odds: 3.5 }, { bet: 600, odds: 4.0 },
        { odds: 4.5 }, { odds: 5.0 }, { bet: 900, odds: 5.5 },
        { odds: 6.0 }, { odds: 6.5 }, { bet: 1200, odds: 7.0 },
        { odds: 7.5 }, { odds: 8.0 }, { bet: 1500, odds: 8.5 },
        { odds: 9.0 }, { odds: 9.5 }, { bet: 1800, odds: 10.0 },
    ];

    const scrollRef = useRef(null);
    const [allowScroll, setAllowScroll] = useState(false);
    const [henPosition, setHenPosition] = useState(0);

    const handleDoubleClick = () => {
        setAllowScroll(true);
    };

    const moveHen = () => {
        if (henPosition < bettingArr.length) {
            const newPos = henPosition + 1;
            setHenPosition(newPos);
            setActiveIndex(newPos);
            const bettingItemCols = scrollRef.current?.querySelectorAll('.bating-item-col');
            const targetCol = bettingItemCols?.[newPos];
            if (targetCol) {
                targetCol.scrollIntoView({ behavior: 'smooth', inline: 'center' });
            }
        }
    };

    // 🔥 Fire effect interval
    useEffect(() => {
        const interval = setInterval(() => {
            const random = Math.floor(Math.random() * bettingArr.length);
            setFireIndex(random);
        }, 500); // change fire every 2 sec

        return () => clearInterval(interval);
    }, [bettingArr.length]);

    return (
        <>
            <div className="chickroad-main">
                <div
                    className="row betting-item-main"
                    ref={scrollRef}
                    onDoubleClick={handleDoubleClick}
                    style={{ overflowX: allowScroll ? 'auto' : 'hidden' }}
                >
                    {/* Static Hen Background */}
                    <div className='col-md-2 bating-item-col' style={{ position: 'relative' }}>
                        <div className="henImage">
                            <img src={henbg} alt="Hen Background" />
                        </div>
                        {henPosition === 0 && (
                            <div className="moving-hen">
                                <img src={henvideo} alt="Hen" />
                            </div>
                        )}
                    </div>

                    {/* Betting Items */}
                    {bettingArr.map((item, index) => (
                        <div className="col-md-2 bating-item-col" key={index} style={{ position: 'relative' }}>
                            <div className='betting-item-main-img'>
                                {/* 🔥 Fire only in random index */}
                                {fireIndex === index && (
                                    <div className="fire-overlay">
                                        <img src={fire} alt="fire" />
                                    </div>
                                )}

                                <div className="betting-item">
                                    <div className={`circle-container ${activeIndex === index + 1 ? 'active' : ''}`}>
                                        <div className={`outer-circle ${activeIndex === index + 1 ? 'active' : ''}`}>
                                            <div className={`inner-circle ${activeIndex === index + 1 ? 'active' : ''}`}>
                                                {index + 1 < activeIndex ? (
                                                    <img src={fryhen} alt="Fry Hen" className="prev-icon-img" />
                                                ) : (
                                                    <p>{item.odds}x</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="circle-box"></div>

                                    {henPosition === index + 1 && (
                                        <div className="moving-hen">
                                            <img src={henvideo} alt="Hen" />
                                        </div>
                                    )}

                                {index + 1 < activeIndex && (
                                    <div className="previous-indicator">
                                        <img src={fryhen} alt="Previous Active" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <BattingSection moveHen={moveHen} />
        </>
    );
};

export default ChickenRoadGame;

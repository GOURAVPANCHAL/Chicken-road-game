import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import henbg from '../../images/henbg.png';
import henvideo from '../../images/hen-video.gif';
import fire from '../../images/fire-image.gif';
import './ChickenRoadGame.css';
import BattingSection from '../../Components/BattingSection/BattingSection';
import fryhen from '../../images/fry-hen.png';
import chicken from '../../images/chicken.webp';
import burnedHen from '../../images/cropped-logo.webp';
import lastImage from '../../images/last-image.png';
import coin1 from '../../images/coin1.png';
import coin2 from '../../images/coin2.png';
import hen1 from "../../images/hen1.png"
import hen2 from "../../images/hen2.png"
import hen3 from "../../images/hen3.png"
import hen4 from "../../images/hen4.png"
import hen5 from "../../images/hen5.png"
import hen6 from "../../images/hen6.png"
import hen7 from "../../images/hen7.png"
import hen8 from "../../images/hen8.png"
import hen9 from "../../images/hen9.png"
import hen10 from "../../images/hen10.png"
import hen11 from "../../images/hen11.png"
import winnerEgg from "../../images/winnerEgg.png"
import greenEgg from "../../images/green-egg.png"
import homelast from "../../images/home-last.png"
import { useWindowSize } from '@react-hook/window-size';
import ReactConfetti from 'react-confetti';

const ChickenRoadGame = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [fireIndex, setFireIndex] = useState(null);
    const [henPosition, setHenPosition] = useState(0);
    const [allowScroll, setAllowScroll] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const scrollRef = useRef(null);
    const frames = [hen1, hen2, hen3, hen4, hen5, hen6, hen7, hen8, hen9, hen10, hen11];
    const [frameIndex, setFrameIndex] = useState(0);
    const [showCongrats, setShowCongrats] = useState(false); // for modal
    const [width, height] = useWindowSize();
    const bettingArr = [
        { odds: 1.5 }, { odds: 2.0 }, { bet: 300, odds: 2.5 },
        { odds: 3.0 }, { odds: 3.5 }, { bet: 600, odds: 4.0 },
        { odds: 4.5 }, { odds: 5.0 }, { bet: 900, odds: 5.5 },
        { odds: 6.0 }, { odds: 6.5 }, { bet: 1200, odds: 7.0 },
        { odds: 7.5 }, { odds: 8.0 }, { bet: 1500, odds: 8.5 },
        { odds: 9.0 }, { odds: 9.5 }, { bet: 1800, odds: 10.0 },
    ];

    const handleDoubleClick = () => setAllowScroll(true);
    useEffect(() => {
        const interval = setInterval(() => {
            setFrameIndex(prev => (prev + 1) % frames.length);
        }, 200); // Adjust speed here (in milliseconds)

        return () => clearInterval(interval);
    }, []);
    const moveHen = () => {
        const totalPathLength = bettingArr.length + 1; // +1 for egg

        if (isGameOver || henPosition > totalPathLength) return;

        const newPos = henPosition + 1;
        setHenPosition(newPos);
        setActiveIndex(newPos);

        if (newPos === totalPathLength) {
            setHasWon(true); // <-- 🎉 Trigger confetti
        }

        const bettingItemCols = scrollRef.current?.querySelectorAll('.bating-item-col');
        const targetCol = bettingItemCols?.[newPos];
        if (targetCol) {
            targetCol.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    };

    useEffect(() => {
        if (hasWon) {
            const timeout = setTimeout(() => setHasWon(false), 7000);
            return () => clearTimeout(timeout);

        }
    }, [hasWon]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (henPosition < bettingArr.length && !isGameOver && !hasWon) {
                let random;
                do {
                    random = Math.floor(Math.random() * bettingArr.length);
                } while (random < henPosition);
                setFireIndex(random);
            }
        }, 500);
        return () => clearInterval(interval);
    }, [bettingArr.length, henPosition, isGameOver, hasWon]);

    // useEffect(() => {
    //     if (henPosition > 0 && fireIndex === henPosition - 1 && !isGameOver && !hasWon) {
    //         setIsGameOver(true);
    //         setTimeout(() => {
    //             setHenPosition(0);
    //             setActiveIndex(0);
    //             setIsGameOver(false);
    //             setHasWon(false);
    //             if (scrollRef.current) {
    //                 scrollRef.current.scrollTo({
    //                     left: 0,
    //                     behavior: 'smooth',
    //                 });
    //             }
    //         }, 2000);
    //     }
    // }, [henPosition, fireIndex, isGameOver, hasWon]);

    return (
        <>
            {hasWon && <ReactConfetti width={width} height={height} numberOfPieces={300} />}

            <div className="chickroad-main">
                <div
                    className="row betting-item-main"
                    ref={scrollRef}
                    onDoubleClick={handleDoubleClick}
                    style={{ overflowX: allowScroll ? 'auto' : 'hidden' }}
                >
                    {/* Start Position */}
                    <div className='col-md-2 bating-item-col' style={{ position: 'relative' }}>
                        <div className="henImage">
                            <img src={henbg} alt="Hen Background" />
                        </div>
                        {henPosition === 0 && (
                            <motion.div
                                className="moving-hen"
                                initial={{ scale: 0.8, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img src={chicken} alt="Hen" />
                            </motion.div>
                        )}
                    </div>
                    {bettingArr.map((item, index) => (
                        <div className="col-md-2 bating-item-col" key={index} style={{ position: 'relative' }}>
                            <div className='betting-item-main-img'>
                                {fireIndex === index && index >= henPosition && (
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
                                                    <img
                                                        src={activeIndex === index + 1 ? coin1 : coin2}
                                                        alt="Circle Icon"
                                                    />
                                                )}
                                                <p>{item.odds}x</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {henPosition - 1 === index && (
                                    <AnimatePresence>
                                        <motion.div
                                            className="moving-hen"
                                            key={isGameOver ? 'burned' : 'chicken'}
                                            initial={{ y: -20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ scale: 0.8, opacity: 0 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <img src={isGameOver ? burnedHen : frames[frameIndex]} alt="Hen" />
                                        </motion.div>
                                    </AnimatePresence>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Egg Final Position */}
                    <div className="col-md-2 bating-item-col" style={{ position: 'relative' }}>
                        <div className="egg-final-box">
                            <div className="egg-image-main">
                                <img
                                    src={henPosition === bettingArr.length + 1 ? greenEgg : winnerEgg}
                                    alt="Golden Egg"
                                    className="egg-image"
                                />
                                <p>2.0X</p>
                            </div>
                            {henPosition === bettingArr.length + 1 && (
                                <motion.div
                                    className="moving-hen"
                                    initial={{ y: -40, opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <img src={frames[frameIndex]} alt="Hen Reached Egg" />
                                </motion.div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4 bating-item-col">
                        <img
                            src={homelast}
                            alt="Golden Egg"
                            className="chicken-road-last-image"
                        />
                    </div>

                </div>
            </div>

            <BattingSection moveHen={moveHen} />
        </>
    );
};

export default ChickenRoadGame;

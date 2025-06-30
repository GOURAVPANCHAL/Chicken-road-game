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
import winnerEgg from "../../images/winnerEgg.png"
import greenEgg from "../../images/green-egg.png"
import homelast from "../../images/home-last.png"
import { useWindowSize } from '@react-hook/window-size';
import ReactConfetti from 'react-confetti';
import Winpopup from '../winpopup/Winpopup';
import Henframe from '../henframe1/Henframe';

const ChickenRoadGame = () => {
    const [amount, setAmount] = useState(0.6);
    const [activeIndex, setActiveIndex] = useState(0);
    const [fireIndex, setFireIndex] = useState(null);
    const [henPosition, setHenPosition] = useState(0);
    const [allowScroll, setAllowScroll] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [difficulty, setDifficulty] = useState('Easy');
    const [bettingArr, setBettingArr] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);


    const scrollRef = useRef(null);
    const [showCongrats, setShowCongrats] = useState(false); // for modal
    const [width, height] = useWindowSize();
    const handleDoubleClick = () => setAllowScroll(true);
    const resetGame = () => {
        setHenPosition(0);
        setActiveIndex(0);
        setFireIndex(null);
        setIsGameOver(false);
        setHasWon(false);
        setIsPlaying(false);
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        let newArr = [];
        switch (difficulty) {
            case 'Easy':
                newArr = [
                    { odds: 1.5 }, { odds: 2.0 }, { odds: 2.5 },
                    { odds: 3.0 }, { odds: 3.5 }, { odds: 4.0 },
                    { odds: 4.5 }, { odds: 5.0 }, { odds: 5.5 },
                    { odds: 6.0 }, { odds: 6.5 }, { odds: 7.0 },
                    { odds: 7.5 }, { odds: 8.0 }, { odds: 8.5 },
                    { odds: 9.0 }, { odds: 9.5 }, { odds: 10.0 }
                ];
                break;
            case 'Medium':
                newArr = [
                    { odds: 1.5 }, { odds: 2.0 }, { odds: 2.5 },
                    { odds: 3.5 }, { odds: 4.5 }, { odds: 5.5 },
                    { odds: 6.5 }, { odds: 7.5 }, { odds: 8.5 },
                    { odds: 9.5 }, { odds: 10.0 }
                ];
                break;
            case 'Hard':
                newArr = [
                    { odds: 2.0 }, { odds: 3.0 }, { odds: 4.0 },
                    { odds: 5.0 }, { odds: 6.0 }, { odds: 7.0 },
                    { odds: 8.0 }, { odds: 9.0 }, { odds: 10.0 }
                ];
                break;
            case 'Hardcore':
                newArr = [
                    { odds: 3.0 }, { odds: 4.5 }, { odds: 6.0 },
                    { odds: 7.5 }, { odds: 9.0 }, { odds: 10.0 }
                ];
                break;
        }
        setBettingArr(newArr);
        setHenPosition(0);
        setActiveIndex(0);
        setIsGameOver(false);
        setFireIndex(null);
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }, [difficulty]);

    const moveHen = () => {
        const totalPathLength = bettingArr.length + 1; // +1 for egg
        if (!isPlaying) setIsPlaying(true);
        if (isGameOver || henPosition > totalPathLength) return;

        const newPos = henPosition + 1;
        setHenPosition(newPos);
        setActiveIndex(newPos);

        if (newPos === totalPathLength) {
            setHasWon(true);
        }

        const bettingItemCols = scrollRef.current?.querySelectorAll('.bating-item-col');
        const targetCol = bettingItemCols?.[newPos];
        if (targetCol) {
            targetCol.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    };

    useEffect(() => {
        if (hasWon) {
            setShowCongrats(true);
            const timeout = setTimeout(() => {
                setHasWon(false);
                setHenPosition(0);
                setActiveIndex(0);
                setFireIndex(null);
                setIsGameOver(false);
                setShowCongrats(false);
                if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                        left: 0,
                        behavior: 'smooth',
                    });
                }
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [hasWon]);

    useEffect(() => {
        let fireSpeed = 1000; // default for Easy
        switch (difficulty) {
            case 'Easy':
                fireSpeed = 800;
                break;
            case 'Medium':
                fireSpeed = 600;
                break;
            case 'Hard':
                fireSpeed = 400;
                break;
            case 'Hardcore':
                fireSpeed = 200;
                break;
        }

        const interval = setInterval(() => {
            if (henPosition < bettingArr.length && !isGameOver && !hasWon) {
                let random;
                do {
                    random = Math.floor(Math.random() * bettingArr.length);
                } while (random < henPosition);
                setFireIndex(random);
            }
        }, fireSpeed);

        return () => clearInterval(interval);
    }, [bettingArr.length, henPosition, isGameOver, hasWon, difficulty]);


    useEffect(() => {
        if (henPosition > 0 && fireIndex === henPosition - 1 && !isGameOver && !hasWon) {
            setIsGameOver(true);
            setTimeout(() => {
                setHenPosition(0);
                setActiveIndex(0);
                setIsGameOver(false);
                setHasWon(false);
                if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                        left: 0,
                        behavior: 'smooth',
                    });
                }
            }, 2000);
        }
    }, [henPosition, fireIndex, isGameOver, hasWon]);

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
                                <AnimatePresence>
                                    {fireIndex === index && index >= henPosition && (
                                        <motion.div
                                            className="fire-overlay"
                                            // initial={{ opacity: 0, scale: 0.2, y: 0 }}
                                            // animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, y: 0 }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        >
                                            <img src={fire} alt="fire" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

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
                                            {
                                                !isGameOver ? <Henframe /> :
                                                    <img src={burnedHen} alt="Hen" />
                                            }
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
                                    <Henframe />
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
            {showCongrats && (
                <Winpopup />
            )}
            <BattingSection
                moveHen={moveHen}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                isPlaying={isPlaying}
                betAmount={amount} // 👈 pass this from state
                isGameOver={isGameOver}
                resetGame={resetGame}
            />


        </>
    );
};

export default ChickenRoadGame;

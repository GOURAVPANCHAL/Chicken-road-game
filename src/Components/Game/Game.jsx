import React, { useState } from 'react';
import './Game.css';
import ChickenRoadGame from '../Chickenroad/ChickenRoadGame';
import logo from "../../images/logo.svg";
import userImage from "../../images/user.png"
const Game = () => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [sound, setSound] = useState(false);
  const [music, setMusic] = useState(false);
  const [spaceSpin, setSpaceSpin] = useState(true);

  const onClose = () => setShowHowToPlay(false);

  return (
    <>
      <section className="game-section">
        <div className="container-fluid p-0">
          <div className='game-container'>
            <div className='game-header'>
              <div className='game-heder-main'>
                <img src={logo} alt="logo" />
                <div className='header-all-buttn'>
                  <button className='header-btns' onClick={() => setShowHowToPlay(true)}>
                    <i className="bi bi-info-circle"></i> How to play ?
                  </button>
                  <p className='header-btns'>
                    1 000 000 <i className="bi bi-currency-rupee"></i>
                  </p>
                  <button className='header-btns'><i className="bi bi-arrows-fullscreen"></i></button>
                  <button className='header-btns' onClick={() => setShowMenu(!showMenu)}>
                    <i className="bi bi-list"></i>
                  </button>
                </div>
              </div>

              <ChickenRoadGame />
            </div>
          </div>
        </div>
      </section>

      {/* How to Play Popup */}
      {showHowToPlay && (
        <div className="howtoplay-popup-backdrop">
          <div className="howtoplay-popup">
            <div className="popup-header">
              <h2>How to play?</h2>
              <button className="popup-close-btn" onClick={onClose}>×</button>
            </div>
            <ol className="howtoplay-list">
              <li>Specify the amount of your bet.</li>
              <li>
                Choose a difficulty level...
                <ul>
                  <li><strong>Easy</strong> – 24 lines</li>
                  <li><strong>Medium</strong> – 22 lines</li>
                  <li><strong>Hard</strong> – 20 lines</li>
                  <li><strong>Hardcore</strong> – 15 lines</li>
                </ul>
              </li>
              <li>Press “Play”</li>
              <li>Try to reach the egg. Avoid fire. Cash out anytime.</li>
              <li>Use "Space" key to spin if enabled.</li>
            </ol>
          </div>
        </div>
      )}

      {/* Menu Popup */}
      {showMenu && (
        <div className="menu-popup">
          <div className="menu-header">
            <div className='user-image'>
              <img src={userImage} alt="user-image" />
            </div>
            <div className='d-flex align-items-center gap-3'>
              <strong>Orange You...</strong>
              <span className="change-avatar">Change avatar</span>
            </div>
          </div>
          <div className="menu-item">
            <span><i className="bi bi-volume-up"></i> Sound</span>
            <input type="checkbox" checked={sound} onChange={() => setSound(!sound)} />
          </div>
          <div className="menu-item">
            <span><i className="bi bi-music-note"></i> Music</span>
            <input type="checkbox" checked={music} onChange={() => setMusic(!music)} />
          </div>
          <div className="menu-item">
            <span><i className="bi bi-keyboard"></i> «Space» to spin & go</span>
            <input type="checkbox" checked={spaceSpin} onChange={() => setSpaceSpin(!spaceSpin)} />
          </div>
          <div className="menu-link">🛡️ Provably fair settings</div>
          <div className="menu-link">📜 Game rules</div>
          <div className="menu-link">🕓 My bet history</div>
          <hr />
          <p className="powered-by">Powered by <span className="brand">Digi India Solution</span></p>
        </div>
      )}
    </>
  );
};

export default Game;

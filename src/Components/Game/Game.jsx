import React from 'react'
import './Game.css'
import BattingSection from '../BattingSection/BattingSection'
import ChickenRoadGame from '../Chickenroad/ChickenRoadGame'

const Game = () => {
  return (
    <>
      <section className="game-section">
        <div className="container-fluid">
          <div className='game-container'>
            <div className='game-header'>
              <h2 className='game-title'>Chicken Road Gambling Game</h2>
              <ChickenRoadGame />
              {/* <BattingSection /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Game
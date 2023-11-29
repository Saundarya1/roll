import '../App.css';
import { useState, useEffect } from 'react';

function StepThree({dices, rule, handleRuleChange, handleRoll, setStep}) {

    function rollAgain() {
        handleRoll();
        setStep(2);
      }

    return (
        <div className='third-screen'>
            <div className='success-box'>
                <p>Sukcesy</p>
                {dices}
            </div>
            <div className='meh'>Trafienia</div>
            <div className='plus-container'>
                <input value={rule} onChange={handleRuleChange} className='success-rule-box' defaultValue={0}></input>
                <div className='plus'>+</div>
            </div>
            <button className='throw-btn' onClick={rollAgain}>Rzut</button>
        </div>
    )

}

export default StepThree;
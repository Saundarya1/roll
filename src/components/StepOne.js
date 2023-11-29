import '../App.css';
import Select from 'react-select';
import { useState, useEffect } from 'react';


function StepOne({selectedDice, handleDiceChange, dices, handleAmountChange, handleRuleChange, handleFirstRoll, rule}) {

    const diceOptions = [
        { value: 6, label: "K6" },
        { value: 10, label: "K10" },
        { value: 12, label: "K12" },
        { value: 20, label: "K20" },
        { value: 100, label: "K100" }
      ];

    function isValue() {
        return selectedDice !== null && dices !== null && rule !== null;
      }

    return (
        <div>
          <Select
            value={selectedDice}
            onChange={handleDiceChange}
            options={diceOptions}
            placeholder="Rodzaj kości" />

          <div className='first-step-boxes'>
            <div>Liczba kości</div>
            <input value={dices} onChange={handleAmountChange} className='roll-amount-box' defaultValue={0}></input>
            <div>Trafienia</div>
            <div className='plus-container'>
              <input value={rule} onChange={handleRuleChange} className='success-rule-box' defaultValue={0}></input>
              <div className='plus'>+</div>
            </div>
          </div>
          <button disabled={!isValue()} onClick={handleFirstRoll} className='next-btn'>Idź dalej</button>
        </div>
    )
}

export default StepOne;
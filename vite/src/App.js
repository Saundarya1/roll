import './App.css';
import Select from "react-select";
import { useState, useEffect } from 'react';

function App() {

  const diceOptions = [
    { value: 6, label: "K6" },
    { value: 10, label: "K10" },
    { value: 12, label: "K12" },
    { value: 20, label: "K20" },
    { value: 100, label: "K100" }
  ];

  const [currentStep, setStep] = useState(1);
  const [dices, setDices] = useState(null);
  const [rule, setRule] = useState(null);
  const [selectedDice, setSelectedDice] = useState(null);
  const [success, setSuccess] = useState([]);
  const [fail, setFail] = useState([]);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isFailOpen, setIsFailOpen] = useState(false);


  function rollCounts(numbers) {
    return numbers.reduce(function (obj, roll) {
      if (!obj[roll]) {
        obj[roll] = 1;
      } else {
        obj[roll]++;
      }
      return obj;
    }, {});
  }

  const rollSuccessCounts = rollCounts(success);
  const rollFailCounts = rollCounts(fail);

  const listSuccess = Object.entries(rollSuccessCounts).map(([key, count]) =>
    <li>
      {key}: {count}
    </li>
  );

  const listFail = Object.entries(rollFailCounts).map(([key, count]) =>
    <li>
      {key}: {count}
    </li>
  );


  function showSuccessList() {
    setIsSuccessOpen((isSuccessOpen) => !isSuccessOpen);
  }
  function showFailList() {
    setIsFailOpen((isFailOpen) => !isFailOpen);
  }

  function handleNextStep(event) {
    setStep(currentStep + 1);
  }

  const handleAmountChange = (event) => {
    setDices(event.target.value);
  };

  const handleRuleChange = (event) => {
    setRule(event.target.value);
  };

  const handleDiceChange = (selectedDice) => {
    setSelectedDice(selectedDice);
  }

  const handleFirstRoll = () => {
    handleRoll();
    handleNextStep();
  }

  const handleRoll = () => {
    const successArray = [];
    const failArray = [];

    for (let i = 0; i < dices; i++) {

      let rollRandom = Math.floor(Math.random() * selectedDice.value) + 1;

      console.log(rollRandom);
      if (rollRandom < rule) {
        failArray.push(rollRandom);
        setSuccess(successArray);
      } else {
        successArray.push(rollRandom);
        setFail(failArray);
      }
    }
  }


  const rerollOnes = () => {

    const notOnes = fail.filter(one => one !== 1);
    const ones = fail.filter(one => one === 1);
    let lower = [];
    let higher = [];

    const reroll = ones.map(() => {

      const rerolls = Math.floor(Math.random() * selectedDice.value) + 1;

      if (rerolls < rule) {
        lower.push(rerolls);
      }
      else {
        higher.push(rerolls)
      }

    });
    setFail(notOnes.concat(lower));
    setSuccess(success.concat(higher));
  }
  useEffect(() => {
  }, [fail, success]);

  const rerollFails = () => {
    let lower = [];
    let higher = [];

    const reroll = fail.map(() => {

      const rerolls = Math.floor(Math.random() * selectedDice.value) + 1;

      if (rerolls < rule) {
        lower.push(rerolls);
      }
      else {
        higher.push(rerolls)
      }

    });

    setFail(lower);
    setSuccess(success.concat(higher));

  }

  function newSession() {
    setStep(1);
    setDices(null);
    setRule(null);
    setSelectedDice(null);
    setSuccess([]);
    setFail([]);
  }

  function goFurther() {
    setStep(3);
    setFail([]);
    setDices(success.length);
    setSuccess([]);
  }

  function rollAgain() {
    handleRoll();
    setStep(2);

    console.log(success, dices, fail, rule)
  }

  return (
    <div className="App">
      <div className='header'>ROLL</div>

      {currentStep === 1 &&
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
          <button onClick={handleFirstRoll} className='next-btn'>Idź dalej</button>
        </div>
      }

      {currentStep === 2 &&
        <div className='second-screen'>
          <div className='result-box'>
            <div className='success-box'>
              <p>Sukcesy</p>
              {success.length}
              <button onClick={showSuccessList} className='view'>Zobacz</button>
              <div>{isSuccessOpen && <ul>{listSuccess}</ul>}</div>
            </div>
            <div className='fail-box'>
              <p>Porażki</p>
              {fail.length}
              <button onClick={showFailList} className='view'>Zobacz</button>
              <div>{isFailOpen && <ul>{listFail}</ul>}</div>
            </div>
          </div>
          <div className='action-btns'>
            <button onClick={rerollOnes}>Przerzuć "jedynki"</button>
            <button onClick={rerollFails}>Przerzuć porażki</button>
            <button onClick={handleRoll}>Przerzuć wszystko</button>
          </div>
          <div className='navigation-btns'>
            <button onClick={goFurther}>Idź dalej</button>
            <button onClick={newSession}>Nowy rzut</button>
          </div>
        </div>
      }

      {currentStep === 3 &&
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
      }
    </div>
  );
}

export default App;

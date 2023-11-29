import './App.css';
import { useState, useEffect } from 'react';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';

function App() {

  //w trzecim kroku wydaje się nie łapać zmiany zasad kości

  const [currentStep, setStep] = useState(1);
  const [dices, setDices] = useState(null); //liczba kości
  const [rule, setRule] = useState(null); //trafienia
  const [selectedDice, setSelectedDice] = useState(null); //rodzaj kości
  const [success, setSuccess] = useState([]);
  const [fail, setFail] = useState([]);


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
      
      if (rollRandom < rule) {
        failArray.push(rollRandom);
      } else {
        successArray.push(rollRandom);
      }
    }
    setSuccess(successArray);
    setFail(failArray);
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

  return (
    <div className="App">
      <div className='header'>ROLL</div>

      {currentStep === 1 &&
        <StepOne selectedDice={selectedDice} handleDiceChange={handleDiceChange} dices={dices} handleAmountChange={handleAmountChange}
          handleRuleChange={handleRuleChange} handleFirstRoll={handleFirstRoll} rule={rule}
        />}

      {currentStep === 2 &&
        <StepTwo success={success} fail={fail} listSuccess={listSuccess} listFail={listFail} setSuccess={setSuccess} setFail={setFail} 
          handleRoll={handleRoll} goFurther={goFurther} newSession={newSession} selectedDice={selectedDice} rule={rule}/>
      }

      {currentStep === 3 &&
        <StepThree dices={dices} rule={rule} handleRuleChange={handleRuleChange} handleRoll={handleRoll} setStep={setStep} />
      }
    </div>
  );
}

export default App;

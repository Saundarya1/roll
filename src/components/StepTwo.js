import '../App.css';
import { useState, useEffect } from 'react';

function StepTwo({ success, fail, listSuccess, listFail, setSuccess, setFail, handleRoll, goFurther, newSession, selectedDice, rule }) {

    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isFailOpen, setIsFailOpen] = useState(false);

    function showSuccessList() {
        setIsSuccessOpen((isSuccessOpen) => !isSuccessOpen);
    }

    function showFailList() {
        setIsFailOpen((isFailOpen) => !isFailOpen);
    }

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


    return (
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
    )
}

export default StepTwo;
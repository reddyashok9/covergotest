import React, { useState } from 'react';
import './App.css';
import { FinalStep } from './FinalStep';
import { UserFrom } from './UserFrom';
import { Welcome } from './Welcome';

export const premiumBasePrice = 10;
export const currencyCodeAndRate = [{code: "AUD", name: "Australia", rate: 3}, {code: "USD", name: "USA", rate: 2}, {code: "HKD", name:"Hong Kong", rate: 1}];
export const packages = [{name: "Standard", premiumPercentageOnBase: 0}, {name: "Safe", premiumPercentageOnBase: 50}, {name: "Super Safe", premiumPercentageOnBase: 75}] 

function App() {
  const [userStep, setUserStep] = useState(1);
  const [userDetails, setUserDetails] = useState({});

  const handleStepChange = (step: number) => {
    setUserStep(step)
  }

  return (
    <div className="App">
      {userStep === 1 && <Welcome moveToStepOne={() => handleStepChange(2)} />}
      {userStep === 2 && <UserFrom goToFinal={(details: any) => {setUserStep(3); setUserDetails(details)}} />}
      {userStep === 3 && <FinalStep userData={userDetails} moveToStepOne={(step) => handleStepChange(step)}/>}
    </div>
  );
}

export default App;
